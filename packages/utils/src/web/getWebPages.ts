import { WebPage, webClient } from './index';
import cheerio from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';

export const getWebPages = async ({ url }: { url: string }): Promise<WebPage[]> => {
  try {
    // console.time(`getWebPages -> URL:${url}`);
    const promises = [];

    promises.push(
      webClient.fetchWebData(url, { cache: false }).then((result) => {
        const $ = cheerio.load(result);
        const elements = $('body')
          .children()
          .filter((i: any, el: any) => {
            return !$(el).is('header, footer');
          });
        const mkdown = NodeHtmlMarkdown.translate(
          /* html */ elements.html() || '',
          /* options (optional) */ {},
          /* customTranslators (optional) */ undefined,
          /* customCodeBlockTranslators (optional) */ undefined
        );
        return {
          url,
          content: mkdown
        };
      })
    );

    const allPages = (await Promise.all(promises)).flat();
    console.log(allPages);
    console.log(`${url} Page Count: ${allPages.length}`);
    // console.timeEnd(`getWebPages -> URL:${url}`);

    return allPages;
  } catch (error) {
    console.error('getWebPages:ERROR', error);
    throw error;
  }
};
