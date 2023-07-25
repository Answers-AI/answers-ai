import cheerio from 'cheerio';

const prepareHtml = (url: string, html: string): string => {
  const $ = cheerio.load(html);

  const excludeSelectors: string[] = [
    'noscript',
    'iframe',
    'header',
    'footer',
    'nav',
    '.navbar',
    '.menu',
    'script',
    '.ad',
    '.ads',
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
    'cite',
    'sup',
    'hr'
  ];

  // Remove elements matching the given selectors
  excludeSelectors.forEach((selector) => {
    $(selector).remove();
  });

  const textContent = $('body').text();

  if (!textContent || textContent.length < 100) {
    return '';
  }

  // Function to check if the input string is a valid URL
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const urlObject = new URL(url);

  // Function to remove attributes from a DOM element
  const updateAttributes = (element: any) => {
    const attributes = Object.keys(element[0].attribs);

    attributes.forEach((attribute) => {
      if (attribute === 'src') {
        const src = element.attr('src');
        if (src?.startsWith('/')) {
          element.attr('src', new URL(src, urlObject.origin).href);
        } else if (src && !isValidUrl(src)) {
          // If the image src is not a valid URL, remove the image
          element.remove();
        }
      } else if (attribute === 'href') {
        const href = element.attr('href');
        if (href?.startsWith('/')) {
          element.attr('href', new URL(href, urlObject.origin).href);
        }
      } else {
        element.removeAttr(attribute);
      }
    });
  };

  // Recursively remove attributes from all elements
  const stripAttributesRecursive = (element: any) => {
    updateAttributes(element);
    element.children().each((_: any, childNode: { type: string }) => {
      if (childNode.type === 'tag') {
        stripAttributesRecursive($(childNode as any));
      }
    });
  };

  // Remove attributes from all elements in the document body
  stripAttributesRecursive($('body'));

  const h1Elements = $('h1');
  h1Elements.each((_, h1) => {
    const innerHtml = $(h1).html();
    $(h1).replaceWith(`<h2>${innerHtml}</h2>`);
  });

  const newTag = $('<h1></h1>').html($('title').text() || urlObject.href);
  $('body').prepend(newTag);

  return $.html();
};

export default prepareHtml;
