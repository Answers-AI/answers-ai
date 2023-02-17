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

const pineconeObject = {
  vectors: []
};

const headers = {
  Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString('base64')}`,
  Accept: 'application/json'
};

const mapJiraValues = (jiraObject, prefix) => {
  const mappedJiraObject = {};
  for (const key in jiraObject) {
    switch (key) {
      case 'self':
        mappedJiraObject[`${prefix}_url`] = jiraObject[key];
        break;
      case 'statusCategory':
        mappedJiraObject.status_category_id = jiraObject[key]?.id;
        break;
      default:
        mappedJiraObject[`${prefix}_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}`] = jiraObject[key];
    }
  }
  return mappedJiraObject;
};

const getAllStatusCategories = async () => {
  console.log('GETTING STATUS CATEGORIES');
  const url = `https://lastrev.atlassian.net/rest/api/3/statuscategory`;
  let statusCategories = await fetchJiraData(url);
  statusCategories = await Promise.all(
    statusCategories.map(async (statusCategory) => {
      delete statusCategory.self;
      const metadata = mapJiraValues(statusCategory, 'status_category');

      let context = `Status Category:${statusCategory.name}`;
      const embeddingResponse = await createEmbedding(context);
      const embeddings = embeddingResponse?.data?.data[0]?.embedding;

      var obj = {
        id: `status_category_id_${statusCategory.id}`,
        metadata,
        values: embeddings
      };

      pineconeObject.vectors.push(obj);
      return mapJiraValues(statusCategory, 'status_category');
    })
  );

  return statusCategories;
};

const getAllStatuses = async () => {
  console.log('GETTING STATUSES');
  const url = `https://lastrev.atlassian.net/rest/api/3/status`;
  let statuses = await fetchJiraData(url);
  statuses = await Promise.all(
    statuses.map(async (status) => {
      delete status.untranslatedName;
      delete status.scope;
      delete status.iconUrl;
      delete status.self;
      const metadata = mapJiraValues(status, 'status');
      let context = `Status:${status.name}`;
      const embeddingResponse = await createEmbedding(context);
      const embeddings = embeddingResponse?.data?.data[0]?.embedding;

      var obj = {
        id: `status_id_${status.id}`,
        metadata,
        values: embeddings
      };

      pineconeObject.vectors.push(obj);
      return metadata;
    })
  );

  return statuses;
};

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

const getAllIssuesForProject = async (projectID, startAt = 150) => {
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
  } else {
    console.log('no wait', Object.keys(response));
  }
}

async function fetchJiraData(url) {
  // console.log("Fetching URL: ", url);
  let response = await fetch(url, {
    method: 'GET',
    headers
  });
  console.log('Fetching URL: ', response.status, url);

  if (response.status === 429) {
    await handleRateLimit(response);
    return null;
  }
  return await response.json();
}

async function getJiraTickets(projectId) {
  let allTickets = [];
  let startAt = 0;
  let total = 0;

  while (true) {
    try {
      let url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&maxResults=1000&startAt=0`;
      // let url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&startAt=${startAt}&maxResults=1`;
      let data = await fetchJiraData(url);

      if (!data || data.errors) {
        break;
      }
      allTickets = data.issues;
      break;

      // allTickets = allTickets.concat(data?.issues);
      // total = data.total;

      // if (allTickets.length >= total) {
      //   break;
      // }

      // let batchSize = Math.min(total - allTickets.length, 100);
      // // url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project%20%3D%20${projectId}&maxResults=1000&startAt=0`;
      // url = `https://lastrev.atlassian.net/rest/api/3/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
      // data = await fetchJiraData(url);
      // if (!data || data.errors) {
      //   break;
      // }
      // allTickets = allTickets.concat(data.issues);

      // if (allTickets.length >= total) {
      //   break;
      // }

      // startAt = allTickets.length;
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return allTickets;
}

const jiraToMarkdown = (node) => {
  if (!node) return '';

  if (node.type === 'text') {
    return node.text;
  } else if (node.type === 'mention') {
    return `@${node.attrs.username}`;
  } else if (node.type === 'emoji') {
    return `:${node.attrs.shortName}:`;
  } else if (node.type === 'link') {
    return `[${node.text}](${node.attrs.url})`;
  } else if (node.type === 'mediaGroup') {
    return node.content.map(jiraToMarkdown).join('');
  } else if (node.type === 'paragraph') {
    return `${node.content.map(jiraToMarkdown).join('')}\n`;
  } else if (node.type === 'bulletList') {
    return node.content.map((item) => `- ${jiraToMarkdown(item)}`).join('\n');
  } else if (node.type === 'orderedList') {
    return node.content.map((item, index) => `${index + 1}. ${jiraToMarkdown(item)}`).join('\n');
  } else if (node.type === 'heading') {
    return `\n${'#'.repeat(node.attrs.level)} ${node.content.map(jiraToMarkdown).join('')}\n`;
  } else if (node.type === 'codeBlock') {
    return `\`\`\`\n${node.text}\n\`\`\`\n`;
  } else if (node.type === 'blockquote') {
    return `> ${node.content.map(jiraToMarkdown).join('')}\n`;
  } else {
    return '';
  }
};

const extractText = (content) => {
  let text = '';
  content.forEach((element) => {
    if (element.type === 'text') {
      text += element.text;
    } else if (element.content) {
      text += extractText(element.content);
    }
  });
  return text;
};

const getComments = async (issueKey) => {
  const url = `https://lastrev.atlassian.net/rest/api/3/issue/${issueKey}/comment`;
  let comments = await fetchJiraData(url);

  if (!comments?.comments?.length) return null;

  await Promise.all(
    comments.comments.map(async (comment) => {
      comment.author = comment.author.displayName;
      delete comment.updateAuthor;
      delete comment.jsdPublic;
      delete comment.visibility;
      comment.body = jiraToMarkdown(comment.body.content);
      let context = `Issue ID:${issueKey}\n\nAuthor:${comment.author}\n\nComment:${comment.body}`;
      const metadata = mapJiraValues(comment, 'comment');
      const embeddingResponse = await createEmbedding(context);
      const embeddings = embeddingResponse?.data?.data[0]?.embedding;

      var obj = {
        id: `comment_id_${comment.id}`,
        metadata: {
          issue_id: issueKey,
          ...metadata
        },
        values: embeddings
      };

      pineconeObject.vectors.push(obj);
    })
  );

  // if (comments) {
  //   // metadata fields can not be over 10000 bytes
  //   const encoder = new TextEncoder();
  //   const encodedString = encoder.encode(comments);
  //   const sizeInBytes = encodedString.byteLength;
  //   if (sizeInBytes > 9000) {
  //     console.log("comments too long", sizeInBytes);
  //     return comments.substring(0, 9000);
  //   } else {
  //     return comments;
  //   }
  // }

  return null;
};

const getDescription = async (description) => {
  let text = '';
  description?.content.forEach((content) => {
    if (content.type === 'paragraph') {
      content.content.forEach((content) => {
        if (content.type === 'text') {
          text += content.text + ' ';
        }
      });
    }
  });
  return text;
};

function writeObjectToFile(obj) {
  const maxFileSize = 1.8 * 1024 * 1024; // 1.5MB in bytes

  let currentFileSize = 0;
  let currentFileIndex = 0;
  let currentFileArray = [];

  const outputFileName = `jira-issues-${Date.now()}`;
  obj.vectors.forEach(function (element) {
    let jsonString = JSON.stringify(element);
    let jsonStringSize = Buffer.byteLength(jsonString, 'utf8');
    if (currentFileSize + jsonStringSize > maxFileSize) {
      fs.writeFileSync(
        `${outputFileName}-${currentFileIndex}.json`,
        JSON.stringify({ namespace: 'jira', vectors: currentFileArray })
      );
      currentFileIndex++;
      currentFileArray = [];
      currentFileSize = 0;
    }
    currentFileArray.push(element);
    currentFileSize += jsonStringSize;
  });

  fs.writeFileSync(
    `${outputFileName}-${currentFileIndex}.json`,
    JSON.stringify({ namespace: 'jira', vectors: currentFileArray })
  );
}

const createEmbedding = async (input) => {
  const response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: input
  });
  return response;
};

const getIssueDetail = async (issue) => {
  const { fields, key } = issue;

  const metadata = {
    issue_description: fields.description ? jiraToMarkdown(fields.description) : '',
    issue_summary: fields?.summary ?? '',
    issue_creator: fields.creator?.displayName ?? '',
    status_id: parseInt(fields.status?.id, 10) ?? '',
    status_category_id: fields.status?.statusCategory?.id ?? '',
    issue_account: fields.customfield_10037?.value ?? '',
    issue_type: fields.issuetype?.name ?? '',
    issue_reporter: fields.reporter?.accountId ?? '',
    issue_assignee: fields.assignee?.accountId ?? '',
    issue_parent_key: fields.parent?.key ?? '',
    issue_project: fields.project?.name ?? ''
  };

  let context = Object.entries(metadata)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `${key.toUpperCase()}:${value}`)
    .join('\n\n');
  let tokens = tokenizer.tokenize(context);

  if (tokens.length > 1900) {
    console.log(`${key} - TOO MANY TOKENS (${tokens.length}) - skipping`);
    return;
  }

  // console.log(key, tokens.length);
  const embeddingResponse = await createEmbedding(context);
  const embeddings = embeddingResponse?.data?.data[0]?.embedding;

  var obj = {
    id: key,
    metadata,
    values: embeddings
  };

  console.log(`Issue Detail: ${key}`);

  pineconeObject.vectors.push(obj);
};

(async () => {
  const allStatusCategories = await getAllStatusCategories();
  const allStatuses = await getAllStatuses();
  const allIssues = await getJiraTickets('PROJECT');

  let promises = [];

  for (const issue of allIssues) {
    promises.push(getIssueDetail(issue));
    promises.push(getComments(issue.key));
  }

  console.log('BEFORE ALL');

  await Promise.all(promises);

  console.log('AFTER ALL');

  writeObjectToFile(pineconeObject);
  console.log('AFTER WRITE');
})();
