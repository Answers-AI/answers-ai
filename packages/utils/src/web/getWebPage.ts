import { WebPage, webClient } from './index';
import cheerio from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

interface ContentItem {
  type: 'header' | 'section' | 'paragraph';
  content: string;
}

const seoHeaderSelectors: string[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const sectionSelectors: string[] = ['section', '.section'];

const contentElementSelectors: string[] = [
  'main',
  'article',
  '.content',
  '.entry-content',
  '#content',
  '#main-content',
  'body'
];

const excludeSelectors: string[] = [
  'header',
  'footer',
  'nav',
  '.navbar',
  '.menu',
  'script',
  '.ad',
  '.ads',
  'img',
  'style',
  'aside',
  'link',
  '[role="tree"]',
  'svg',
  'video'
];

const flattenContent = (content: ContentItem[]): string => {
  let html = '';

  content.forEach((item) => {
    switch (item.type) {
      case 'header':
        html += `<h1>${item.content}</h1>`;
        break;
      case 'section':
        html += `<section>${item.content}</section>`;
        break;
      case 'paragraph':
        html += `<p>${item.content}</p>`;
        break;
      default:
        break;
    }
  });

  return html;
};

export const getWebPage = async ({ url }: { url: string }): Promise<WebPage> => {
  try {
    console.log('====================================');
    console.log(`===Fetching webpage: ${url}`);

    const webpage = await webClient.fetchWebData(url, { cache: false }).then((result) => {
      const doc = new JSDOM(result, {
        url
      });

      const reader = new Readability(doc.window.document);
      const article = reader.parse();
      const title = article?.title || '';
      const description = article?.excerpt || '';
      const h1Tags = null;
      // const $ = cheerio.load(result);

      // const title = $('title').text();
      // const description = $('meta[name="description"]').attr('content');
      // const h1Tags = $('h1')
      //   .map((i, el) => $(el).text())
      //   .get();

      // let content = '';

      // $(excludeSelectors.join(',')).remove();

      // contentElementSelectors.some((selector) => {
      //   const elements = $(selector);
      //   if (elements.length > 0) {
      //     content = elements.html() || '';
      //     return true;
      //   }
      //   return false;
      // });

      // const $content = $(`<div>${content}</div>`);
      // const contentArray: ContentItem[] = [];

      // $content.children().each((i, el) => {
      //   const $el = $(el);
      //   const tagName = $el.prop('tagName')?.toLowerCase() || '';
      //   const textContent = $el.text().trim();

      //   if (seoHeaderSelectors.includes(tagName)) {
      //     contentArray.push({ type: 'header', content: textContent });
      //   } else if (sectionSelectors.includes(tagName)) {
      //     contentArray.push({ type: 'section', content: textContent });
      //   } else {
      //     const lastItem = contentArray[contentArray.length - 1];
      //     if (lastItem && lastItem.type === 'paragraph') {
      //       lastItem.content += ` ${textContent}`;
      //     } else {
      //       contentArray.push({ type: 'paragraph', content: textContent });
      //     }
      //   }
      // });

      // const flattenedContent = flattenContent(contentArray);

      const mkdown = NodeHtmlMarkdown.translate(
        /* html */ article?.content || '', //$content.html() || '',
        /* options (optional) */ {
          maxConsecutiveNewlines: 1
        },
        /* customTranslators (optional) */ undefined,
        /* customCodeBlockTranslators (optional) */ undefined
      );

      console.log(`Markdown content: ${mkdown.length} characters`);

      return {
        url,
        title,
        description,
        content: mkdown
      };
    });
    return webpage;
  } catch (error) {
    console.error('getWebPage:ERROR', error);
    throw error;
  }
};
