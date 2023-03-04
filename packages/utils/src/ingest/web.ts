import { inngest } from './client';
import { WebPage } from '../web';
import { getWebPages } from '../web/getWebPages';
import { webPageLoader } from '../web';

import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';

const BATCH_SIZE = 1000;
const EMBEDDING_BATCH_SIZE = 300;

export const processWebScrape: EventVersionHandler<{ url: string }> = {
  event: 'web/page.sync',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    const { url } = data;
    const urls = [url];
    // Chunk projects into batches of 10
    const webPages = await getWebPages({
      url
    });

    console.log('webPages', webPages);

    try {
      // @ts-ignore
      await webPageLoader.primeAll(webPages.map((page) => [page.url, page]));
    } catch (error) {
      console.log('Error priming loader', error);
    }

    // Chunk the pages into batches of BATCH_SIZE
    await Promise.all(
      chunkArray(urls, BATCH_SIZE).map((batchPages: WebPage[], i) => {
        const eventData = {
          _page: i,
          _total: urls.length,
          _batchSize: BATCH_SIZE,
          pageUrls: batchPages?.map((page) => page.url)
        };
        //TODO: Save to Redis by page url
        //TODO: In event only send page url
        inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'web/page.upserted',
          data: eventData
        });
      })
    );

    // const response = await axios.get(data.url, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'text/plain'
    //   }
    // });
    // const $ = cheerio.load(response.data);
    // const elements = $('body')
    //   .children()
    //   .filter((i, el) => {
    //     return !$(el).is('header, footer');
    //   });
    // const mkdown = NodeHtmlMarkdown.translate(
    //   /* html */ response.data,
    //   /* options (optional) */ {},
    //   /* customTranslators (optional) */ undefined,
    //   /* customCodeBlockTranslators (optional) */ undefined
    // );

    // console.log(mkdown);
  }
};

export let LAST_JOB_ID = 0;
export const processUpsertedPages: EventVersionHandler<{ pageUrls: string[]; key: string }> = {
  event: 'web/page.upserted',
  v: '1',
  handler: async ({ event }) => {
    try {
      const { pageUrls } = event.data;

      await Promise.all(
        chunkArray(pageUrls, EMBEDDING_BATCH_SIZE).map((batchIssues: WebPage[], i) => {
          const eventData = {
            _page: i,
            _total: pageUrls.length,
            _batchSize: EMBEDDING_BATCH_SIZE,
            pageUrls: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({
            v: '1',
            ts: new Date().valueOf(),
            name: 'web/page.embeddings.upserted',
            data: eventData
          });
        })
      );

      // await Promise.all(
      //   chunkArray(pageUrls, COMMENTS_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
      //     const eventData = {
      //       _page: i,
      //       _total: pageUrls.length,
      //       _batchSize: COMMENTS_BATCH_SIZE,
      //       pageUrls: batchIssues
      //     };
      //     //TODO: Save to Redis by issue key
      //     //TODO: In event only send issue keys
      //     inngest.send({
      //       v: '1',
      //       ts: new Date().valueOf(),
      //       name: 'jira/issueComments.upserted',
      //       data: eventData
      //     });
      //   })
      // );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
