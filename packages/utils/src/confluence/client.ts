import axios, { AxiosResponse } from 'axios';
import Redis from 'ioredis';
import { ConfluenceSpace } from 'types';

interface RequestOptions {
  cache?: boolean;
}

class ConfluenceClient {
  redis: Redis;
  accessToken?: string;
  cloudId: Promise<string>;
  headers: { Authorization: string; Accept: string };
  cacheExpireTime: number;
  constructor({
    cacheExpireTime = 60 * 60 * 24,
    accessToken
  }: { cacheExpireTime?: number; accessToken?: string } = {}) {
    this.cacheExpireTime = cacheExpireTime;

    this.redis = new Redis(process.env.REDIS_URL as string);
    this.accessToken = accessToken;
    this.cloudId = this.getCloudId();
    this.headers = {
      Authorization: accessToken
        ? `Bearer ${accessToken}`
        : `Basic ${Buffer.from(`adam@lastrev.com:${process.env.CONFLUENCE_ACCESS_TOKEN}`).toString(
            'base64'
          )}`,
      Accept: 'application/json'
    };
  }

  async handleRateLimit(response: AxiosResponse) {
    const retryAfter = Number(response.headers['retry-after']) || 30;
    console.log(`Rate limited, waiting for ${retryAfter} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  }

  async getAppData() {
    const response = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: this.headers
    });

    console.log('Response', response.data);
    return response.data;
  }

  async getCloudId() {
    const appData = await this.getAppData();
    console.log('APpData', appData);
    const confluenceData = appData.find((app: any) =>
      app.scopes?.some((scope: string) => scope.includes('confluence'))
    );
    return confluenceData.id;
  }

  async getSpaces(): Promise<{ results: ConfluenceSpace[] }> {
    const cloudId = await this.cloudId;
    const response = await axios.get(
      `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/rest/api/space`,
      {
        headers: this.headers
      }
    );

    return response.data;
  }

  async fetchConfluenceData(endpoint: string, { cache = true }: RequestOptions = {}) {
    const cloudId = await this.cloudId;
    const url = `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/rest/api/v2${endpoint}`;
    let data: any;

    if (cache) {
      try {
        const cachedData = await this.redis.get(url);

        if (cachedData) {
          data = JSON.parse(cachedData);
        }
      } catch (err) {
        console.warn('NO REDIS CONNECTION, SKIPPING CACHE LOOKUP');
        console.error(err);
      }
    }

    if (!data) {
      const response = await axios.get(url, {
        headers: this.headers
      });

      if (response.status === 429) {
        await this.handleRateLimit(response);
        return null;
      }

      data = response.data;

      if (cache) {
        await this.redis.set(url, JSON.stringify(data));
        await this.redis.expire(url, this.cacheExpireTime);
      }
    }

    return data;
  }
}

export const confluenceClient = new ConfluenceClient();

export default ConfluenceClient;
