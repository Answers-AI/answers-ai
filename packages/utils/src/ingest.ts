import { Inngest } from 'inngest';
import {
  getJiraComments,
  getJiraProjects,
  JiraComment,
  JiraIssue,
  JiraProject,
  prepareAllForEmbedding
} from './jira';
import { getJiraTickets } from './jira/getJiraTickets';
import PineconeClient from './pinecone/client';
import JiraIssueModel from './jira/models/issue';
import JiraThreadModel from './jira/models/thread';
import { chunkArray } from './utilities/utils';
import { jiraIssueLoader } from './jira';
import JiraCommentModel from './jira/models/comment';

const inngest = new Inngest({ name: 'My app' });

const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const EMBEDDING_BATCH_SIZE = 100;
const COMMENTS_BATCH_SIZE = 50;

export const processSyncSlack = inngest.createFunction(
  { name: 'Process SYNC_SLACK event' },
  { event: 'SYNC_SLACK' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const { projectKeys: projectKeysFilter } = event.data;
    console.time('SYNC_SLACK:' + jobId);

    console.timeEnd('SYNC_SLACK:' + jobId);
  }
);
export const processJiraUpdated = inngest.createFunction(
  { name: 'Process SYNC_JIRA event' },
  { event: 'SYNC_JIRA' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const { projectKeys: projectKeysFilter } = event.data;
    console.time('SYNC_JIRA:' + jobId);
    const projects = await getJiraProjects();
    // Chunk projects into batches of 10

    // Fetch all Jira issues in the configured projects
    await Promise.all(
      chunkArray(
        projects?.filter(
          (project) =>
            (!projectKeysFilter?.length || projectKeysFilter?.includes(project.key)) &&
            ![
              // 'IFWEB',
              'STWEB',
              'UWHWEB',
              'IASWEB',
              'INTERNAL',
              'ISD',
              'IFSD',
              'IFTP',
              'IF',
              'IFMIGRATE',
              'TSTARS'
            ].includes(project.key)
        ),
        JIRA_PROJECT_BATCH_SIZE
      ).map((batchProjects: JiraProject[], i) => {
        const eventData = {
          key: `${jobId}_PROJECT_UPDATED_BATCH_${i * JIRA_PROJECT_BATCH_SIZE}-${
            (i + 1) * JIRA_PROJECT_BATCH_SIZE
          }:`,
          total: projects.length,
          projectKeys: batchProjects?.map((project) => project.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({ name: 'PROJECT_UPDATED', data: eventData });
      })
    );

    console.timeEnd('SYNC_JIRA:' + jobId);
  }
);
export const procesProjectUpdated = inngest.createFunction(
  { name: 'Process PROJECT_UPDATED event' },
  { event: 'PROJECT_UPDATED' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;

    const projectKeys: JiraProject[] = event.data.projectKeys;
    console.time('PROJECT_UPDATED:' + jobId);
    // Chunk projects into batches of 10
    const issues = await getJiraTickets({
      jql: `project in (${projectKeys?.join(',')})`
    });

    console.log('Projects to sync:', projectKeys?.join(','));
    // Prime redis loader with the issues using the hashKey function
    try {
      // @ts-ignore
      await jiraIssueLoader.primeAll(issues.map((issue) => [issue.key, issue]));
    } catch (error) {
      console.log('Error priming loader', error);
    }
    console.log('UPDATED ISSUES', issues?.length);
    // Chunk the issues into batches of JIRA_ISSUE_BATCH_SIZE
    await Promise.all(
      chunkArray(issues, JIRA_ISSUE_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
        const eventData = {
          key: `${jobId}_ISSUES_UPSERTED_BATCH_${i * JIRA_ISSUE_BATCH_SIZE}-${
            (i + 1) * JIRA_ISSUE_BATCH_SIZE
          }:`,
          total: issues.length,
          projectKeys,
          issuesKeys: batchIssues?.map((issue) => issue.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({ name: 'ISSUES_UPSERTED', data: eventData });
      })
    );
    // return issues;
    console.timeEnd('PROJECT_UPDATED:' + jobId);
  }
);

const pinecone = new PineconeClient({
  namespace: 'jira',
  indexName: process.env.PINECONE_INDEX
});

let LAST_JOB_ID = 0;
export const processUpsertedIssues = inngest.createFunction(
  { name: 'Process ISSUES_UPSERTED event' },
  { event: 'ISSUES_UPSERTED' },
  async ({ event }) => {
    try {
      const { issuesKeys, key } = event.data;
      console.time(key);

      // const issues = await jiraIssueLoader.loadMany(issuesKeys);

      await Promise.all(
        chunkArray(issuesKeys, EMBEDDING_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            key: `ISSUES_EMBEDDING_UPDATED_BATCH_${
              i * Math.min(batchIssues?.length, EMBEDDING_BATCH_SIZE)
            }-${(i + 1) * Math.min(batchIssues?.length, EMBEDDING_BATCH_SIZE)}:`,
            total: issuesKeys.length,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({ name: 'ISSUES_EMBEDDING_UPDATED', data: eventData });
        })
      );

      await Promise.all(
        chunkArray(issuesKeys, COMMENTS_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            key: `ISSUES_COMMENTS_UPDATED_BATCH_${
              i * Math.min(batchIssues?.length, COMMENTS_BATCH_SIZE)
            }-${(i + 1) * Math.min(batchIssues?.length, COMMENTS_BATCH_SIZE)}:`,
            total: issuesKeys.length,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({ name: 'ISSUES_COMMENTS_UPDATED', data: eventData });
        })
      );
      console.timeEnd(key);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const processIssuesComments = inngest.createFunction(
  { name: 'Process ISSUES_COMMENTS_UPDATED event' },
  { event: 'ISSUES_COMMENTS_UPDATED' },
  async ({ event }) => {
    try {
      const { issuesKeys, key } = event.data;
      console.time('ISSUES_COMMENTS_UPDATED:' + key);

      const jiraThreads = await Promise.all(
        issuesKeys?.map(async (issueKey: any) =>
          getJiraComments(issueKey).then((comments) => new JiraThreadModel({ issueKey, comments }))
        )
      );
      console.log('Comments to sync:', issuesKeys?.join(','));
      // Prime redis loader with the issues using the hashKey function
      // try {
      //   // @ts-ignore
      //   await jiraIssueLoader.primeAll(issues.map((issue) => [issue.key, issue]));
      // } catch (error) {
      //   console.log('Error priming loader', error);
      // }
      await Promise.all(
        chunkArray(jiraThreads, COMMENTS_BATCH_SIZE).map((threads: JiraComment[], i) => {
          const eventData = {
            key: `ISSUES_COMMENTS_UPDATED_${i * Math.min(threads?.length, COMMENTS_BATCH_SIZE)}-${
              (i + 1) * Math.min(threads?.length, COMMENTS_BATCH_SIZE)
            }:`,
            total: jiraThreads.length,
            threads: threads
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          return inngest.send({ name: 'COMMENTS_EMBEDDING_UPDATED', data: eventData });
        })
      );
      // return issues;
      console.timeEnd('PROJECT_UPDATED:' + key);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const processEmbeddings = inngest.createFunction(
  { name: 'Process EMBEDDING_UPDATED event' },
  { event: 'ISSUES_EMBEDDING_UPDATED' },
  async ({ event }) => {
    // await step.sleep('0.2s');
    try {
      const { issuesKeys, key } = event.data;
      console.time(key);
      const issues = await jiraIssueLoader.loadMany(issuesKeys);

      const vectorData = await prepareAllForEmbedding(
        issues.map((issue: any) => new JiraIssueModel(issue))
      );
      // console.log('vectorData', vectorData[0]);
      await pinecone.writeVectorsToIndex(vectorData);
      console.timeEnd(key);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }
);
export const processCommentsEmbeddings = inngest.createFunction(
  { name: 'Process COMMENTS_EMBEDDING_UPDATED event' },
  { event: 'COMMENTS_EMBEDDING_UPDATED' },
  async ({ event }) => {
    // await step.sleep('0.2s');
    try {
      const { threads, key } = event.data;
      console.time(key);
      // const issues = await jiraIssueLoader.loadMany(issuesKeys);

      const vectorData = await prepareAllForEmbedding(
        threads.map((thread: any) => new JiraThreadModel(thread.object))
      );
      // console.log('vectorData', vectorData[0]);
      await pinecone.writeVectorsToIndex(vectorData);
      console.timeEnd(key);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }
);
