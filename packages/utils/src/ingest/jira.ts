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
import { JiraProjectSetting } from 'db';

const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const EMBEDDING_BATCH_SIZE = 300;
const COMMENTS_BATCH_SIZE = 50;

const DISABLE_EMBEDDING = false;

export const processSyncSlack = inngest.createFunction(
  { name: 'Process slack/app.sync event' },
  { event: 'slack/app.sync' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const {} = event.data;
    console.log('slack/app.sync:' + jobId);
    console.time('slack/app.sync:' + jobId);

    console.timeEnd('slack/app.sync:' + jobId);
  }
);
export const processJiraUpdated = inngest.createFunction(
  { name: 'Process jira/app.sync event' },
  { event: 'jira/app.sync' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const { appSettings } = event.data;
    const projectKeysFilter = appSettings?.jira?.projects
      ?.filter((p: JiraProjectSetting) => p.enabled)
      ?.map((p: JiraProjectSetting) => p.key);
    console.time('jira/app.sync:' + jobId);
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
          key: `${jobId}_jira/project.sync_BATCH_${i * JIRA_PROJECT_BATCH_SIZE}-${
            (i + 1) * JIRA_PROJECT_BATCH_SIZE
          }:`,
          batchSize: JIRA_PROJECT_BATCH_SIZE,
          total: projects.length,
          projectKeys: batchProjects?.map((project) => project.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({ name: 'jira/project.sync', data: eventData });
      })
    );

    console.timeEnd('jira/app.sync:' + jobId);
  }
);
export const procesProjectUpdated = inngest.createFunction(
  { name: 'Process jira/project.sync event' },
  { event: 'jira/project.sync' },
  async ({ event }) => {
    const jobId = LAST_JOB_ID++;

    const projectKeys: JiraProject[] = event.data.projectKeys;
    console.time('jira/project.sync:' + jobId);
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
          key: `${jobId}_jira/issues.upserted_BATCH_${i * JIRA_ISSUE_BATCH_SIZE}-${
            (i + 1) * JIRA_ISSUE_BATCH_SIZE
          }:`,
          total: issues.length,
          batchSize: JIRA_ISSUE_BATCH_SIZE,
          projectKeys,
          issuesKeys: batchIssues?.map((issue) => issue.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({ name: 'jira/issues.upserted', data: eventData });
      })
    );
    // return issues;
    console.timeEnd('jira/project.sync:' + jobId);
  }
);

const pinecone = new PineconeClient({
  namespace: 'jira',
  indexName: process.env.PINECONE_INDEX
});

let LAST_JOB_ID = 0;
export const processUpsertedIssues = inngest.createFunction(
  { name: 'Process jira/issues.upserted event' },
  { event: 'jira/issues.upserted' },
  async ({ event }) => {
    try {
      const { issuesKeys, key } = event.data;
      console.time(key);

      // const issues = await jiraIssueLoader.loadMany(issuesKeys);

      await Promise.all(
        chunkArray(issuesKeys, EMBEDDING_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            key: `jira/issue.embeddings.upserted_BATCH_${
              i * Math.min(batchIssues?.length, EMBEDDING_BATCH_SIZE)
            }-${(i + 1) * Math.min(batchIssues?.length, EMBEDDING_BATCH_SIZE)}:`,
            total: issuesKeys.length,
            batchSize: EMBEDDING_BATCH_SIZE,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({ name: 'jira/issue.embeddings.upserted', data: eventData });
        })
      );

      await Promise.all(
        chunkArray(issuesKeys, COMMENTS_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            key: `jira/issueComments.upserted_BATCH_${
              i * Math.min(batchIssues?.length, COMMENTS_BATCH_SIZE)
            }-${(i + 1) * Math.min(batchIssues?.length, COMMENTS_BATCH_SIZE)}:`,
            total: issuesKeys.length,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({ name: 'jira/issueComments.upserted', data: eventData });
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
  { name: 'Process jira/issueComments.upserted event' },
  { event: 'jira/issueComments.upserted' },
  async ({ event }) => {
    try {
      const { issuesKeys, key } = event.data;
      console.time('jira/issueComments.upserted:' + key);

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
            key: `jira/issueComments.upserted_${
              i * Math.min(threads?.length, COMMENTS_BATCH_SIZE)
            }-${(i + 1) * Math.min(threads?.length, COMMENTS_BATCH_SIZE)}:`,
            total: jiraThreads.length,
            batchSize: COMMENTS_BATCH_SIZE,
            threads: threads
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          return inngest.send({ name: 'jira/threads.embeddings.upserted', data: eventData });
        })
      );
      // return issues;
      console.timeEnd('jira/project.sync:' + key);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const processEmbeddings = inngest.createFunction(
  { name: 'Process jira/issue.embeddings.upserted event' },
  { event: 'jira/issue.embeddings.upserted' },
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
  { name: 'Process jira/threads.embeddings.upserted event' },
  { event: 'jira/threads.embeddings.upserted' },
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
