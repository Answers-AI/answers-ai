import { URL } from 'url';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from "langchain/document";
import { NodeHtmlMarkdown } from 'node-html-markdown';

import { prisma } from '@db/client';

import { inngest } from './client';
import { webPageLoader } from '../web';

import getSitemapUrls from '../utilities/getSitemapUrls';
import chunkArray from '../utilities/chunkArray';
import getAxiosErrorMessage from '../utilities/getAxiosErrorMessage';
import { getUniqueUrls, getUniqueUrl } from '../getUniqueUrls';
import { fetchSitemapUrls } from '../fetchSitemapUrls';
import getPendingSyncURLs from './getPendingSyncURLs';
import { getUniqueDomains, getUrlDomain } from '../getUrlDomain';

import type { EventVersionHandler } from './EventVersionHandler';
import type { WebPage } from 'types';
import getDomainUrlsFromMarkdown from '../utilities/getDomainUrlsFromMarkdown';


const PINECONE_VECTORS_BATCH_SIZE = 100;
const WEB_PAGE_SYNC_BATCH_SIZE = 10;

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

const recursiveCharacterTextSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 2000,
  chunkOverlap: 100, separators: ['#####'], keepSeparator: true
});


const getWebPagesVectors = async (webPages: WebPage[]) => {
  const vectors = (
    await Promise.all(
      webPages.map(async (page) => {
        if (!page?.content) {
          console.log(`[getWebPagesVectors] No content found for ${page.url.toLowerCase}`)
          return [];
        }

        const pageContent = prefixHeaders(page.content)
          .replace(/\n{2,}/g, '\n')
          .replace(/^(#+\s+.+)\n(#+\s+.+\n)/gm, '$2');

        const markdownChunks = await recursiveCharacterTextSplitter.splitDocuments([
          new Document({ pageContent }),
        ]);

        if (!markdownChunks?.length) {
          console.log(`[getWebPagesVectors] No markdownChunks found for ${page.url}`)
          return [];
        }

        return markdownChunks.map((webDoc: Document, i: any) => ({
          uid: `WebPage_${page.url}_${i}`,
          text: webDoc.pageContent,
          metadata: {
            source: 'web',
            text: webDoc.pageContent,
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
  let outVectors: any[] = [];

  if (vectors?.length && vectors?.every((x: any) => !!x)) {
    try {
      outVectors = await Promise.all(
        chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map(async (batchVectors: any, i: any) => {
          try {
            const vectorSends = await inngest.send({
              v: '1',
              
              name: 'pinecone/vectors.upserted',
              data: {
                _page: i,
                _total: vectors.length,
                _batchSize: PINECONE_VECTORS_BATCH_SIZE,
                vectors: batchVectors
              },
              user: event.user
            });
            return vectorSends;
          } catch (error: unknown) {
            let message = getAxiosErrorMessage(error);
            return { error: `[Error in embedVectors] ${message}` };
          }
        })
      );

      const errors = outVectors.filter((result) => !!result?.error);

      if (errors?.length) {
        // TODO - handle errors
        throw errors[0];
      }
    } catch (error: unknown) {
      let message = getAxiosErrorMessage(error);
      return { error: `[Error in writeVectorsToIndex] ${message}` };
    }
  }

  return outVectors;
};

export const processWebUrlScrape: EventVersionHandler<{ urls: string[]; byDomain: boolean }> = {
  event: 'web/urls.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { urls, byDomain } = data;

    if (byDomain) {
      const domains = getUniqueDomains(urls);
      const domainPromises = domains.map((domain) =>
        inngest.send({
          v: event.v,
          
          name: 'web/domain.sync',
          data: {
            domain
          },
          user: event.user
        })
      );

      if (domainPromises?.length) {
        await Promise.all(domainPromises);
      }
    } else {
      const uniqueUrls = getUniqueUrls(urls);
      if (!uniqueUrls.length) {
        return;
      }

      inngest.send({
        v: event.v,
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

    if (!domain) {
      console.log('[web/domain.sync] No domain provided');
      return;
    }

    const [sitemapUrls, xmlUrls, xmlIndexUrls] = await Promise.all([
      fetchSitemapUrls(domain),
      getSitemapUrls(`${domain}/sitemap.xml`),
      getSitemapUrls(`${domain}/sitemap-index.xml`),
      getSitemapUrls(`${domain}/sitemap1.xml`),
    ]);

    const urls = [...(sitemapUrls || []), ...(xmlUrls || []), ...(xmlIndexUrls || [])];

    if (!urls?.length) {
      console.log('[web/domain.sync] Could not extract URLs from sitemap.  Preparing deep sync');
      inngest.send({
        v: event.v,
        
        name: 'web/page.sync',
        data: {
          recursive: true,
          parentId:`${new Date().valueOf()}-recursive`,
          urls: [domain]
        },
        user: event.user
      })
    } else {
      const uniqueUrls = getUniqueUrls(urls);
      const pendingSyncURLs = await getPendingSyncURLs(uniqueUrls);

      try {
        await Promise.all(
          chunkArray(pendingSyncURLs, WEB_PAGE_SYNC_BATCH_SIZE).map(async (urls) =>
            inngest.send({
              v: event.v,
              name: 'web/page.sync',
              data: {
                _total: pendingSyncURLs.length,
                urls
              },
              user: event.user
            })
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  }
};

export const processWebScrape: EventVersionHandler<{ urls: string[], recursive: boolean, parentId?: string }> = {
  event: 'web/page.sync',
  v: '1',
  handler: async ({ event }) => {
    const { urls, recursive, parentId } = event?.data;
    if (!urls) {
      throw new Error('Invalid input data: missing "urls" property');
    }

    // TODO: Validate if the URL exists in database
    // TODO: Verify how long it passed since it was synced

    const uniqueUrls = getUniqueUrls(Array.from(urls));

    const pendingSyncURLs = await getPendingSyncURLs(uniqueUrls);

    await prisma.document.updateMany({
      where: { url: { in: pendingSyncURLs } },
      data: {
        status: 'syncing'
      }
    });

    const webPagesHtml = (await webPageLoader.loadMany(pendingSyncURLs)) as string[];


    let recursiveUrls:string[] = [];
    const webPages = await Promise.all(
      pendingSyncURLs.map(async (url, index) => {
        const domain = new URL(url).origin
        const webData: WebPage = {
          url,
          domain,
          content: webPagesHtml[index],
        };

        if (!webData.content.length) {
          return {...webData, content: ''};
        }

        webData.content = NodeHtmlMarkdown.translate(webData.content, {}, undefined, undefined);

        // Now that we have valid HTML, check if this should be recursive so we can build out the spidering
        if (recursive) {
          recursiveUrls = [...recursiveUrls, ...getDomainUrlsFromMarkdown(webData.content, domain)];
          console.log({url, recursiveUrls});
          const recursiveId = parentId ?? new Date().valueOf();
          const recursiveEvents = recursiveUrls.map(url => {
            return {
              v: event.v,
              id: `${recursiveId}-${url}`,
              name: 'web/page.sync',
              data: {
                urls: [url],
                recursive,
                parentId:recursiveId
              },
              user: event.user
            }
          });
          inngest.send(recursiveEvents);
        }

        return webData;
      })
    );

    interface FilteredPages {
      validPages: WebPage[];
      invalidPages: WebPage[];
    }
    
    const { validPages, invalidPages }: FilteredPages = webPages.reduce(
      (acc: FilteredPages, page: WebPage) => {
        if (page?.content && page.content !== '') {
          acc.validPages.push(page);
        } else {
          acc.invalidPages.push(page);
        }
        return acc;
      },
      { validPages: [], invalidPages: [] }
    );

    // TODO: Update to remove from Pinecone as well
    if (invalidPages.length) {
      console.log(`Updating documents ${invalidPages.map((p) => p.url.toLowerCase())} from DB due to no valid content`);
      await prisma.document.updateMany({
        where: {
          url: { in: invalidPages.map((p) => p.url.toLowerCase()) }
        },
        data: {
          status: 'error',
          lastSyncedAt: new Date()
        }
      });
    }

    const vectors = await getWebPagesVectors(validPages);

    const embeddedVectors = await embedVectors(event, vectors);

    return pendingSyncURLs;
    // TODO: Update webData with syncedAt
  }
};

export const processWebPathScrape: EventVersionHandler<{ path: string }> = {
  event: 'web/path.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { path } = data;

    if (!path) {
      console.log('[web/path.sync] No path provided');
      return;
    }
    const domain = getUrlDomain(path);

    if (!domain) {
      console.log('[web/path.sync] Could not fetch domain');
      return;
    }

    // if (path === domain) {
    //   inngest.send({
    //     name: 'web/domain.sync',
    //     data: { domain },
    //     user: event.user
    //   });
    //   return;
    // }

    const [sitemapUrls, xmlUrls, xmlIndexUrls] = await Promise.all([
      fetchSitemapUrls(domain),
      getSitemapUrls(`${domain}/sitemap.xml`),
      getSitemapUrls(`${domain}/sitemap-index.xml`),
      getSitemapUrls(`${domain}/sitemap1.xml`),
    ]);

    const uniquePath = getUniqueUrl(path);

    const uniqueUrls = getUniqueUrls(([...(sitemapUrls || []), ...(xmlUrls || []), ...(xmlIndexUrls || [])])).filter(url => {
      console.log({url, uniquePath, starts:url.startsWith(uniquePath)})
      return url.startsWith(uniquePath)
    });

    if (!uniqueUrls?.length) {
      console.log('[web/path.sync] Could not extract URLs from sitemap.  Calling Scraper');
      inngest.send({
        v: event.v,
        
        name: 'web/page.sync',
        data: {
          recursive: true,
          parentId:`${new Date().valueOf()}-recursive`,
          urls: [path]
        },
        user: event.user
      })
    } else {
      const pendingSyncURLs = await getPendingSyncURLs(uniqueUrls);

      try {
        await Promise.all(
          chunkArray(pendingSyncURLs, WEB_PAGE_SYNC_BATCH_SIZE).map(async (urls) =>
            inngest.send({
              v: event.v,
              
              name: 'web/page.sync',
              data: {
                _total: pendingSyncURLs.length,
                urls
              },
              user: event.user
            })
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  }
};

