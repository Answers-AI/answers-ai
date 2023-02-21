const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import fs from 'fs';

const headers = {
  Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString('base64')}`,
  Accept: 'application/json'
};

const handleRateLimit = async (response) => {
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
};

const fetchJiraData = async (endpoint) => {
  const url = `https://lastrev.atlassian.net/rest/api/3${endpoint}`;
  let response = await fetch(url, {
    method: 'GET',
    headers
  });
  console.log('Fetched Endpoint: ', response.status, endpoint);

  if (response.status === 429) {
    await handleRateLimit(response);
    return null;
  }
  return await response.json();
};

const jiraAdfToMarkdown = (node) => {
  if (!node) return '';

  if (node.type === 'doc') {
    return node.content.map((item) => `${jiraAdfToMarkdown(item)}`).join('');
  } else if (node.type === 'text') {
    return node.text;
  } else if (node.type === 'hardBreak') {
    return '\n';
  } else if (node.type === 'mention') {
    return `@${node.attrs.username}`;
  } else if (node.type === 'emoji') {
    return ''; //`:${node.attrs.shortName}:`;
  } else if (node.type === 'link') {
    return `[${node.text}](${node.attrs.url})`;
  } else if (node.type === 'mediaGroup') {
    return node.content.map(jiraAdfToMarkdown).join('');
  } else if (node.type === 'paragraph') {
    return `${node.content.map(jiraAdfToMarkdown).join('')}\n`;
  } else if (node.type === 'bulletList') {
    return node.content.map((item) => `${jiraAdfToMarkdown(item)}`).join('');
  } else if (node.type === 'listItem') {
    return node.content.map((item) => `- ${jiraAdfToMarkdown(item)}`).join('');
  } else if (node.type === 'orderedList') {
    return node.content.map((item, index) => `${index + 1}. ${jiraAdfToMarkdown(item)}`).join('');
  } else if (node.type === 'heading') {
    return `\n${'#'.repeat(node.attrs.level)} ${node.content.map(jiraAdfToMarkdown).join('')}\n`;
  } else if (node.type === 'codeBlock') {
    return `\`\`\`\n${node.text}\n\`\`\`\n`;
  } else if (node.type === 'blockquote') {
    return `> ${node.content.map(jiraAdfToMarkdown).join('')}\n`;
  } else {
    return '';
  }
};

const createContextFromObject = (obj) => {
  const trimValues = ['', undefined, null, 'indeterminate'];
  let context = Object.entries(obj)
    .filter(([, value]) => !trimValues.includes(value) && typeof value !== 'object')
    .map(([key, value]) => `${key.replace(/([A-Z_])/g, ' $1').toUpperCase()}:${value}`)
    .join('\n\n');
  return context;
};

const writeObjectToFile = (obj) => {
  const maxFileSize = 1.8 * 1024 * 1024; // 1.5MB in bytes

  let currentFileSize = 0;
  let currentFileIndex = 0;
  let currentFileArray = [];

  const currentDate = new Date().toISOString().slice(0, 19).replace(/T/, ' ');

  const folderPath = `output/jira/${currentDate}`;

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const outputFileName = `${folderPath}/${Date.now()}`;
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
};

export default {
  writeObjectToFile,
  createContextFromObject,
  jiraAdfToMarkdown,
  fetchJiraData
};
