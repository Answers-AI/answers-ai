import { openApiClient } from './index';
import { OpenApi } from 'types';

export const getOpenApiJson = async ({ url }: { url: string }): Promise<OpenApi> => {
  console.log('====================================');
  console.log(`===Fetching OpenApi Data: ${url}`);
  try {
    const openApiJson = await openApiClient.fetchOpenApiData(url, { cache: false });
    if (!openApiJson) throw new Error(`No valid JSON returned for url: ${url}`);
    return openApiJson;
  } catch (error) {
    console.error('getOpenApiJson:ERROR', error);
    throw error;
  }
};
