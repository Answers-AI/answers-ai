import { getJiraComments, getJiraProjects, JiraIssue, JiraProject } from '../jira';
import { getJiraTickets } from '../jira/getJiraTickets';
import { jiraIssueLoader } from '../jira';

import { chunkArray } from '../utilities/utils';
import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { AnswersFilters, AppSettings } from 'types';
import { jiraAdfToMarkdown } from '../utilities/jiraAdfToMarkdown';
import { OpenAI } from 'langchain/llms';
import { loadSummarizationChain } from 'langchain/chains';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as fs from 'fs';
const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const PINECONE_VECTORS_BATCH_SIZE = 100;

export const processJiraUpdated: EventVersionHandler<{
  appSettings: AppSettings;
  filters: AnswersFilters;
}> = {
  event: 'jira/app.sync',
  v: '1',
  handler: async ({ event }) => {
    const { filters, appSettings } = event.data;
    const { projectName } = filters;
    const projectKeysFilter = appSettings?.jira?.projects
      ?.filter((p) => (projectName?.length ? projectName?.includes(p.key) : p.enabled))
      ?.map((p) => p.key);
    const projects = await getJiraProjects();

    // Fetch all Jira issues in the configured projects
    await Promise.all(
      chunkArray(
        projects?.filter((project) => projectKeysFilter?.includes(project.key)),
        JIRA_PROJECT_BATCH_SIZE
      ).map(async (batchProjects: JiraProject[], i) => {
        (filters?.models?.jira?.length
          ? filters?.models?.jira
          : [appSettings?.models?.jira[0]]
        )?.map((model) => {
          const eventData = {
            _page: i,
            _batchSize: JIRA_PROJECT_BATCH_SIZE,
            model,
            total: projects.length,
            projectKeys: batchProjects?.map((project) => project.key)
          };

          inngest.send({
            ts: new Date().valueOf(),
            name: 'jira/project.sync',
            data: eventData,
            user: event.user
          });
        });
      })
    );
  }
};

export const procesProjectUpdated: EventVersionHandler<{ projectKeys: string[]; model: string }> = {
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
          model: event.data.model,
          projectKeys,
          issuesKeys: batchIssues?.map((issue) => issue.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({
          v: event.data.model,
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
  v: 'jira-text-001',
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

        const summarize = (issue: any) =>
          `Details for ${issue?.key} are ${Object.entries({
            'status category': issue?.fields.status?.statusCategory?.name,
            'status': issue?.fields.status?.name,
            'account': issue?.fields.customfield_10037?.value,
            'priority': issue?.fields.priority?.name,
            'the project name': issue?.fields.project?.name,
            'the reporter': issue?.fields.reporter?.displayName,
            'assigned to': issue?.fields.assignee?.displayName || 'Unassigned',
            'assignee email': issue?.fields.assignee?.email,
            'the parent key': issue?.fields.parent?.key,
            'the link': `https://lastrev.atlassian.net/browse/${issue?.key}`,
            'the description': issue?.fields.description
              ? jiraAdfToMarkdown(issue?.fields.description)
              : '',
            'the summary': issue?.fields?.summary
          })
            .filter(([key, value]) => !!value)
            .map(([key, value]) => `${key} is ${value}`)
            ?.join(', ')}\n The comments for ${issue?.key} are ${issue?.comments
            ?.map(
              ({ author, body, updated, self }: any) =>
                // `[${updated} - ${author?.displayName}](${self}): ${jiraAdfToMarkdown(body)}`
                `${author?.displayName} at ${updated}: "${jiraAdfToMarkdown(body)}"`
            )
            ?.join('\n')}.
`;

        const vectors = jiraIssueComments
          ?.filter((issue) => !!issue)
          ?.map((issue) =>
            !!issue
              ? {
                  uid: `JiraIssue_${issue?.key}`,
                  text: summarize(issue),
                  metadata: {
                    'model': event.v,
                    'key': issue?.key,
                    'account': issue?.fields.customfield_10037?.value,
                    'projectName': issue?.fields.project?.name,
                    'reporter': issue?.fields.reporter?.displayName,
                    'assignee name': issue?.fields.assignee?.displayName || 'Unassigned',
                    'assignee email': issue?.fields.assignee?.email,
                    'priority': issue?.fields.priority?.name,
                    'status': issue?.fields.status?.name,
                    'status category': issue?.fields.status?.statusCategory?.name,
                    'parent key': issue?.fields.parent?.key,
                    'description': issue?.fields.description
                      ? jiraAdfToMarkdown(issue?.fields.description)
                      : ''
                  }
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
export const processUpsertedIssuesAI: EventVersionHandler<{ issuesKeys: string[]; key: string }> = {
  event: 'jira/issues.upserted',
  v: 'jira-summarization-intentions-001',
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

        const summarize = (issue: any) =>
          `Details for ${issue?.key} are ${Object.entries({
            'status category': issue?.fields.status?.statusCategory?.name,
            'status': issue?.fields.status?.name,
            'account': issue?.fields.customfield_10037?.value,
            'priority': issue?.fields.priority?.name,
            'the project name': issue?.fields.project?.name,
            'the reporter': issue?.fields.reporter?.displayName,
            'assigned to': issue?.fields.assignee?.displayName || 'Unassigned',
            'assignee email': issue?.fields.assignee?.email,
            'the parent key': issue?.fields.parent?.key,
            'the link': `https://lastrev.atlassian.net/browse/${issue?.key}`,
            'the description': issue?.fields.description
              ? jiraAdfToMarkdown(issue?.fields.description)
              : '',
            'the summary': issue?.fields?.summary
          })
            .filter(([key, value]) => !!value)
            .map(([key, value]) => `${key} is ${value}`)
            ?.join(', ')}\n The comments for ${issue?.key} are ${issue?.comments
            ?.map(
              ({ author, body, updated, self }: any) =>
                // `[${updated} - ${author?.displayName}](${self}): ${jiraAdfToMarkdown(body)}`
                `${author?.displayName} at ${updated}: "${jiraAdfToMarkdown(body)}"`
            )
            ?.join('\n')}.
`;

        const vectors = [
          {
            text: ' The project manager summary is ....',
            metadata: { intention: 'project manager' }
          },
          { text: ' The engineer summary is ....' }
        ];

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

export const processUpsertedIssuesAIEng: EventVersionHandler<{
  issuesKeys: string[];
  key: string;
}> = {
  event: 'jira/issues.upserted',
  v: 'jira-summarization-eng-001',
  handler: async ({ event, step }) => {
    try {
      const { issuesKeys } = event.data;
      await step.run('Fetch comments page', async () => {
        const issues = (await jiraIssueLoader.loadMany(issuesKeys)) as JiraIssue[];

        const vectors = [{ text: ' The engineer summary is ....' }];
        /** Call the summarization chain. */
        // const chain = loadSummarizationChain(model);
        // const res = await chain.call({
        //   input_documents: docs
        // });
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
