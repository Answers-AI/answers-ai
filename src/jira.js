// Write a nodejs script that exports all comments from Jira in a single text field for each issue
const JiraStatusCategory = require("./jira/models/statusCategory");
const JiraStatus = require("./jira/models/status");
const JiraIssue = require("./jira/models/issue");
const JiraComment = require("./jira/models/comment");
const Pinecone = require("./pinecone/client");
// const AnswerSession = require("./utilities/answerSession");
const JiraClient = require("./jira/client");

const pinecone = new Pinecone({
  namespace: "jira",
  indexName: "adam-test-jira-2023-02-08-01",
});
// const answerSession = new AnswerSession({ namespace: "jira" });
const jiraClient = new JiraClient();

const getJiraStatusCategories = async () => {
  let statusCategories = await jiraClient.fetchJiraData(`/statuscategory`);
  return statusCategories.map(
    (statusCategory) => new JiraStatusCategory(statusCategory)
  );
};

const getJiraProjects = async () => {
  let projects = await jiraClient.fetchJiraData(`/project`);
  return projects.filter((project) => !project.archived);
};

const getJiraStatuses = async () => {
  let statuses = await jiraClient.fetchJiraData(`/status`);
  return statuses.map((status) => new JiraStatus(status));
};

const getJiraTickets = async (options) => {
  const initialPullCount = 1;

  let { projectId, startAt = 0, batchSize = 100, maxResults = 1000 } = options;
  console.time(`${projectId} Jira Tickets`);
  let allTickets = [];
  let total = 0;
  maxResults -= initialPullCount;
  batchSize = Math.min(batchSize, maxResults);

  while (true) {
    try {
      let endpoint = `/search?jql=project=${projectId}&maxResults=${initialPullCount}&startAt=${startAt}`;
      console.time(endpoint);
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
      let result;
      while (startAt < total) {
        let nextEndpoint = `/search?jql=project=${projectId}&startAt=${startAt}&maxResults=${batchSize}`;
        console.time(nextEndpoint);
        // promises.push(jiraClient.fetchJiraData(nextEndpoint));
        result = await jiraClient.fetchJiraData(nextEndpoint);
        allTickets = allTickets.concat(
          result.issues.map((issue) => new JiraIssue(issue))
        );
        console.timeEnd(nextEndpoint);
        startAt += batchSize;
      }

      // let results = await Promise.all(promises);
      // for (let i = 0; i < results.length; i++) {
      //   let result = results[i];
      //   allTickets = allTickets.concat(
      //     result.issues.map((issue) => new JiraIssue(issue))
      //   );
      // }

      if (allTickets.length >= total) {
        break;
      }
    } catch (error) {
      console.error(error);
      break;
    }
  }

  const allPromiseTickets = Promise.all(allTickets);
  console.log(`${projectId} Issue Count: ${allTickets.length}`);
  console.timeEnd(`${projectId} Jira Tickets`);

  return allPromiseTickets;
};

const getSingleJiraTicket = async (issueId) => {
  console.time("getSingleJiraTicket");
  let issue;

  try {
    if (!issueId) throw new Error("No issue with issue key ${issueId} found.");
    let endpoint = `/issue/${issueId}`;
    let data = await jiraClient.fetchJiraData(endpoint);
    if (!data || data.errors) {
      throw new Error(
        `issueID:${issueId} - ${data?.errorMessages?.join(" | ")}`
      );
    }

    issue = new JiraIssue(data);
  } catch (error) {
    console.error(error);
  }

  console.timeEnd("getSingleJiraTicket");

  return issue;
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
  let preparedStatuses;
  try {
    if (!jiraObjects) throw new Error("Invalid jiraObjects");
    let promises = [];

    for (const obj of jiraObjects) {
      if (obj) promises.push(obj.prepareForEmbedding());
    }
    preparedStatuses = await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }

  console.timeEnd("prepareAllForEmbedding");
  return preparedStatuses;
};

const indexAllJiraStatuses = async () => {
  console.time("indexAllJiraStatuses");
  const data = await getJiraStatuses();
  const vectorData = await prepareAllForEmbedding(data);
  // answerSession.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("indexAllJiraStatuses");
};

const indexAllJiraStatusCategories = async () => {
  console.time("indexAllJiraStatusCategories");
  const data = await getJiraStatusCategories();
  const vectorData = await prepareAllForEmbedding(data);
  // answerSession.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("indexAllJiraStatusCategories");
};

const indexAllJiraIssues = async (options) => {
  console.time(`Running ${options.projectId}`);

  const data = await getJiraTickets(options);

  console.time(`${options.projectId} Embedding`);
  const vectorData = await prepareAllForEmbedding(data);
  console.timeEnd(`${options.projectId} Embedding`);
  // answerSession.addVectors(vectorData);

  console.time(`${options.projectId} Writing Vectors`);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd(`${options.projectId} Writing Vectors`);

  console.timeEnd(`Running ${options.projectId}`);
};

const indexAllJiraCommments = async (issues) => {
  console.time("indexAllJiraCommments");
  //TODO: Open AI rate limit of 3000/min
  let promises = [];
  for (const issue of issues) {
    promises.push(getJiraComments(issue.object.issueId));
  }

  const data = await Promise.all(promises);
  const vectorData = await prepareAllForEmbedding(data.flat().flat());
  // answerSession.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("indexAllJiraCommments");
};

const indexSingleJiraIssue = async (issueId) => {
  console.time("indexSingleJiraIssue");
  const issue = await getSingleJiraTicket(issueId);
  const vectorIssue = await issue.prepareForEmbedding();
  // answerSession.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorIssue);
  console.timeEnd("indexSingleJiraIssue");
};

(async () => {
  try {
    const projects = await getJiraProjects();
    // await indexAllJiraStatusCategories();
    // const projects = [{ key: "PROJECT" }];

    for (const project of projects) {
      try {
        await indexAllJiraIssues({
          projectId: project.key,
          batchSize: 10,
          maxResults: 10000,
        });
        console.log(
          `Completed indexing all Jira issues for project ${project.name}`
        );
      } catch (error) {
        console.error(
          `Error indexing Jira issues for project ${project.name}: ${error}`
        );
        break; // Stop the loop if there is an error
      }
    }
    // await indexAllJiraIssuesComments(issues);
    // await indexSingleJiraIssue("PROJECT-168");
  } catch (error) {
    console.error(`Error: ${error?.response?.data?.message} (${error})`);
  }
})();
