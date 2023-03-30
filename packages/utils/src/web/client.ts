import axios, { AxiosError } from 'axios';
import Redis from 'ioredis';
import puppeteer from 'puppeteer';

class WebClient {
  redis: Redis;
  headers: { Authorization?: string; Accept: string; Cookie?: string };
  cacheExpireTime: number;
  constructor({ cacheExpireTime = 60 * 60 * 24 } = {}) {
    this.cacheExpireTime = cacheExpireTime;
    this.redis = new Redis(process.env.REDIS_URL as string);
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
        const cachedData = await this.redis.get(hashKey);

        if (cachedData) {
          data = JSON.parse(cachedData);
        }
      } catch (err) {
        console.warn('NO REDIS CONNECTION, SKIPPING CACHE LOOKUP');
        console.log(err);
      }
    }

    if (!data) {
      try {
        const response = await axios.get(url, {
          method: 'GET',
          headers: this.headers
        });

        if (response.status !== 200) {
          throw new Error(`Response Failed to fetch data from ${url}. Status: ${response.status}`);
        }

        data = response?.data;

        // Rough Check if the page is fully loaded with JavaScript enabled
        const regex = /<body\b[^>]*>([\s\S]*?)<\/body>/i;
        const regexToRemove =
          /<(\w+)\b[^>]*>([\s]*?|(?:(?!<\/\1>)(.|\n))*?)<\/\1>|<noscript\b[^>]*>(.*?)<\/noscript>/gi;
        const htmlString = data;
        const strippedHtml = htmlString.match(regex)[1].replace(regexToRemove, '');

        if (strippedHtml.length < 100) {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          await page.goto(url);

          data = await page.content();

          await browser.close();
        }

        if (cache) {
          await this.redis.set(hashKey, JSON.stringify(data));
          await this.redis.expire(hashKey, this.cacheExpireTime);
        }
      } catch (err: AxiosError | any) {
        console.error(`Catch Error fetching data from ${url}.  Status: ${err?.response?.status}`);
        throw err;
      }
    }

    return data;
  }
}

export default WebClient;
