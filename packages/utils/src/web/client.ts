import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { redis } from '../redis/client';

import getAxiosErrorMessage from '../utilities/getAxiosErrorMessage';

import type { Browser, Page } from "langchain/document_loaders/web/puppeteer";

class WebClient {
  headers: { Authorization?: string; Accept: string; Cookie?: string };
  cacheExpireTime: number;

  constructor({ cacheExpireTime = 60 * 60 * 24 } = {}) {
    this.cacheExpireTime = cacheExpireTime;
    this.headers = {
      Accept: 'text/plain'
    };
  }

  async fetchWebData(url: string, { cache = true }: { cache?: boolean } = {}) {
    let data;
    // Add cache around this call to Web
    //TODO remove custom implementation when issue is fixed: https://github.com/RasCarlito/axios-cache-adapter/issues/272
    const hashKey = 'v4-get-' + url;
    if (cache) {
      try {
        const cachedData = await redis.get(hashKey);

        if (cachedData) {
          data = JSON.parse(cachedData);
        }
      } catch (err) {
        console.warn('NO REDIS CONNECTION, SKIPPING CACHE LOOKUP');
        console.log(err);
      }
    }

    try {
      const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
          headless: "new",
          args: [`--host-rules="MAP * 127.0.0.1, EXCLUDE ${url}"`]
        },
        gotoOptions: {
          waitUntil: "domcontentloaded",
        },
        async evaluate(page: Page, browser: Browser) {
          const result = await page.evaluate(() => {
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
              document.querySelectorAll(selector).forEach((element) => element.remove());
            });

            const textContent = document.body.textContent;
            
            if (!textContent || textContent.length < 100) {
               return '';
            }

            const url = window.location.href;
            const origin = window.location.origin;

            // Function to remove attributes from a DOM element
            const updateAttributes = (element: Element) => {
              const attributes = Array.from(element.attributes); // Convert the attributes to an array

              attributes.forEach(attribute => {
                if (attribute.name === 'src') {
                  const src = element.getAttribute('src');
                  if (src?.startsWith('/')) {
                    element.setAttribute('src',new URL(src, origin).href);
                  }
                } else if (attribute.name === 'href') {
                  const href = element.getAttribute('href');
                  if (href?.startsWith('/')) {
                    element.setAttribute('href',new URL(href, origin).href);
                  }
                } else {
                  element.removeAttribute(attribute.name);
                }
              });
            };

            // Recursively remove attributes from all elements
            const stripAttributesRecursive = (element: Element) => {
              updateAttributes(element);
              element.childNodes.forEach((childNode) => {
                if (childNode.nodeType === Node.ELEMENT_NODE) {
                  stripAttributesRecursive(childNode as Element);
                }
              });
            };

            // Remove attributes from all elements in the document body
            stripAttributesRecursive(document.body);

            let h1Elements = document.getElementsByTagName('h1');
            for (let i = 0; i < h1Elements.length; i++) {
              let h1 = h1Elements[i];
              let innerHtml = h1.innerHTML;
              h1.outerHTML = `<h2>${innerHtml}</h2>`;
            }

            const newTag = document.createElement('H1');
            newTag.innerHTML = document.title ?? url;
            document.body.insertBefore(newTag, document.body.firstChild);

            return document.body.innerHTML;
          });

          await browser.close();
          return result;
        },
      });

      const docs = await loader.load();
      
      if (!docs.length) {
        throw new Error('Issue fetching document')
      }

      data = docs[0].pageContent;

      if (cache) {
        await redis.set(hashKey, JSON.stringify(data));
        await redis.expire(hashKey, this.cacheExpireTime);
      }
    } catch (error: unknown) {
      let message = getAxiosErrorMessage(error);
      throw new Error(message);
    }


    return data;
  }
}

export default WebClient;
