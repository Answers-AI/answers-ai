// Write a nodejs script that exports all comments from Jira in a single text field for each issue

import fs from 'fs';
import fetch from 'node-fetch';
import natural from 'natural';
import { Configuration, OpenAIApi } from 'openai';
import { start } from 'repl';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const tokenizer = new natural.WordTokenizer();
const allJiraIssues = [];

async function handleRateLimit(response) {
  let retryAfter = response.headers.get('Retry-After');
  let resetTime = response.headers.get('X-RateLimit-Reset');

  if (retryAfter) {
    console.log(`Too many requests, retrying after ${retryAfter} seconds.`);
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  } else if (resetTime) {
    console.log(`Too many requests, retrying after ${resetTime}.`);
    let timeToWait = new Date(resetTime) - new Date();
    await new Promise((resolve) => setTimeout(resolve, timeToWait));
  }
}

const getIssuesPagination = async (projectID, startAt = 150) => {
  const allJiraIssues = [];
  console.log('GETTING PROJECT', projectID, startAt);
  console.log('Jira Issues Array', allJiraIssues.length);
  const response = await fetch(
    `https://lastrev.atlassian.net/rest/api/3/search?jql=project%20%3D%20${projectID}&startAt=${startAt}&validateQuery=strict`,
    {
      method: 'GET',
      headers
    }
  );
  let results = await response.text();
  results = JSON.parse(results);
  allJiraIssues.push(...results.issues);

  const isLast = startAt + 50 > results.total;
  if (isLast) {
    console.log('DONE GETTING JIRA TICKETS: ', allJiraIssues.length);
    return allJiraIssues;
  } else {
    console.log(isLast, results.total, startAt + 400);
    return await getAllIssuesForProject(projectID, startAt + 400);
  }
};

async function fetchJiraData(url) {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString('base64')}`,
      Accept: 'application/json'
    }
  });
  if (response.status === 429) {
    await handleRateLimit(response);
    return null;
  }
  return await response.json();
}

async function getJiraUSers() {
  let allTickets = [];
  let startAt = 0;
  let total = 0;

  while (true) {
    try {
      let url = `https://lastrev.atlassian.net/rest/api/3/users`;
      let data = await fetchJiraData(url);
      if (!data) {
        continue;
      }
      allTickets = allTickets.concat(data.issues);
      total = data.total;

      if (allTickets.length >= total) {
        break;
      }

      let batchSize = Math.min(total - allTickets.length, 100);
      url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
      data = await fetchJiraData(url);
      if (!data) {
        continue;
      }
      allTickets = allTickets.concat(data.issues);

      if (allTickets.length >= total) {
        break;
      }

      startAt = allTickets.length;
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return allTickets;
}

async function getJiraTickets(projectId) {
  let allTickets = [];
  let startAt = 0;
  let total = 0;

  while (true) {
    try {
      let url = `https://lastrev.atlassian.net/rest/api/3/comment/search?query=""&maxResults=1000&startAt=0`;
      // let url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&startAt=${startAt}&maxResults=1`;
      let data = await fetchJiraData(url);
      console.log(data);
      if (!data || data.errors) {
        continue;
      }
      allTickets = allTickets.concat(data);
      total = 100; //data.length;

      if (allTickets.length >= total) {
        break;
      }

      let batchSize = Math.min(total - allTickets.length, 100);
      url = `https://lastrev.atlassian.net/rest/api/3/comment/search?query=""&maxResults=1000&startAt=0`;
      // url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
      data = await fetchJiraData(url);
      if (!data || data.errors) {
        continue;
      }
      allTickets = allTickets.concat(data);

      if (allTickets.length >= total) {
        break;
      }

      startAt = allTickets.length;
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return allTickets;
}

function removeNullKeys(array) {
  return array.map((item) => {
    if (typeof item === 'object' && item !== null) {
      const obj = Object.entries(item).reduce((obj, [key, value]) => {
        if (value !== null && !(typeof value === 'object' && Object.keys(value).length === 0)) {
          if (typeof value === 'object' && value !== null) {
            obj[key] = removeNullKeys([value])[0];
          } else {
            obj[key] = value;
          }
        }
        return obj;
      }, {});
      return Object.keys(obj).length ? obj : null;
    }
    return item;
  });
}

(async () => {
  const tickets = await getJiraTickets();
  console.log(JSON.stringify(tickets, null, 2));

  // let promises = allJiraIssues.map(async (item) => {
  //   return await getIssueDetail(item);
  // });
  // await Promise.all(promises);

  // writeObjectToFile(pineconeObject);
})();
