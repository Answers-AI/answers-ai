import OpenApiClient from './client';
import { getOpenApiJson } from './getOpenApiJson';
import redisLoader from '../redisLoader';
import { OpenApi } from 'types';

export const openApiClient = new OpenApiClient();

export const openApiLoader = redisLoader<string, OpenApi>({
  keyPrefix: 'web:page',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: (keys) => Promise.all(keys.map((url) => getOpenApiJson({ url }))),
  cacheExpirationInSeconds: 0,
  disableCache: false
});
