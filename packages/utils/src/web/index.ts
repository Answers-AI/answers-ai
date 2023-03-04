import WebClient from './client';
import { getWebPages } from './getWebPages';
import redisLoader from '../redisLoader';

export const webClient = new WebClient();

export type WebPage = { url: string; content: string };

export const webPageLoader = redisLoader<string, WebPage>({
  keyPrefix: 'web:page',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: (keys) => getWebPages({ url: `key in (${keys?.join(',')})` }),
  cacheExpirationInSeconds: 0
});

export const indexAllWebPages = async (options: {
  url: string;
  batchSize?: number;
  maxResults?: number;
}) => {
  const data = await getWebPages(options);
  if (data) console.log('WebPage', data[0]);
};
