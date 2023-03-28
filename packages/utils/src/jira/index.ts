// import JiraStatusCategory from './models/statusCategory';
// import JiraStatus from './models/status';
// import JiraCommentModel from './models/comment';
import JiraClient from './client';
import { getJiraTickets } from './getJiraTickets';
import redisLoader from '../redisLoader';

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

export const jiraCommentsLoader = redisLoader<string, JiraIssue>({
  keyPrefix: 'jira:comment',
  redisConfig: process.env.REDIS_URL as string,
  getValuesFn: (issueKey) => getJiraComments(issueKey),
  cacheExpirationInSeconds: 0
});

export const getJiraComments = async (issueKey: any) => {
  if (!issueKey) return null;
  let comments = await jiraClient.fetchJiraData(`/issue/${issueKey}/comment`);

  if (!comments?.comments?.length) return null;

  const jiraComments = comments.comments;
  return jiraComments;
};
