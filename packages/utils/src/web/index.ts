import WebClient from './client';
import { getWebPageHtml } from './getWebPage';
import redisLoader from '../redisLoader';

export const webClient = new WebClient();

export const webPageLoader = redisLoader<string, string>({
  keyPrefix: 'web:page:v1',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: async (keys) => {
    const results: Array<string> = [];

    for (const url of keys) {
      const result = await getWebPageHtml({ url });
      results.push(result);
    }

    const allResults = await Promise.all(results);
    return allResults;
  },
  cacheExpirationInSeconds: 0,
  disableCache: false
});
