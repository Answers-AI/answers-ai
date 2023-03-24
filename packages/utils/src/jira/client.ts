import axios, { AxiosResponse } from 'axios';
import Redis from 'ioredis';

class JiraClient {
  redis: Redis;
  headers: { Authorization: string; Accept: string };
  cacheExpireTime: number;
  constructor({ cacheExpireTime = 60 * 60 * 24 } = {}) {
    this.cacheExpireTime = cacheExpireTime;
    this.redis = new Redis(process.env.REDIS_URL as string);
    this.headers = {
      Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString(
        'base64'
      )}`,
      Accept: 'application/json'
    };
  }

  async handleRateLimit(response: AxiosResponse) {
    let retryAfter = response.headers['Retry-After'];
    let resetTime = response.headers['X-RateLimit-Reset'];

    if (retryAfter) {
      console.log(`Too many requests, retrying after ${retryAfter} seconds.`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
    } else if (resetTime) {
      console.log(`Too many requests, retrying after ${resetTime}.`);
      // let timeToWait = new Date(resetTime) - new Date();
      // await new Promise((resolve) => setTimeout(resolve, timeToWait));
    }
  }

  async fetchJiraData(endpoint: string, { cache = true }: { cache?: boolean } = {}) {
    const url = `https://lastrev.atlassian.net/rest/api/3${endpoint}`;
    let data;
    // console.time('FetchJiraData:' + endpoint);
    // Add cache around this call to Jira
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
      const response = await axios.get(url, {
        method: 'GET',
        headers: this.headers
      });

      if (response.status === 429) {
        await this.handleRateLimit(response);
        return null;
      }
      data = response?.data;
      if (cache) await this.redis.set(hashKey, JSON.stringify(data));
      if (cache) await this.redis.expire(hashKey, this.cacheExpireTime);
    }
    console.timeEnd('FetchJiraData:' + endpoint);
    return data;
  }
}

const headers = {
  Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString(
    'base64'
  )}`,
  Accept: 'application/json'
};

const handleRateLimit = async (response: { headers?: any }) => {
  let retryAfter = response.headers.get('Retry-After');
  let resetTime = response.headers.get('X-RateLimit-Reset');

  if (retryAfter) {
    console.log(`Too many requests, retrying after ${retryAfter} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  } else if (resetTime) {
    console.log(`Too many requests, retrying after ${resetTime}.`);
    // let timeToWait = new Date(resetTime) - new Date();
    // await new Promise((resolve) => setTimeout(resolve, timeToWait));
  } else {
    console.log('no wait', Object.keys(response));
  }
};

// const fetchJiraData = async (endpoint: any) => {
//   const url = `https://lastrev.atlassian.net/rest/api/3${endpoint}`;
//   let response = await axios.get(url, {
//     method: 'GET',
//     headers
//   });

//   if (response.status === 429) {
//     await handleRateLimit(response);
//     return null;
//   }
//   return response.data;
// };

export default JiraClient;
