// Write a nodejs script that exports all comments from Jira in a single text field for each issue
const JiraStatusCategory = require("./utilities/jiraStatusCategory");
const JiraStatus = require("./utilities/jiraStatus");
const JiraIssue = require("./utilities/jiraIssue");
const JiraComment = require("./utilities/jiraComment");
const Pinecone = require("./utilities/pinecone");
const {
  fetchJiraData,
  jiraAdfToMarkdown,
  createContextFromObject,
} = require("./utilities/jira");

const pinecone = new Pinecone({ namespace: "jira" });

const getIssueFieldJsonLdContext = async () => {
  const API_URL = "/field";

  try {
    const data = await fetchJiraData(API_URL);
    const fieldTypes = data.reduce((acc, { id, schema }) => {
      if (schema && schema.type) {
        acc[id] = {
          "@id": `jira:${id}`,
          "@type": `xsd:${schema.type}`,
        };
      }
      if (schema && schema.system) {
        let jiraId = `jira:${id.charAt(0).toUpperCase()}${id.slice(1)}/`;
        acc[id] = {
          "@id": jiraId,
          "@type": `xsd:${schema.type}`,
        };
      }
      return acc;
    }, {});
  } catch (error) {
    console.error(`Error getting issue field JSON-LD context: ${error}`);
    throw error;
  }
};

const getJiraStatusCategories = async () => {
  let statusCategories = await fetchJiraData(`/statuscategory`);
  return statusCategories.map(
    (statusCategory) => new JiraStatusCategory(statusCategory)
  );
};

const getJiraStatuses = async () => {
  let statuses = await fetchJiraData(`/status`);
  return statuses.map((status) => new JiraStatus(status));
};

async function getJiraTickets(projectId, maxResults = 1) {
  let allTickets = [];
  let startAt = 0;
  let total = 0;

  while (true) {
    try {
      let endpoint = `/search?jql=project=${projectId}&maxResults=${maxResults}&startAt=0`;
      let data = await fetchJiraData(endpoint);

      console.log(`data last ${data.isLast}`);

      if (!data || data.errors) {
        break;
      }
      allTickets = data.issues.map((issue) => new JiraIssue(issue));
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

const getJiraComments = async (issueKey) => {
  let comments = await fetchJiraData(`/issue/${issueKey}/comment`);

  if (!comments?.comments?.length) return null;

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
  const jiraComments = comments.comments.map(
    (comment) => new JiraComment({ ...comment, issueId: issueKey })
  );
  return jiraComments;
};

const prepareAllForEmbedding = async (jiraObjects) => {
  let promises = [];

  for (const obj of jiraObjects) {
    if (obj) promises.push(obj.prepareForEmbedding());
  }
  const preparedStatuses = await Promise.all(promises);
  return preparedStatuses;
};

(async () => {
  const statuses = await getJiraStatuses();
  const preparedStatuses = await prepareAllForEmbedding(statuses);
  pinecone.addVectors(preparedStatuses);

  const statusCategories = await getJiraStatusCategories();
  const preparedStatusCategories = await prepareAllForEmbedding(
    statusCategories
  );
  pinecone.addVectors(preparedStatusCategories);

  const issues = await getJiraTickets("SUPPORT", 1);
  console.log(`Issue Count: ${issues.length}`);
  const preparedIssues = await prepareAllForEmbedding(issues);
  pinecone.addVectors(preparedIssues);

  let promises = [];

  for (const issue of issues) {
    promises.push(getJiraComments(issue.object.issueId));
  }

  const comments = await Promise.all(promises);
  const preparedComments = await prepareAllForEmbedding(comments.flat().flat());
  pinecone.addVectors(preparedComments);

  pinecone.writeVectorsToFile();
})();
