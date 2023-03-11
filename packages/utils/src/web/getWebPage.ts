import { WebPage, webClient } from './index';
import cheerio from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Readability } from '@mozilla/readability';
//@ts-ignore-next-line
import { JSDOM } from 'jsdom';

interface ContentItem {
  type: 'header' | 'section' | 'paragraph';
  content: string;
}

const contentElementSelectors: string[] = [
  'main',
  'article',
  '.content',
  '.entry-content',
  '#content',
  '#main-content'
];

const removeDuplicateHeaders = (markdown: string): string => {
  const regex = /^(#+)(.*)$/gm;
  const headers: { level: number; start: number; end: number }[] = [];

  // Find all the headers and their positions
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    headers.push({
      level: match[1].length,
      start: match.index,
      end: match.index + match[0].length
    });
  }

  // Loop through the headers and remove duplicates
  for (let i = headers.length - 1; i >= 1; i--) {
    const currentHeader = headers[i];
    const prevHeader = headers[i - 1];

    if (currentHeader.level === prevHeader.level) {
      // Check if there is non-white space content between the headers
      const content = markdown.substring(prevHeader.end, currentHeader.start);
      if (!/^\s*$/s.test(content)) {
        continue;
      }

      // Remove the previous header
      markdown = markdown.substring(0, prevHeader.start) + markdown.substring(prevHeader.end);
      headers.splice(i - 1, 1);
    }
  }

  return markdown;
};

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
  'video',
  'canvas',
  'form'
];

export const getWebPage = async ({ url }: { url: string }): Promise<WebPage> => {
  console.log('====================================');
  console.log(`===Fetching webpage: ${url}`);
  try {
    const pageHtml = await webClient.fetchWebData(url, { cache: false });
    if (!pageHtml) throw new Error(`No valid HTML returned for url: ${url}`);

    const $ = cheerio.load(pageHtml);
    //Remove for sure unneeded elements
    $(excludeSelectors.join(',')).remove();

    // Re-wrapping content to hack scoring a bit.
    $(contentElementSelectors.join(',')).each(function () {
      //@ts-ignore-next-line
      $(this).replaceWith($(this).html());
    });

    // Remove all querystring props
    $('a').each(function () {
      const url = $(this).attr('href');

      if (url && url.includes('?')) {
        const [baseUrl] = url.split('?');
        $(this).attr('href', baseUrl);
      }
    });

    const dom = new JSDOM(`<article>${$.html()}</article>`, { url });

    const document = dom.window.document;

    const reader = new Readability(document, {
      debug: false,
      keepClasses: false,
      disableJSONLD: false
    });
    const article = reader.parse();

    const rawMarkdown = NodeHtmlMarkdown.translate(
      /* html */ article?.content || '', //$content.html() || '',
      /* options */ {
        maxConsecutiveNewlines: 1
      },
      /* customTranslators (optional) */ undefined,
      /* customCodeBlockTranslators (optional) */ undefined
    );
    const mkdown = removeDuplicateHeaders(rawMarkdown);

    const pageData = {
      url,
      title: article?.title,
      description: article?.excerpt,
      content: mkdown
    };

    return pageData;
  } catch (error) {
    console.error('getWebPage:ERROR', error);
    throw error;
  }
};
