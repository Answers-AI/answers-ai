import { inngest } from './client';
import { webPageLoader } from '../web';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { WebPage } from 'types';
import { extractUrlsFromSitemap } from '../utilities/getSitemapUrls';

const PINECONE_VECTORS_BATCH_SIZE = 100;

export const processWebDomainScrape: EventVersionHandler<{ domain: string }> = {
  event: 'web/domain.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { domain } = data;

    const urls = await extractUrlsFromSitemap(`${domain}/sitemap.xml`); // TODO: Write parser for XML

    const webPages = (await webPageLoader.loadMany(urls)) as WebPage[];

    const summarize = (page: any) =>
      `Details for ${page?.url} is ${Object.entries({
        content: page?.content
      })
        .filter(([key, value]) => !!value)
        .map(([key, value]) => `${key}: ${value}`)}`;

    const vectors = webPages.flatMap((page) => {
      const headingsRegex = /(^|\n)###?\s/g;
      const headingsArray = page.content.split(headingsRegex);

      return (
        headingsArray
          // .filter((_: any, i: number) => i % 2 !== 0)
          .map((heading: any, i: any) => ({
            uid: `WebPage_${page.url}_${i}`,
            text: summarize({ ...page, content: heading }),
            metadata: {
              url: page?.url
            }
          }))
      );
    });

    if (vectors?.length)
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

    const summarize = (page: any) =>
      `Details for ${page?.url} is ${Object.entries({
        content: page?.content
      })
        .filter(([key, value]) => !!value)
        .map(([key, value]) => `${key}: ${value}`)}`;

    const vectors = webPages.flatMap((page) => {
      const headingsRegex = /(^|\n)###?\s/g;
      const headingsArray = page.content.split(headingsRegex);

      return (
        headingsArray
          // .filter((_: any, i: number) => i % 2 !== 0)
          .map((heading: any, i: any) => ({
            uid: `WebPage_${page.url}_${i}`,
            text: summarize({ ...page, content: heading }),
            metadata: {
              url: page?.url
            }
          }))
      );
    });

    if (vectors?.length)
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
};
