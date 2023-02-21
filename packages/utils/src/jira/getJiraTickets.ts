import JiraIssueModel from './models/issue';
import { JiraIssue, jiraClient } from './index';

// const getJiraStatuses = async () => {
//   let statuses = await jiraClient.fetchJiraData(`/status`);
//   return statuses.map((status) => new JiraStatus(status));
// };

const JIRA_FIELDS = [
  'uid',
  'key',
  'description',
  'creator',
  'status',
  'issuetype',
  'customfield_10037',
  'reporter',
  'assignee',
  'comments',
  'priority',
  'parent',
  'project'
];
export const getJiraTickets = async ({
  jql,
  startAt = 0,
  maxResults = 100
}: {
  jql: string;
  startAt?: number | undefined;
  maxResults?: number | undefined;
}): Promise<JiraIssue[]> => {
  try {
    const initialPullCount = 1;

    console.time(`getJiraTickets ->JQL:${jql}`);
    let total = 0;
    // maxResults -= initialPullCount;
    // batchSize = Math.min(batchSize, maxResults);
    let endpoint = `/search?jql=${jql}&maxResults=${initialPullCount}&startAt=${startAt}&fields=${JIRA_FIELDS.join(
      ','
    )}`;
    // console.time(endpoint);
    let data: { issues: JiraIssue[]; errors?: any; isLast: boolean; total: number } =
      await jiraClient.fetchJiraData(endpoint, { cache: false });
    console.debug(`getJiraTickets ->JQL:${jql}` + 'Total: ' + data.total);

    console.log(data?.issues[0]);
    // if (!data || data.errors) {
    //   break;
    // }
    // allTickets = allTickets.concat(data.issues.map((issue) => new JiraIssueModel(issue)));
    // if (data.isLast) {
    //   break;
    // }
    startAt = 0;
    total = data.total;

    // batchSize += 100;
    let promises = [];
    let result;
    let isLast = false;
    // Fetch each endpoint for all pages from 0 to total
    while (startAt < total) {
      let nextEndpoint = `/search?jql=${jql}&startAt=${startAt}&maxResults=${maxResults}&fields=${JIRA_FIELDS.join(
        ','
      )}`;
      // console.log('FetchNextEdnpoint', nextEndpoint, startAt, total);
      // console.time(nextEndpoint);
      promises.push(
        jiraClient.fetchJiraData(nextEndpoint, { cache: false }).then((result) => result.issues)
      );
      // result = await jiraClient.fetchJiraData(nextEndpoint);
      // allTickets = allTickets.concat();
      // console.timeEnd(nextEndpoint);
      startAt += maxResults;
    }

    const allTickets = (await Promise.all(promises)).flat();
    // console.log('allTickets', allTickets);
    console.log(`${jql} Issue Count: ${allTickets.length}`);
    console.timeEnd(`getJiraTickets ->JQL:${jql}`);

    return allTickets;
  } catch (error) {
    console.error('GetJiraTickets:ERROR', error);
    throw error;
  }
};
