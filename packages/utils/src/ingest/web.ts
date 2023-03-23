import { URL } from 'url';
import { inngest } from './client';
import { webPageLoader, webPageRawLoader } from '../web';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { WebPage } from 'types';
import { extractUrlsFromSitemap } from '../utilities/getSitemapUrls';

const PINECONE_VECTORS_BATCH_SIZE = 100;

import cheerio from 'cheerio';

const visitedUrls = new Set<string>();

async function* scrapePage(url: string, origin: string): AsyncGenerator<string | null> {
  if (!url || visitedUrls.has(url)) {
    return;
  }

  visitedUrls.add(url);
  const webPages = (await webPageRawLoader.loadMany([url])) as WebPage[];
  // if (url.indexOf('composable') > -1) console.log(webPages);
  if (!webPages || !webPages.length || !webPages[0]) yield null;

  const webPage: WebPage = webPages[0];

  if (!webPage?.content) {
    console.log('no content', url);
    yield null;
  }

  const $ = cheerio.load(webPage.content);
  const links = $('a').get();

  for (const element of links) {
    const link = $(element).attr('href');

    if (!link) {
      continue;
    }

    // Parse the link using the URL module
    const parsedLink = new URL(link, url);
    // Check if the link is on the same domain as the input domain string
    if (parsedLink.origin !== origin) {
      continue;
    }

    // Check if the link points to an HTML page
    const lowerCaseLink = parsedLink.href.toLowerCase().split('#')[0].split('?')[0];
    if (
      !lowerCaseLink.endsWith('.html') &&
      !lowerCaseLink.endsWith('.htm') &&
      !lowerCaseLink.endsWith('.php') &&
      !lowerCaseLink.includes('.')
    ) {
      continue;
    }

    const cleanedLink = getCleanedUrl(lowerCaseLink);
    if (visitedUrls.has(cleanedLink)) {
      continue;
    }

    visitedUrls.add(cleanedLink);

    yield lowerCaseLink;

    yield* scrapePage(lowerCaseLink, origin);
  }
}

const getTitleText = (page: any) => {
  if (!page.title) return '';
  return `the title of the page is "${page.title}" and`;
};

const getCleanedUrl = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/[\/\\]/g, '');

const getUniqueUrls = (urls: string[]) =>
  Array.from(
    new Set(
      urls.map((url) => {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace(/^www\./i, '');
        const path = parsedUrl.pathname.replace(/\/+$/, ''); // remove trailing slashes
        return `https://${hostname}${path.replace(/\/+/g, '/')}`;
      })
    )
  );

const getUniqueDomains = (urls: string[]) =>
  urls.map((url) => {
    const parsedUrl = new URL(url);
    return `https://${parsedUrl.hostname.replace(/^www\./i, '')}`;
  });

const summarize = (page: any) => page?.content;

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
    const data = event.data;
    const { domain } = data;

    let urls = await extractUrlsFromSitemap(`${domain}/sitemap.xml`);
    if (!urls?.length) urls = await extractUrlsFromSitemap(`${domain}/sitemap-index.xml`);

    const webPages = (await webPageLoader.loadMany(urls)) as WebPage[];

    const vectors = webPages.flatMap((page) => {
      const headingsRegex = /(^|\n)##\s/g;
      const headingsArray = page.content.split(headingsRegex);

      return headingsArray.map((heading: any, i: any) => ({
        uid: `WebPage_${page.url}_${i}`,
        text: summarize({ ...page, content: heading }),
        metadata: {
          source: 'web',
          url: page?.url?.toLowerCase(),
          cleanedUrl: getCleanedUrl(page?.url)
        }
      }));
    });

    if (vectors?.length && vectors?.every((x) => !!x)) {
      await Promise.all(
        chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
          //TODO: Save to Redis by page url
          //TODO: In event only send page urls
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
  }
};

export const processWebDeepScrape: EventVersionHandler<{ domain: string }> = {
  event: 'web/deep.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { domain } = data;

    // let urls = await extractUrlsFromSitemap(`${domain}/sitemap.xml`);
    // if (!urls?.length) urls = await extractUrlsFromSitemap(`${domain}/sitemap-index.xml`);

    // Example usage
    let urls: string[] = [];
    const origin = new URL(domain).origin;

    for await (const link of scrapePage(domain, origin)) {
      console.log('-____________', link);
      if (link) urls.push(new URL(link, origin).href);
    }

    // console.log({ urls });

    const webPages = (await webPageLoader.loadMany(urls.filter(Boolean))) as WebPage[];

    const vectors = webPages.flatMap((page) => {
      const headingsRegex = /(^|\n)##\s/g;
      const headingsArray = page.content.split(headingsRegex);

      return headingsArray.map((heading: any, i: any) => ({
        uid: `WebPage_${page.url}_${i}`,
        text: summarize({ ...page, content: heading }),
        metadata: {
          source: 'web',
          url: page?.url?.toLowerCase(),
          cleanedUrl: getCleanedUrl(page?.url)
        }
      }));
    });

    if (vectors?.length && vectors?.every((x) => !!x)) {
      await Promise.all(
        chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
          //TODO: Save to Redis by page url
          //TODO: In event only send page urls
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
  }
};

export const processWebScrape: EventVersionHandler<{ urls: string[] }> = {
  event: 'web/page.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { urls: iUrls } = data;

    // TODO: Write parser for XML
    // const sitemapUrl: string = iUrls[0];

    // const urls = await getSitemapLinks(sitemapUrl);
    const webPages = (await webPageLoader.loadMany(iUrls)) as WebPage[];

    const vectors = webPages.flatMap((page) => {
      const headingsRegex = /\n+(?=\s*##\s(?!#))/;
      const headingsArray = page.content.split(headingsRegex);

      return headingsArray.map((heading: any, i: any) => ({
        uid: `WebPage_${page.url}_${i}`,
        text: summarize({ ...page, content: heading }),
        metadata: {
          source: 'web',
          url: page?.url?.toLowerCase(),
          cleanedUrl: getCleanedUrl(page?.url)
        }
      }));
    });

    if (vectors?.length && vectors?.every((x) => !!x)) {
      await Promise.all(
        chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
          //TODO: Save to Redis by page url
          //TODO: In event only send page urls
          return inngest.send({
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
  }
};
