import axios, { AxiosResponse } from 'axios';
import Redis from 'ioredis';
import { JiraIssue, JiraProject } from 'types';
import { getJiraTickets } from './getJiraTickets';
import redisLoader from '../redisLoader';

class JiraClient {
  static redis = new Redis(process.env.REDIS_URL as string);
  accessToken?: string;
  cloudId: Promise<string>;
  headers: { Authorization: string; Accept: string };
  cacheExpireTime: number;
  issueLoader = redisLoader<string, JiraIssue>({
    keyPrefix: 'jira:issue',
    redisConfig: process.env.REDIS_URL as string,
    getValuesFn: (keys) => this.getJiraTickets({ jql: `key in (${keys?.join(',')})` }),
    cacheExpirationInSeconds: 0
  });
  constructor({
    cacheExpireTime = 60 * 60 * 24,
    accessToken
  }: { cacheExpireTime?: number; accessToken?: string } = {}) {
    this.cacheExpireTime = cacheExpireTime;
    this.accessToken = accessToken;
    this.cloudId = this.getCloudId();
    this.headers = {
      Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString(
        'base64'
      )}`,
      Accept: 'application/json'
    };
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
        const cachedData = await JiraClient.redis.get(hashKey);

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
      if (cache) await JiraClient.redis.set(hashKey, JSON.stringify(data));
      if (cache) await JiraClient.redis.expire(hashKey, this.cacheExpireTime);
    }
    console.timeEnd('FetchJiraData:' + endpoint);
    return data;
  }
  async getJiraTickets(options: any) {
    return getJiraTickets({ ...options, jiraClient: this });
  }
  async getJiraProjects() {
    let projects: JiraProject[] = await this.fetchJiraData(`/project`);
    return projects.filter((project) => !project.archived);
  }

  async fetchJiraIssue(issueId: string) {
    try {
      if (!issueId) throw new Error(`No issue with issue key ${issueId} found.`);
      let endpoint = `/issue/${issueId}`;
      let data: JiraIssue = await this.fetchJiraData(endpoint);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getJiraComments(issueKey: any) {
    let comments = await this.fetchJiraData(`/issue/${issueKey}/comment`);

    if (!comments?.comments?.length) return null;

    const jiraComments = comments.comments;
    return jiraComments;
  }
}

export default JiraClient;
