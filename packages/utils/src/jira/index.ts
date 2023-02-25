import Pinecone from '../pinecone/client';
import JiraStatusCategory from './models/statusCategory';
import JiraStatus from './models/status';
import JiraCommentModel from './models/comment';
import JiraClient from './client';
import { getJiraTickets } from './getJiraTickets';
import redisLoader from '../redisLoader';

const pinecone = new Pinecone({
  namespace: 'jira',
  indexName: process.env.PINECONE_INDEX
});
// const answerSession = new AnswerSession({ namespace: "jira" });
export const jiraClient = new JiraClient();

// const getJiraStatusCategories = async () => {
//   let statusCategories = await jiraClient.fetchJiraData(`/statuscategory`);
//   return statusCategories.map((statusCategory) => new JiraStatusCategory(statusCategory));
// };
export type JiraProject = { key: string; name: string; archived: any };
export type JiraIssue = { key: string; self: string; id: string; fields: any; archived: any };
export type JiraComment = { key: string; self: string; id: string; fields: any; archived: any };
export const getJiraProjects = async () => {
  let projects: JiraProject[] = await jiraClient.fetchJiraData(`/project`);
  return projects.filter((project) => !project.archived);
};

export const fetchJiraIssue = async (issueId: string) => {
  // console.time('getSingleJiraTicket');

  try {
    if (!issueId) throw new Error(`No issue with issue key ${issueId} found.`);
    let endpoint = `/issue/${issueId}`;
    let data: JiraIssue = await jiraClient.fetchJiraData(endpoint);
    // if (!data || data?.errors) {
    //   throw new Error(`issueID:${issueId} - ${data?.errorMessages?.join(' | ')}`);
    // }

    // issue = new JiraIssue(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const jiraIssueLoader = redisLoader<string, JiraIssue>({
  keyPrefix: 'jira:issue',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: (keys) => getJiraTickets({ jql: `key in (${keys?.join(',')})` }),
  cacheExpirationInSeconds: 0
});

export const getJiraComments = async (issueKey: any) => {
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
  // console.log('JIRA COMMENTS');
  // console.log(comments.comments[0]);
  const jiraComments = comments.comments;
  return jiraComments;
};

export const prepareAllForEmbedding = async (jiraObjects: any[]) => {
  // console.log('prepareAllForEmbedding');
  // console.time('prepareAllForEmbedding');
  let preparedStatuses;
  try {
    if (!jiraObjects) throw new Error('Invalid jiraObjects');
    let promises = [];

    for (const obj of jiraObjects) {
      if (obj) promises.push(obj.prepareForEmbedding());
    }
    preparedStatuses = await Promise.all(promises);
  } catch (error) {
    console.error(error);
    throw error;
  }

  // console.timeEnd('prepareAllForEmbedding');
  return preparedStatuses;
};

// const indexAllJiraStatuses = async () => {
//   console.time('indexAllJiraStatuses');
//   const data = await getJiraStatuses();
//   const vectorData = await prepareAllForEmbedding(data);
//   // answerSession.addVectors(vectorData);
//   await pinecone.writeVectorsToIndex(vectorData);
//   console.timeEnd('indexAllJiraStatuses');
// };

// const indexAllJiraStatusCategories = async () => {
//   console.time('indexAllJiraStatusCategories');
//   const data = await getJiraStatusCategories();
//   const vectorData = await prepareAllForEmbedding(data);
//   // answerSession.addVectors(vectorData);
//   await pinecone.writeVectorsToIndex(vectorData);
//   console.timeEnd('indexAllJiraStatusCategories');
// };

export const indexAllJiraIssues = async (options: {
  jql: string;
  batchSize?: number;
  maxResults?: number;
}) => {
  const data = await getJiraTickets(options);
  if (data) console.log('JiraIssue', data[0]);
  // console.time(`${options.jql} Embedding`);
  // const vectorData = await prepareAllForEmbedding(data);
  // console.timeEnd(`${options.jql} Embedding`);
  // // answerSession.addVectors(vectorData);

  // console.time(`${options.jql} Writing Vectors`);
  // await pinecone.writeVectorsToIndex(vectorData);
  // console.timeEnd(`${options.jql} Writing Vectors`);
};
