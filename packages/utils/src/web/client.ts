import axios from 'axios';
import Redis from 'ioredis';

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

  // async handleRateLimit(response: AxiosResponse) {
  //   let retryAfter = response.headers['Retry-After'];
  //   let resetTime = response.headers['X-RateLimit-Reset'];

  //   if (retryAfter) {
  //     console.log(`Too many requests, retrying after ${retryAfter} seconds.`);
  //     await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  //   } else if (resetTime) {
  //     console.log(`Too many requests, retrying after ${resetTime}.`);
  //     // let timeToWait = new Date(resetTime) - new Date();
  //     // await new Promise((resolve) => setTimeout(resolve, timeToWait));
  //   }
  // }

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
          throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
        }

        // TODO: Add handler for HTTP requests
        // if (response.status === 429) {
        //   await this.handleRateLimit(response);
        //   return null;
        // }
        data = response?.data;
        if (cache) await this.redis.set(hashKey, JSON.stringify(data));
        if (cache) await this.redis.expire(hashKey, this.cacheExpireTime);
      } catch (err) {
        console.error(`Error fetching data from ${url}`, err);
        data = false;
      }
    }

    return data;
  }

  // Puppeteer - MUCH slower
  // async fetchWebData(url: string, { cache = true }: { cache?: boolean } = {}) {
  //   let data;
  //   // Add cache around this call to Web
  //   //TODO remove custom implementation when issue is fixed: https://github.com/RasCarlito/axios-cache-adapter/issues/272
  //   const hashKey = 'v4-get-' + url;
  //   if (cache) {
  //     try {
  //       const cachedData = await this.redis.get(hashKey);

  //       if (cachedData) {
  //         data = JSON.parse(cachedData);
  //       }
  //     } catch (err) {
  //       console.warn('NO REDIS CONNECTION, SKIPPING CACHE LOOKUP');
  //       console.log(err);
  //     }
  //   }

  //   if (!data) {
  //     try {
  //       const browser: Browser = await puppeteer.launch({
  //         headless: true
  //       });

  //       const page: Page = await browser.newPage();
  //       page.setUserAgent(
  //         'Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10'
  //       );
  //       await page.goto(url);

  //       data = await page.content();
  //       if (cache) {
  //         await this.redis.set(hashKey, JSON.stringify(data));
  //         await this.redis.expire(hashKey, this.cacheExpireTime);
  //       }
  //     } catch (err) {
  //       console.error(`Error fetching data from ${url}`, err);
  //       data = false;
  //     }
  //   }

  //   return data;
  // }
}

export default WebClient;
