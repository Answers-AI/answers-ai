import fs from 'fs';
import JiraStatusCategory from './jira/models/statusCategory';
import JiraStatus from './jira/models/status';
import JiraIssue from './jira/models/issue';
import JiraComment from './jira/models/comment';
import Pinecone from './pinecone/client';
import AnswerSession from './utilities/answerSession';
import JiraClient from './jira/client';

const pinecone = new Pinecone({
  namespace: process.env.PINECONE_INDEX_NAMESPACE,
  indexName: process.env.PINECONE_INDEX
});
const answerSession = new AnswerSession({ namespace: process.env.PINECONE_INDEX_NAMESPACE });
const jiraClient = new JiraClient();

const getIssueFieldJsonLdContext = async () => {
  const API_URL = '/field';

  try {
    const data = await jiraClient.fetchJiraData(API_URL);
    const fieldTypes = data.reduce((acc, { id, schema }) => {
      if (schema && schema.type) {
        acc[id] = {
          '@id': `jira:${id}`,
          '@type': `xsd:${schema.type}`
        };
      }
      if (schema && schema.system) {
        let jiraId = `jira:${id.charAt(0).toUpperCase()}${id.slice(1)}/`;
        acc[id] = {
          '@id': jiraId,
          '@type': `xsd:${schema.type}`
        };
      }
      return acc;
    }, {});
  } catch (error) {
    console.error(`Error getting issue field JSON-LD context: ${error}`);
    throw error;
  }
};

class JiraEndpoint {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.headers = {
      Authorization: `Basic ${Buffer.from(`brad@lastrev.com:${process.env.JIRA_API}`).toString('base64')}`,
      Accept: 'application/json'
    };
  }

  async fetchData() {
    const response = await fetch(`https://lastrev.atlassian.net/rest/api/3/${this.endpoint}`, {
      headers: this.headers
    });
    return await response.json();
  }
}

class JSONLDSchema {
  constructor(data) {
    this.data = data;
    this.schema = {};
  }

  getProperties(data) {
    return new Set(data.reduce((acc, item) => acc.concat(Object.keys(item)), []));
  }

  getIds(data, property) {
    return new Set(data.filter((item) => item[property] && item[property].type).map((item) => item.id));
  }

  getPropertyValues(data, property) {
    return new Set(data.filter((item) => item[property]).map((item) => typeof item[property]));
  }

  generateSchema(importantKeys = []) {
    Object.keys(this.data).forEach((endpoint) => {
      this.schema[endpoint] = {};
      const properties = this.getProperties(this.data[endpoint]);
      properties.forEach((property) => {
        if (property === 'schema') {
          this.schema[endpoint][property] = {};
          const ids = this.getIds(this.data[endpoint], property);
          ids.forEach((id) => {
            this.schema[endpoint][property][id] = {
              '@id': `jira:${id}`,
              '@type': `xsd:${this.data[endpoint].find((item) => item.id === id).schema.type}`
            };
            if (this.data[endpoint].find((item) => item.id === id).schema.system) {
              let jiraId = `jira:${id.charAt(0).toUpperCase()}${id.slice(1)}/`;
              this.schema[endpoint][property][jiraId] = {
                '@id': jiraId,
                '@type': `xsd:${this.data[endpoint].find((item) => item.id === id).schema.type}`
              };
            }
          });
        } else if (importantKeys.includes(property)) {
          this.schema[endpoint][property] = {};
          const propertyValues = this.getPropertyValues(this.data[endpoint], property);
          this.schema[endpoint][property]['@type'] =
            propertyValues.size === 1 ? Array.from(propertyValues)[0] : Array.from(propertyValues);
        }
      });
    });
    return {
      '@context': {
        jira: 'https://lastrev.atlassian.net/rest/api/3/',
        xsd: 'http://www.w3.org/2001/XMLSchema#'
      },
      '@graph': this.data,
      'schema': this.schema
    };
  }
}

const endpoints = [
  'priority',
  'status',
  'field',
  'issuetype',
  'project',
  'resolution',
  'user',
  'group',
  'role',
  'statuscategory',
  'resolution',
  'projectcategory'
].map((endpoint) => new JiraEndpoint(endpoint));

async function getData() {
  const allData = {};
  for (const endpoint of endpoints) {
    const data = await endpoint.fetchData();
    allData[endpoint.endpoint] = Array.isArray(data) ? data : [data];
  }
  return allData;
}

async function writeDataToFile() {
  const allData = await getData();
  const schema = new JSONLDSchema(allData).generateSchema();
  const dataString = JSON.stringify({ data: allData, schema }, null, 2);
  fs.writeFileSync('./output/jira/jiraData.json', dataString);
}

const getJiraEndpoints = async () => {
  const promises = endpoints.map(async (endpoint) => {
    const data = await endpoint.fetchData();
  });
  await Promise.all(promises);
};

(async () => {
  try {
    //writeDataToFile();
  } catch (error) {
    console.error(`Error: ${error?.response?.data?.message} (${error})`);
  }
})();
