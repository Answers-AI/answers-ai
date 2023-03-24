import { URL } from 'url';
import { inngest } from './client';
import { webPageLoader } from '../web';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { WebPage } from 'types';
import { extractUrlsFromSitemap } from '../utilities/getSitemapUrls';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const PINECONE_VECTORS_BATCH_SIZE = 100;

import cheerio from 'cheerio';
import { convertWebPageToMarkdown } from '../web/getWebPage';

const visitedUrls = new Set<string>();

const prefixHeaders = (markdown: string): string => {
  const lines = markdown.split('\n');
  let headerStack: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#')) {
      const header = line.replace(/^#+\s*/, '');
      const levelMatch = line.match(/^#+/);
      const level = levelMatch ? levelMatch[0].length : 0;
      if (level <= headerStack.length) {
        headerStack = headerStack.slice(0, level - 1);
      }
      headerStack.push(header);
      lines[i] = `##### ${headerStack.join(' - ')}`;
    }
  }

  return lines.join('\n');
};

const recursiveCharacterTextSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000 });
const splitPageHtmlChunkMore = async (markdownChunk: string) => {
  const contextChunks = await recursiveCharacterTextSplitter.createDocuments([markdownChunk]);
  const smallerChunks = contextChunks.map((chunk) => `${chunk.pageContent}`);

  return smallerChunks;
};

const splitPageHtml = async (iPage: WebPage) => {
  const page = await convertWebPageToMarkdown(iPage.url, iPage.content);

  const headingsRegex = /\n+(?=\s*#####\s(?!#))/;
  const markdown = prefixHeaders(page.content)
    .replace(/\n{2,}/g, '\n')
    .replace(/^(#+\s+.+)\n(#+\s+.+\n)/gm, '$2');

  const markdownChunks = markdown.split(headingsRegex);

  const contextChunks = await Promise.all(
    markdownChunks.map(async (chunk) => {
      const header = chunk.match(/(#+\s+.+)\n/)?.[1] ?? '';
      const content = chunk.replace(header, '');
      const chunkMore = await splitPageHtmlChunkMore(content);
      const chunksWithHeader = chunkMore.map((chunk) => `${header}\n${chunk}`);
      return chunksWithHeader;
    })
  );
  return contextChunks.flat();
};

async function* scrapePage(
  iUrl: string,
  origin: string,
  urls: Set<string>
): AsyncGenerator<string | null> {
  const url = getUniqueUrl(iUrl);

  if (!url || visitedUrls.has(url)) {
    console.log({ iUrl, url });
    // yield null;
    return;
  }

  visitedUrls.add(url);
  try {
    let pageHtml;
    try {
      pageHtml = await webPageLoader.load(url);
    } catch (err) {
      console.log(`Error: Webpage ${url} returned a non-200 response.`);
      yield null;
      return;
    }
    // console.log(`Scraping pageHtml ${pageHtml}...`);

    if (!pageHtml) {
      console.log(`Error: Webpage ${url} returned a non-200 response.`);
      yield null;
      return;
    }

    // Valid HTML Found
    urls.add(url);

    const $ = cheerio.load(pageHtml as string);
    const links = $('a').get();

    for (const link of links) {
      const linkHref = $(link).attr('href');

      if (!linkHref) {
        continue;
      }

      const parsedLink = new URL(linkHref, origin);

      // Check if the link is on the same domain as the input domain string
      if (parsedLink.origin !== origin) {
        continue;
      }

      // Check if the link points to an HTML page
      const uniqueLink = getUniqueUrl(parsedLink.href);
      const lowerCaseLink = uniqueLink.toLowerCase();

      if (visitedUrls.has(lowerCaseLink)) {
        continue;
      }

      if (
        !lowerCaseLink.endsWith('.html') &&
        !lowerCaseLink.endsWith('.htm') &&
        !lowerCaseLink.endsWith('.php') &&
        !lowerCaseLink.includes('.')
      ) {
        continue;
      }

      yield lowerCaseLink;

      yield* scrapePage(lowerCaseLink, origin, urls);
    }
  } catch (err) {
    console.log(`Error: ${url} returned a non-200 response.`);
    console.error(err);
    // If an error occurs, yield a null value and continue to the next link
    return;
  }
}

const getUniqueUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace(/^www\./i, '');
  const path = parsedUrl.pathname.replace(/\/+$/, ''); // remove trailing slashes
  return `https://${hostname}${path.replace(/\/+/g, '/')}`;
};
const getUniqueUrls = (urls: string[]) => Array.from(new Set(urls.map((url) => getUniqueUrl(url))));

const getUniqueDomains = (urls: string[]) =>
  urls?.map((url) => {
    const parsedUrl = new URL(url);
    return `https://${parsedUrl.hostname.replace(/^www\./i, '')}`;
  });

export const processWebUrlScrape: EventVersionHandler<{ urls: string[]; byDomain: boolean }> = {
  event: 'web/urls.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { urls, byDomain } = data;

    if (byDomain) {
      const domains = getUniqueDomains(urls);
      const domainPromises = domains.map((domain) => {
        inngest.send({
          v: event.v,
          ts: new Date().valueOf(),
          name: 'web/domain.sync',
          data: {
            domain
          },
          user: event.user
        });
      });

      if (domainPromises?.length) {
        await Promise.all(domainPromises);
      }
    } else {
      const uniqueUrls = getUniqueUrls(urls);
      await inngest.send({
        v: event.v,
        ts: new Date().valueOf(),
        name: 'web/page.sync',
        data: {
          urls: uniqueUrls
        },
        user: event.user
      });
    }
  }
};

export const processWebDomainScrape: EventVersionHandler<{ domain: string }> = {
  event: 'web/domain.sync',
  v: '1',
  handler: async ({ event }) => {
    console.time('processWebDomainScrape');
    const data = event.data;
    const { domain } = data;

    let urls = await extractUrlsFromSitemap(`${domain}/sitemap.xml`);
    if (!urls?.length) urls = await extractUrlsFromSitemap(`${domain}/sitemap-index.xml`);

    if (!urls?.length) {
      const uniqueDomain = getUniqueUrl(domain);
      try {
        await inngest.send({
          v: event.v,
          ts: new Date().valueOf(),
          name: 'web/deep.sync',
          data: {
            domain: uniqueDomain
          },
          user: event.user
        });
      } catch (error) {}
    } else {
      const uniqueUrls = getUniqueUrls(urls);
      try {
        await inngest.send({
          v: event.v,
          ts: new Date().valueOf(),
          name: 'web/page.sync',
          data: {
            urls: uniqueUrls
          },
          user: event.user
        });
      } catch (error) {}
    }
    console.timeEnd('processWebDomainScrape');
  }
};

const getWebPagesVectors = async (webPages: WebPage[]) => {
  const vectors = (
    await Promise.all(
      webPages.map(async (page) => {
        if (!page?.content) {
          return [];
        }

        page.content = `# ${page.url}\n${page.content}`;
        const markdownChunks = await splitPageHtml(page);
        if (!markdownChunks?.length) return [];

        return markdownChunks.map((headingChunk: string, i: any) => ({
          uid: `WebPage_${page.url}_${i}`,
          text: headingChunk,
          metadata: {
            source: 'web',
            domain: page?.domain?.toLowerCase(),
            url: page?.url?.toLowerCase()
          }
        }));
      })
    )
  )
    .flat()
    .filter(Boolean);

  return vectors;
};

const embedVectors = async (event: any, vectors: any[]) => {
  let outVectors: void[] = [];

  if (vectors?.length && vectors?.every((x: any) => !!x)) {
    outVectors = await Promise.all(
      chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
        inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'pinecone/vectors.upserted',
          data: {
            _page: i,
            _total: vectors.length,
            _batchSize: PINECONE_VECTORS_BATCH_SIZE,
            vectors: batchVectors
          },
          user: event.user
        });
      })
    );
  }

  return outVectors;
};

export const processWebDeepScrape: EventVersionHandler<{ domain: string }> = {
  event: 'web/deep.sync',
  v: '1',
  handler: async ({ event }) => {
    try {
      const data = event.data;
      const { domain } = data;

      const urls: Set<string> = new Set();
      const uniqueUrl = getUniqueUrl(domain);
      const origin = new URL(uniqueUrl).origin;

      for await (const link of scrapePage(uniqueUrl, origin, urls)) {
      }

      const uniqueUrls = getUniqueUrls(Array.from(urls));
      const webPagesHtml = (await webPageLoader.loadMany(uniqueUrls)) as string[];

      const webPages = uniqueUrls
        .map((url, index) => {
          const content = webPagesHtml[index];
          const domain = new URL(url).origin;

          return {
            url,
            domain,
            content
          };
        })
        .filter((x) => !!x?.content);
      const vectors = await getWebPagesVectors(webPages);

      const embeddedVectors = await embedVectors(event, vectors);
    } catch (error) {
      console.error(`Web Deep Vector upset Error: ${error}`);
    }
  }
};

export const processWebScrape: EventVersionHandler<{ urls: string[] }> = {
  event: 'web/page.sync',
  v: '1',
  handler: async ({ event }) => {
    try {
      const data = event.data;
      const { urls } = data;

      const uniqueUrls = getUniqueUrls(Array.from(urls));
      const webPagesHtml = (await webPageLoader.loadMany(uniqueUrls)) as string[];

      const webPages = uniqueUrls
        .map((url, index) => {
          const content = webPagesHtml[index];
          const domain = new URL(url).origin;

          return {
            url,
            domain,
            content
          };
        })
        .filter((x) => !!x?.content);
      const vectors = await getWebPagesVectors(webPages);

      const embeddedVectors = await embedVectors(event, vectors);
    } catch (error) {
      console.error(`[web/page.sync] ${error}`);
    }
  }
};
