import PineconeClient from '../pinecone/client';
import {
  getJiraComments,
  getJiraProjects,
  JiraComment,
  JiraIssue,
  JiraProject,
  prepareAllForEmbedding
} from '../jira';
import { getJiraTickets } from '../jira/getJiraTickets';
import JiraIssueModel from '../jira/models/issue';
import JiraThreadModel from '../jira/models/thread';
import { jiraIssueLoader } from '../jira';

import { chunkArray } from '../utilities/utils';
import { inngest } from './client';

const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const EMBEDDING_BATCH_SIZE = 300;
const COMMENTS_BATCH_SIZE = 50;

const DISABLE_EMBEDDING = false;

export const processSyncSlack = inngest.createFunction(
  { name: 'Process SYNCED_SLACK event' },
  { event: 'SYNCED_SLACK' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const {} = event.data;
    console.log('SYNCED_SLACK:' + jobId);
    console.time('SYNCED_SLACK:' + jobId);

    console.timeEnd('SYNCED_SLACK:' + jobId);
  }
);
export const processJiraUpdated = inngest.createFunction(
  { name: 'Process SYNCED_JIRA event' },
  { event: 'SYNCED_JIRA' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const { projectKeys: projectKeysFilter } = event.data;
    console.time('SYNCED_JIRA:' + jobId);
    const projects = await getJiraProjects();
    // Chunk projects into batches of 10

    // Fetch all Jira issues in the configured projects
    await Promise.all(
      chunkArray(
        projects?.filter(
          (project) =>
            projectKeysFilter?.includes(project.key) &&
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
          key: `${jobId}_UPDATED_PROJECT_BATCH_${i * JIRA_PROJECT_BATCH_SIZE}-${
            (i + 1) * JIRA_PROJECT_BATCH_SIZE
          }:`,
          batchSize: JIRA_PROJECT_BATCH_SIZE,
          total: projects.length,
          projectKeys: batchProjects?.map((project) => project.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({ name: 'UPDATED_PROJECT', data: eventData });
      })
    );

    console.timeEnd('SYNCED_JIRA:' + jobId);
  }
);
export const procesProjectUpdated = inngest.createFunction(
  { name: 'Process UPDATED_PROJECT event' },
  { event: 'UPDATED_PROJECT' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;

    const projectKeys: JiraProject[] = event.data.projectKeys;
    console.time('UPDATED_PROJECT:' + jobId);
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
          key: `${jobId}_UPSERTED_ISSUES_BATCH_${i * JIRA_ISSUE_BATCH_SIZE}-${
            (i + 1) * JIRA_ISSUE_BATCH_SIZE
          }:`,
          total: issues.length,
          batchSize: JIRA_ISSUE_BATCH_SIZE,
          projectKeys,
          issuesKeys: batchIssues?.map((issue) => issue.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({ name: 'UPSERTED_ISSUES', data: eventData });
      })
    );
    // return issues;
    console.timeEnd('UPDATED_PROJECT:' + jobId);
  }
);

const pinecone = new PineconeClient({
  namespace: 'jira',
  indexName: process.env.PINECONE_INDEX
});

let LAST_JOB_ID = 0;
export const processUpsertedIssues = inngest.createFunction(
  { name: 'Process UPSERTED_ISSUES event' },
  { event: 'UPSERTED_ISSUES' },
  async ({ event }) => {
    try {
      const { issuesKeys, key } = event.data;
      console.time(key);

      // const issues = await jiraIssueLoader.loadMany(issuesKeys);

      await Promise.all(
        chunkArray(issuesKeys, EMBEDDING_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            key: `UPDATED_ISSUES_EMBEDDING_BATCH_${
              i * Math.min(batchIssues?.length, EMBEDDING_BATCH_SIZE)
            }-${(i + 1) * Math.min(batchIssues?.length, EMBEDDING_BATCH_SIZE)}:`,
            total: issuesKeys.length,
            batchSize: EMBEDDING_BATCH_SIZE,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({ name: 'UPDATED_ISSUES_EMBEDDING', data: eventData });
        })
      );

      await Promise.all(
        chunkArray(issuesKeys, COMMENTS_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            key: `UPDATED_ISSUES_COMMENTS_BATCH_${
              i * Math.min(batchIssues?.length, COMMENTS_BATCH_SIZE)
            }-${(i + 1) * Math.min(batchIssues?.length, COMMENTS_BATCH_SIZE)}:`,
            total: issuesKeys.length,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({ name: 'UPDATED_ISSUES_COMMENTS', data: eventData });
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
  { name: 'Process UPDATED_ISSUES_COMMENTS event' },
  { event: 'UPDATED_ISSUES_COMMENTS' },
  async ({ event }) => {
    try {
      const { issuesKeys, key } = event.data;
      console.time('UPDATED_ISSUES_COMMENTS:' + key);

      const jiraThreads = await Promise.all(
        issuesKeys?.map(async (issueKey: any) =>
          getJiraComments(issueKey).then((comments) => new JiraThreadModel({ issueKey, comments }))
        )
      )?.then((threads) => threads.filter((thread) => !!thread?.object?.text));
      // console.log('Comments to sync:', jiraThreads[0]);
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
            key: `UPDATED_ISSUES_COMMENTS_${i * Math.min(threads?.length, COMMENTS_BATCH_SIZE)}-${
              (i + 1) * Math.min(threads?.length, COMMENTS_BATCH_SIZE)
            }:`,
            total: jiraThreads.length,
            batchSize: COMMENTS_BATCH_SIZE,
            threads: threads
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          return inngest.send({ name: 'UPDATED_COMMENTS_EMBEDDING', data: eventData });
        })
      );
      // return issues;
      console.timeEnd('UPDATED_PROJECT:' + key);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const processEmbeddings = inngest.createFunction(
  { name: 'Process EMBEDDING_UPDATED event' },
  { event: 'UPDATED_ISSUES_EMBEDDING' },
  async ({ event }) => {
    // await step.sleep('0.2s');
    try {
      const { issuesKeys, key } = event.data;
      console.time(key);
      const issues = await jiraIssueLoader.loadMany(issuesKeys);

      // TODO - select jira -> pinecone transformer here
      // Should default to jira issue
      // Should be able to enable other transformers
      const vectorData = await prepareAllForEmbedding(
        issues.map((issue: any) => new JiraIssueModel(issue))
      );
      console.log('vectorData', vectorData[0]);
      if (!DISABLE_EMBEDDING) await pinecone.writeVectorsToIndex(vectorData);
      console.timeEnd(key);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }
);
export const processCommentsEmbeddings = inngest.createFunction(
  { name: 'Process UPDATED_COMMENTS_EMBEDDING event' },
  { event: 'UPDATED_COMMENTS_EMBEDDING' },
  async ({ event }) => {
    // await step.sleep('0.2s');
    try {
      const { threads, key } = event.data;
      console.time(key);
      // const issues = await jiraIssueLoader.loadMany(issuesKeys);

      const vectorData = await prepareAllForEmbedding(
        threads.map((thread: any) => new JiraThreadModel(thread.object))
      );
      console.log('vectorData', vectorData?.length);
      if (!DISABLE_EMBEDDING) await pinecone.writeVectorsToIndex(vectorData);
      console.timeEnd(key);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }
);
