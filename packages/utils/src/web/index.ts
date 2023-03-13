import WebClient from './client';
import { getWebPage } from './getWebPage';
import redisLoader from '../redisLoader';

export const webClient = new WebClient();

export type WebPage = {
  url: string;
  content: string;
  title?: string;
  description?: string;
};

export const webPageLoader = redisLoader<string, WebPage>({
  keyPrefix: 'web:page',
  redisConfig: process.env.REDIS_URL as string,
  // getValuesFn: (keys) => Promise.all(keys.map((url) => getWebPage({ url }))),
  getValuesFn: async (keys) => {
    const results: WebPage[] = [];
    for (const url of keys) {
      const result = await getWebPage({ url });
      results.push(result);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return Promise.all(results);
  },
  cacheExpirationInSeconds: 0,
  disableCache: false
});
