// Write a nodejs script that exports all comments from Jira in a single text field for each issue

const natural = require('natural');
const { Configuration, OpenAIApi } = require('openai');
const { fetchJiraData, jiraAdfToMarkdown, createContextFromObject, writeObjectToFile } = require('./utilities/jira');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const tokenizer = new natural.WordTokenizer();

const pineconeObject = {
  vectors: []
};

const createEmbedding = async (input) => {
  const response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: input
  });
  return response;
};

const getIssueFieldJsonLdContext = async () => {
  const API_URL = '/field';

  const data = await fetchJiraData(API_URL);
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
};

const getAllStatusCategories = async () => {
  console.log('GETTING STATUS CATEGORIES');

  let statusCategories = await fetchJiraData(`/statuscategory`);
  statusCategories = await Promise.all(
    statusCategories.map(async (statusCategory) => {
      statusCategory.objectType = 'JIRA Status Category';
      delete statusCategory.self;
      delete statusCategory.colorName;
      delete statusCategory.key;

      let context = createContextFromObject(statusCategory);
      const embeddingResponse = await createEmbedding(context);
      const embeddings = embeddingResponse?.data?.data[0]?.embedding;

      var obj = {
        id: `status_category_${statusCategory.id}`,
        metadata: statusCategory,
        values: embeddings
      };

      // TODO: Upsert to pinecone through API;
      pineconeObject.vectors.push(obj);
      return statusCategory;
    })
  );

  return statusCategories;
};

const getAllStatuses = async () => {
  console.log('GETTING STATUSES');

  let statuses = await fetchJiraData('/status');
  statuses = await Promise.all(
    statuses.map(async (status) => {
      status.statusCategoryId = status.statusCategory.id;
      status.objectType = 'JIRA Status';
      delete status.untranslatedName;
      delete status.scope;
      delete status.iconUrl;
      delete status.self;
      delete status.colorName;
      delete status.key;
      delete status.statusCategory;

      let context = createContextFromObject(status);
      const embeddingResponse = await createEmbedding(context);
      const embeddings = embeddingResponse?.data?.data[0]?.embedding;

      var obj = {
        id: `status_${status.id}`,
        metadata: status,
        values: embeddings
      };

      // TODO: Upsert to pinecone through API;
      pineconeObject.vectors.push(obj);
      return status;
    })
  );

  return statuses;
};

async function getJiraTickets(projectId, maxResults = 1) {
  let allTickets = [];
  let startAt = 0;
  let total = 0;

  while (true) {
    try {
      let endpoint = `/search?jql=project=${projectId}&maxResults=${maxResults}&startAt=0`;
      let data = await fetchJiraData(endpoint);

      if (!data || data.errors) {
        break;
      }
      allTickets = data.issues;
      break;

      // TODO: Add Recursion if more than 1000 results.
      // allTickets = allTickets.concat(data?.issues);
      // total = data.total;

      // if (allTickets.length >= total) {
      //   break;
      // }

      // let batchSize = Math.min(total - allTickets.length, 100);
      // // url = `/search?jql=project%20%3D%20${projectId}&maxResults=1000&startAt=0`;
      // url = `/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
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

const getComments = async (issueKey) => {
  let comments = await fetchJiraData(`/issue/${issueKey}/comment`);

  if (!comments?.comments?.length) return null;

  await Promise.all(
    comments.comments.map(async (comment) => {
      comment.objectType = 'JIRA Comment';
      comment.author = comment.author.displayName;
      comment.body = jiraAdfToMarkdown(comment.body.content);
      comment.issueId = issueKey;

      delete comment.updateAuthor;
      delete comment.jsdPublic;
      delete comment.visibility;

      let context = createContextFromObject(comment);
      const embeddingResponse = await createEmbedding(context);
      const embeddings = embeddingResponse?.data?.data[0]?.embedding;

      var obj = {
        id: `comment_${comment.id}`,
        metadata: comment,
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

const getIssueDetail = async (issue) => {
  const { fields, key } = issue;

  const metadata = {
    objectType: 'JIRA Issue',
    issueTypeId: fields?.issuetype.id,
    issueType: fields?.issuetype.name,
    issueId: key,
    description: fields.description ? jiraAdfToMarkdown(fields.description) : '',
    summary: fields?.summary ?? '',
    creatorId: fields.creator?.accountId ?? '',
    creator: fields.creator?.displayName ?? '',
    statusId: parseInt(fields.status?.id, 10) ?? '',
    status: fields.status?.name ?? '',
    statusCategoryId: fields.status?.statusCategory?.id ?? '',
    statusCategory: fields.status?.statusCategory?.name ?? '',
    account: fields.customfield_10037?.value ?? '',
    type: fields.issuetype?.name ?? '',
    reporterId: fields.reporter?.accountId ?? '',
    reporter: fields.reporter?.displayName ?? '',
    assigneeId: fields.assignee?.accountId ?? '',
    assignee: fields.reporter?.displayName ?? '',
    priorityId: fields.priority?.id ?? '',
    priority: fields.priority?.name ?? '',
    parentIssueId: fields.parent?.key ?? '',
    parentIssueSummary: fields.parent?.fields?.summary ?? '',
    parentIssueTypeId: fields.parent?.issuetype?.id,
    parentIssueType: fields.parent?.issuetype?.name,
    project: fields.project?.name ?? '',
    projectId: fields.project?.key ?? '',
    projectObjectType: 'JIRA Issue'
  };

  let context = createContextFromObject(metadata);
  let tokens = tokenizer.tokenize(context);

  if (tokens.length > 1900) {
    console.log(`${key} - TOO MANY TOKENS (${tokens.length}) - skipping`);
    return;
  }

  const embeddingResponse = await createEmbedding(context);
  const embeddings = embeddingResponse?.data?.data[0]?.embedding;

  var obj = {
    id: key,
    metadata,
    values: embeddings
  };

  pineconeObject.vectors.push(obj);
};

(async () => {
  const allIssues = await getJiraTickets('PROJECT', 1000);

  let promises = [
    // await getIssueFieldJsonLdContext(),
    await getAllStatusCategories(),
    await getAllStatuses()
  ];

  for (const issue of allIssues) {
    promises.push(getIssueDetail(issue));
    promises.push(getComments(issue.key));
  }

  await Promise.all(promises);

  writeObjectToFile(pineconeObject);
})();
