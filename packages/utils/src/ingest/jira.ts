import { getJiraComments, getJiraProjects, JiraComment, JiraIssue, JiraProject } from '../jira';
import { getJiraTickets } from '../jira/getJiraTickets';
import { jiraIssueLoader } from '../jira';
import prompts from '../prompts';

import { chunkArray } from '../utilities/utils';
import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { AppSettings } from 'types';
import { jiraAdfToMarkdown } from '../utilities/jiraAdfToMarkdown';

const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const PINECONE_VECTORS_BATCH_SIZE = 100;
const PINECONE_INDEX_NAMESPACE = process.env.PINECONE_INDEX_NAMESPACE || 'default';

export const processJiraUpdated: EventVersionHandler<{ appSettings: AppSettings }> = {
  event: 'jira/app.sync',
  v: '1',
  handler: async ({ event }) => {
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
          data: eventData,
          user: event.user
        });
      })
    );
  }
};

export const procesProjectUpdated: EventVersionHandler<{ projectKeys: string[] }> = {
  event: 'jira/project.sync',
  v: '1',
  handler: async ({ event }) => {
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
          data: eventData,
          user: event.user
        });
      })
    );
  }
};

export const processUpsertedIssues: EventVersionHandler<{ issuesKeys: string[]; key: string }> = {
  event: 'jira/issues.upserted',
  v: '1',
  handler: async ({ event, step }) => {
    try {
      const { issuesKeys } = event.data;
      await step.run('Fetch comments page', async () => {
        const issues = (await jiraIssueLoader.loadMany(issuesKeys)) as JiraIssue[];

        // TODO: Create a JiraIssueCommentsLoader
        // or TODO: Pull issue and comments from Prisma
        const jiraIssueComments = await Promise.all(
          issues?.map(async (issue) =>
            getJiraComments(issue?.id)
              .then((comments) => ({ ...issue, comments }))
              .catch((err) => null)
          )
        );
                  


        const vectors = jiraIssueComments
          ?.filter((issue) => !!issue)
          ?.map((issue) =>
            !!issue
              ? {
                  uid: `JiraIssue_${issue?.key}`,
                  text: prompts.bradprompts.summarizer(issue), // TODO: Make the summarizer configurable via environment variables
                  metadata: prompts.bradprompts.metadata(issue), // TODO: Make the metadata configurable via environment variables
                }
              : ''
          );

        if (vectors?.length)
          await Promise.all(
            chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
              //TODO: Save to Redis by issue key
              //TODO: In event only send issue keys
              inngest.send({
                v: '1',
                ts: new Date().valueOf(),
                name: 'pinecone/vectors.upserted',
                data: {
                  _page: i,
                  _total: vectors.length,
                  _batchSize: PINECONE_VECTORS_BATCH_SIZE,
                  vectors: batchVectors
                },
                user: event.user
              });
            })
          );
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
