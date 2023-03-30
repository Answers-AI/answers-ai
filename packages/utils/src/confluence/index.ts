import ConfluenceClient from './client';
import { getConfluencePage, getConfluencePages } from './getConfluencePages';
import redisLoader from '../redisLoader';

export const confluenceClient = new ConfluenceClient();

export type ConfluencePage = {
  id: number;
  status: string;
  title: string;
  spaceId: number;
  parentId: number;
  authorId: string;
  createdAt: string;
  version: {
    createdAt: string;
    message: string;
    number: number;
    minorEdit: boolean;
    authorId: string;
  };
  content: string;
  body: {
    storage?: {
      representation: string;
      value: string;
    };
    atlas_doc_format?: {
      representation: string;
      value: string;
    };
  };
};

export const confluencePagesLoader = redisLoader<string, ConfluencePage>({
  keyPrefix: 'confluence:page',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: async () => getConfluencePages(),
  cacheExpirationInSeconds: 0,
  disableCache: true
});

export const confluencePageLoader = redisLoader<string, ConfluencePage>({
  keyPrefix: 'confluence:page',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: async (keys) => {
    const results: ConfluencePage[] = [];
    for (const pageId of keys) {
      const result = await getConfluencePage({ pageId });
      results.push(result);
    }
    const allResults = await Promise.all(results);
    return allResults;
  },
  cacheExpirationInSeconds: 0,
  disableCache: true
});
