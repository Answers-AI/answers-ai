import PineconeClient from '../pinecone/client';
import { getJiraComments, getJiraProjects, JiraComment, JiraIssue, JiraProject } from '../jira';
import { getJiraTickets } from '../jira/getJiraTickets';
import JiraIssueModel from '../jira/models/issue';
import JiraThreadModel from '../jira/models/thread';
import { jiraIssueLoader } from '../jira';

import { chunkArray } from '../utilities/utils';
import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { AppSettings } from 'types';
import { prepareAllForEmbedding } from '../prepareAllForEmbedding';

const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const EMBEDDING_BATCH_SIZE = 300;
const COMMENTS_BATCH_SIZE = 50;

const DISABLE_EMBEDDING = false;

export const processJiraUpdated: EventVersionHandler<{ appSettings: AppSettings }> = {
  event: 'jira/app.sync',
  v: '1',
  handler: async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const { appSettings } = event.data;
    const projectKeysFilter = appSettings?.jira?.projects
      ?.filter((p) => p.enabled)
      ?.map((p) => p.key);
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
          _page: i,
          _batchSize: JIRA_PROJECT_BATCH_SIZE,
          total: projects.length,
          projectKeys: batchProjects?.map((project) => project.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'jira/project.sync',
          data: eventData
        });
      })
    );

    console.timeEnd('jira/app.sync:' + jobId);
  }
};
export const procesProjectUpdated: EventVersionHandler<{ projectKeys: string[] }> = {
  event: 'jira/project.sync',
  v: '1',
  handler: async ({ event }) => {
    const jobId = LAST_JOB_ID++;
    const { projectKeys } = event.data;

    // Chunk projects into batches of 10
    const issues = await getJiraTickets({
      jql: `project in (${projectKeys?.join(',')})`
    });

    try {
      // @ts-ignore
      await jiraIssueLoader.primeAll(issues.map((issue) => [issue.key, issue]));
    } catch (error) {
      console.log('Error priming loader', error);
    }
    // Chunk the issues into batches of JIRA_ISSUE_BATCH_SIZE
    await Promise.all(
      chunkArray(issues, JIRA_ISSUE_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
        const eventData = {
          _page: i,
          _total: issues.length,
          _batchSize: JIRA_ISSUE_BATCH_SIZE,
          projectKeys,
          issuesKeys: batchIssues?.map((issue) => issue.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'jira/issues.upserted',
          data: eventData
        });
      })
    );
  }
};

const pinecone = new PineconeClient({
  namespace: 'jira',
  indexName: process.env.PINECONE_INDEX
});

export let LAST_JOB_ID = 0;
export const processUpsertedIssues: EventVersionHandler<{ issuesKeys: string[]; key: string }> = {
  event: 'jira/issues.upserted',
  v: '1',
  handler: async ({ event }) => {
    try {
      const { issuesKeys } = event.data;

      await Promise.all(
        chunkArray(issuesKeys, EMBEDDING_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            _page: i,
            _total: issuesKeys.length,
            _batchSize: EMBEDDING_BATCH_SIZE,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({
            v: '1',
            ts: new Date().valueOf(),
            name: 'jira/issue.embeddings.upserted',
            data: eventData
          });
        })
      );

      await Promise.all(
        chunkArray(issuesKeys, COMMENTS_BATCH_SIZE).map((batchIssues: JiraIssue[], i) => {
          const eventData = {
            _page: i,
            _total: issuesKeys.length,
            _batchSize: COMMENTS_BATCH_SIZE,
            issuesKeys: batchIssues
          };
          //TODO: Save to Redis by issue key
          //TODO: In event only send issue keys
          inngest.send({
            v: '1',
            ts: new Date().valueOf(),
            name: 'jira/issueComments.upserted',
            data: eventData
          });
        })
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};

export const processIssuesComments: EventVersionHandler<{ issuesKeys: string[] }> = {
  event: 'jira/issueComments.upserted',
  v: '1',
  handler: async ({ event }) => {
    const { issuesKeys } = event.data;

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
          _page: i,
          _total: jiraThreads.length,
          _batchSize: COMMENTS_BATCH_SIZE,
          threads: threads
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        return inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'jira/threads.embeddings.upserted',
          data: eventData
        });
      })
    );
  }
};

export const processEmbeddings: EventVersionHandler<{ issuesKeys: string[] }> = {
  event: 'jira/issue.embeddings.upserted',
  v: '1',
  handler: async ({ event }) => {
    const { issuesKeys } = event.data;

    const issues = await jiraIssueLoader.loadMany(issuesKeys);

    // TODO - select jira -> pinecone transformer here
    // Should default to jira issue
    // Should be able to enable other transformers
    const vectorData = await prepareAllForEmbedding(
      issues.map((issue: any) => new JiraIssueModel(issue))
    );
    console.log('vectorData', vectorData[0]);
    if (!DISABLE_EMBEDDING) await pinecone.writeVectorsToIndex(vectorData);
  }
};
export const processCommentsEmbeddings: EventVersionHandler<{ threads: JiraThreadModel[] }> = {
  event: 'jira/threads.embeddings.upserted',
  v: '1',
  handler: async ({ event }) => {
    const { threads } = event.data;

    const vectorData = await prepareAllForEmbedding(
      threads.map((thread) => new JiraThreadModel(thread.object))
    );
    console.log('vectorData', vectorData?.length);
    if (!DISABLE_EMBEDDING) await pinecone.writeVectorsToIndex(vectorData);
  }
};

export const test = {};
