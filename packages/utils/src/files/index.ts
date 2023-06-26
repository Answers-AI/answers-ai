import FileClient from './client';
import { getFileHtml } from './getFile';
import redisLoader from '../redisLoader';

export const fileClient = new FileClient();

export const fileLoader = redisLoader<string, string>({
  keyPrefix: 'file:doc:v1',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: async (keys) => {
    const results: Array<string> = [];

    for (const fileId of keys) {
      const result = await getFileHtml({ fileId });
      results.push(result);
    }

    const allResults = await Promise.all(results);
    return allResults;
  },
  cacheExpirationInSeconds: 1000 * 60 * 60,
  disableCache: false
});
