import axios from 'axios';

import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer';
import { redis } from '../redis/client';

import getAxiosErrorMessage from '../utilities/getAxiosErrorMessage';

import prepareHtml from './prepareHtml';

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
      if (!data) {
        const response = await axios.get(url, {
          method: 'GET',
          headers: this.headers
        });

        if (response.status !== 200) {
          throw new Error(`Response Failed to fetch data from ${url}. Status: ${response.status}`);
        }

        data = response?.data;
        data = prepareHtml(url, data);
      }
    } catch (error: unknown) {
      let message = getAxiosErrorMessage(error);
      throw new Error(message);
    }

    try {
      if (!data || data.trim() === '') {
        console.log(`No valid HTML from axios for ${url}.   Attempting Puppeteer...`);
        const loader = new PuppeteerWebBaseLoader(url, {
          launchOptions: {
            headless: 'new',
            args: [`--host-rules="MAP * 127.0.0.1, EXCLUDE ${url}"`]
          },
          gotoOptions: {
            waitUntil: 'domcontentloaded'
          }
        });

        const docs = await loader.load();

        if (!docs.length) {
          throw new Error('Issue fetching document');
        }

        data = prepareHtml(url, docs[0].pageContent);
      }

      if (!data || data.trim() === '') {
        throw new Error(`Issue fetching ${url} using both axios and Puppeteer`);
      }

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
