import { URL } from 'url';
import { inngest } from './client';
import { webPageLoader } from '../web';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { WebPage } from 'types';
import { extractUrlsFromSitemap } from '../utilities/getSitemapUrls';

const PINECONE_VECTORS_BATCH_SIZE = 100;

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

    const urls = await extractUrlsFromSitemap(`${domain}/sitemap.xml`); // TODO: Write parser for XML

    const webPages = (await webPageLoader.loadMany(urls)) as WebPage[];

    const vectors = webPages.flatMap((page) => {
      const headingsRegex = /(^|\n)##\s/g;
      const headingsArray = page.content.split(headingsRegex);

      return headingsArray.map((heading: any, i: any) => ({
        uid: `WebPage_${page.url}_${i}`,
        text: summarize({ ...page, content: heading }),
        metadata: {
          source: 'web',
          url: page?.url,
          cleanedUrl: getCleanedUrl(page?.url)
        }
      }));
    });

    if (vectors?.length) {
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
          url: page?.url,
          cleanedUrl: getCleanedUrl(page?.url)
        }
      }));
    });

    if (vectors?.length) {
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

// export const processPuppetScrape: EventVersionHandler<{ urls: string[] }> = {
//   event: 'web/puppet.sync',
//   v: '1',
//   handler: async ({ event }) => {
//     const data = event.data;
//     const { urls: iUrls } = data;

//     const webPages = (await puppeteerLoader.loadMany(iUrls)) as WebPage[];

//     const headingVectors = webPages.flatMap((page) => {
//       const headingsRegex = /\n+(?=\s*##\s(?!#))/;
//       const headingsArray = page.content.split(headingsRegex);

//       return headingsArray.map((heading: any, i: any) => ({
//         uid: `WebPage_${page.url}_${i}`,
//         text: summarize({ ...page, content: heading }),
//         metadata: {
//           url: page?.url,
//           cleanedUrl: getCleanedUrl(page?.url)
//         }
//       }));
//     });

//     const vectors = headingVectors.flatMap((page) => {
//       const headingsRegex = /\n+(?=\s*##\s(?!#))/;
//       const headingsArray = page.content.split(headingsRegex);

//       return headingsArray.map((heading: any, i: any) => ({
//         uid: `WebPage_${page.url}_${i}`,
//         text: summarize({ ...page, content: heading }),
//         metadata: {
//           url: page?.url,
//           cleanedUrl: getCleanedUrl(page?.url)
//         }
//       }));
//     });

//     if (vectors?.length) {
//       await Promise.all(
//         chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
//           //TODO: Save to Redis by page url
//           //TODO: In event only send page urls
//           inngest.send({
//             v: '1',
//             ts: new Date().valueOf(),
//             name: 'pinecone/vectors.upserted',
//             data: {
//               _page: i,
//               _total: vectors.length,
//               _batchSize: PINECONE_VECTORS_BATCH_SIZE,
//               vectors: batchVectors
//             },
//             user: event.user
//           });
//         })
//       );
//     }
//   }
// };
