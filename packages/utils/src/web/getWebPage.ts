import { WebPage, webClient } from './index';
import cheerio from 'cheerio';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Readability } from '@mozilla/readability';
//@ts-ignore-next-line
import { JSDOM } from 'jsdom';
import showdown, { ConverterOptions } from 'showdown';

const showDownOptions: ConverterOptions = {
  omitExtraWLInCodeBlocks: true,
  noHeaderId: true,
  prefixHeaderId: false,
  rawPrefixHeaderId: false,
  ghCompatibleHeaderId: false,
  headerLevelStart: 1,
  parseImgDimensions: false,
  simplifiedAutoLink: false,
  literalMidWordUnderscores: false,
  strikethrough: true,
  tables: true,
  tablesHeaderId: false,
  ghCodeBlocks: true,
  tasklists: true,
  smoothLivePreview: false,
  smartIndentationFix: false,
  disableForced4SpacesIndentedSublists: false,
  simpleLineBreaks: false,
  requireSpaceBeforeHeadingText: false,
  ghMentions: false,
  ghMentionsLink: 'https://github.com/{u}',
  encodeEmails: true,
  openLinksInNewWindow: false,
  backslashEscapesHTMLTags: false,
  emoji: false,
  underline: false,
  completeHTMLDocument: false,
  metadata: false
};

const convertMarkdownToHtml = (markdown: string, options?: ConverterOptions): string => {
  const converter = new showdown.Converter(options);
  return converter.makeHtml(markdown);
};

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
  '[role="navigation"]',
  'svg',
  'video',
  'canvas',
  'form',
  '[role="alert"]',
  '[class*="toc"]',
  '[class*="table-of-contents"]',
  'cite',
  'sup'
];

export const getWebPage = async ({
  url,
  getRaw
}: {
  url: string;
  getRaw: boolean;
}): Promise<WebPage> => {
  console.log(`===Fetching webpage: ${url}`);
  try {
    const pageHtml = await webClient.fetchWebData(url, { cache: false });
    if (!pageHtml) throw new Error(`No valid HTML returned for url: ${url}`);

    if (getRaw) {
      return { url, content: pageHtml };
    }

    let $ = cheerio.load(pageHtml);
    $(excludeSelectors.join(',')).remove();

    const initialHtml = $.html();

    const initialMarkdown = NodeHtmlMarkdown.translate(initialHtml, {}, undefined, undefined);

    const html = convertMarkdownToHtml(initialMarkdown, showDownOptions);
    $ = cheerio.load(html);

    $('h1').each(function () {
      const $el = $(this);
      const innerHtml = $el.html();
      $el.replaceWith(`<h2>${innerHtml}</h2>`);
    });

    $('h2').each((i, elem) => {
      const section = $('<section></section>');
      let nextSiblings = $(elem).nextUntil('h2');
      let nextElem = $(elem).next();
      if (nextElem.length && nextElem[0].tagName === 'h2') {
        // If the next element is an h2, remove the current h2 and continue to the next one
        $(elem).remove();
        return;
      }
      $(elem).html($(elem).text()).add(nextSiblings).wrapAll(section);
    });

    $('body')
      .children()
      .each((i, elem) => {
        if (elem.tagName !== 'section') {
          $(elem).remove();
        }
      });

    $('a').each(function () {
      const $link = $(this);
      const innerHtml = $link.html() as string;
      $link.replaceWith(innerHtml);
    });

    $('*').each(function () {
      if ($(this).text().trim().length < 2) {
        $(this).remove();
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

    const mkdown = NodeHtmlMarkdown.translate(
      /* html */ article?.content || '', //$content.html() || '',
      /* options */ {
        // maxConsecutiveNewlines: 2
      },
      /* customTranslators (optional) */ undefined,
      /* customCodeBlockTranslators (optional) */ undefined
    );
    // const mkdown = removeDuplicateHeaders(rawMarkdown);

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
