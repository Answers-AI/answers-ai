// Write a nodejs script that exports all comments from Jira in a single text field for each issue
const JiraStatusCategory = require("./jira/models/statusCategory");
const JiraStatus = require("./jira/models/status");
const JiraIssue = require("./jira/models/issue");
const JiraComment = require("./jira/models/comment");
const Pinecone = require("./pinecone/client");
// const SessionData = require("./utilities/sessionData");
const JiraClient = require("./jira/client");

const pinecone = new Pinecone({
  namespace: "jira",
  indexName: "adam-test-jira-2023-02-08-01",
});
// const sessionData = new SessionData({ namespace: "jira" });
const jiraClient = new JiraClient();

const getJiraStatusCategories = async () => {
  let statusCategories = await jiraClient.fetchJiraData(`/statuscategory`);
  return statusCategories.map(
    (statusCategory) => new JiraStatusCategory(statusCategory)
  );
};

const getJiraStatuses = async () => {
  let statuses = await jiraClient.fetchJiraData(`/status`);
  return statuses.map((status) => new JiraStatus(status));
};

const getJiraTickets = async (options) => {
  console.time("getJiraTickets");
  const initialPullCount = 1;

  let { projectId, startAt = 0, batchSize = 100, maxResults = 1000 } = options;
  let allTickets = [];
  let total = 0;
  maxResults -= initialPullCount;
  batchSize = Math.min(batchSize, maxResults);

  while (true) {
    try {
      let endpoint = `/search?jql=project=${projectId}&maxResults=${initialPullCount}&startAt=${startAt}`;
      let data = await jiraClient.fetchJiraData(endpoint);

      if (!data || data.errors) {
        break;
      }

      allTickets = allTickets.concat(
        data.issues.map((issue) => new JiraIssue(issue))
      );

      if (data.isLast) {
        break;
      }

      startAt += initialPullCount;
      total = Math.min(data.total, maxResults);

      batchSize += initialPullCount;

      let promises = [];
      while (startAt < total) {
        let nextEndpoint = `/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
        promises.push(jiraClient.fetchJiraData(nextEndpoint));
        startAt += batchSize;
      }

      let results = await Promise.all(promises);
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        allTickets = allTickets.concat(
          result.issues.map((issue) => new JiraIssue(issue))
        );
      }

      if (allTickets.length >= total) {
        break;
      }
    } catch (error) {
      console.error(error);
      break;
    }
  }

  const allPromiseTickets = Promise.all(allTickets);
  console.log(`getJiraTickets Issue Count: ${allTickets.length}`);
  console.timeEnd("getJiraTickets");

  return allPromiseTickets;
};

const getJiraComments = async (issueKey) => {
  let comments = await jiraClient.fetchJiraData(`/issue/${issueKey}/comment`);

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
  console.time("prepareAllForEmbedding");
  let promises = [];

  for (const obj of jiraObjects) {
    if (obj) promises.push(obj.prepareForEmbedding());
  }
  const preparedStatuses = await Promise.all(promises);
  console.timeEnd("prepareAllForEmbedding");
  return preparedStatuses;
};

const allJiraStatuses = async () => {
  console.time("allJiraStatuses");
  const data = await getJiraStatuses();
  const vectorData = await prepareAllForEmbedding(data);
  // sessionData.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("allJiraStatuses");
};

const allJiraStatusCategories = async () => {
  console.time("allJiraStatusCategories");
  const data = await getJiraStatusCategories();
  const vectorData = await prepareAllForEmbedding(data);
  // sessionData.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("allJiraStatusCategories");
};

const allJiraIssues = async () => {
  console.time("allJiraIssues");
  const options = {
    projectId: "PROJECT",
    batchSize: 10,
    maxResults: 1000,
  };
  const data = await getJiraTickets(options);
  const vectorData = await prepareAllForEmbedding(data);
  // sessionData.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("allJiraIssues");
};

const allJiraCommments = async (issues) => {
  console.time("allJiraCommments");
  //TODO: Open AI rate limit of 3000/min
  let promises = [];
  for (const issue of issues) {
    promises.push(getJiraComments(issue.object.issueId));
  }

  const data = await Promise.all(promises);
  const vectorData = await prepareAllForEmbedding(data.flat().flat());
  // sessionData.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("allJiraCommments");
};

(async () => {
  try {
    // await allJiraStatuses();
    // await allJiraStatusCategories();
    await allJiraIssues();
    // await allJiraIssuesComments(issues);
  } catch (error) {
    console.error(`Error: ${error?.response?.data?.message} (${error})`);
  }
})();
