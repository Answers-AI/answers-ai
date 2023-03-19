import { getJiraComments, getJiraProjects, JiraIssue, JiraProject } from '../jira';
import { getJiraTickets } from '../jira/getJiraTickets';
import { jiraIssueLoader } from '../jira';

import { chunkArray } from '../utilities/utils';
import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { AnswersFilters, AppSettings } from 'types';
import { jiraAdfToMarkdown } from '../utilities/jiraAdfToMarkdown';

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
    const { projectKeys, model } = event.data;

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
          model: model,
          projectKeys,
          issuesKeys: batchIssues?.map((issue) => issue.key)
        };
        //TODO: Save to Redis by issue key
        //TODO: In event only send issue keys
        inngest.send({
          v: model,
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

        // TODO: Fix embeddings getting way too big for Pinecone
        // Possible solution is to chunk the comments into multiple embeddings
        const summarize = (issue: any) =>
          `[ticket] [id][id] ${issue?.key?.toLowerCase()} | ${Object.entries({
            'project': issue?.fields.project?.key,
            'account': issue?.fields.customfield_10037?.value,
            'title': issue?.fields?.summary,
            'status category': issue?.fields.status?.statusCategory?.name,
            'status': issue?.fields.status?.name,
            'assignee': issue?.fields.assignee?.displayName || 'Unassigned',
            'priority': issue?.fields.priority?.name,
            'reporter': issue?.fields.reporter?.displayName,
            'assignee email': issue?.fields.assignee?.email,
            'parent key': issue?.fields.parent?.key,
            'link': `https://lastrev.atlassian.net/browse/${issue?.key}`,
            'description': issue?.fields.description
              ? jiraAdfToMarkdown(issue?.fields.description)?.replaceAll('\n', ' ')
              : '',
            'comments': issue?.comments
              ?.map(
                ({ author, body, updated, self }: any) =>
                  `[${updated}][${author?.displayName}] ${jiraAdfToMarkdown(body)}`
              )
              ?.join(' | ')
          })
            .filter(([_, value]) => !!value)
            .map(([key, value]) => `[${key}] ${value?.toLowerCase()?.replaceAll('\n', ' ')}`)
            ?.join(' | ')}`;

        const vectors = jiraIssueComments
          ?.filter((issue) => !!issue)
          ?.map((issue) =>
            !!issue
              ? {
                  uid: `JiraIssue_${issue?.key}`,
                  text: summarize(issue),
                  metadata: {
                    'source': 'jira',
                    'model': event.v,
                    'key': issue?.key?.toLowerCase(),
                    'title': issue?.fields?.summary?.toLowerCase(),
                    'account': issue?.fields.customfield_10037?.value?.toLowerCase(),
                    'project': issue?.fields.project?.key?.toLowerCase(),
                    'status_category': issue?.fields.status?.statusCategory?.name?.toLowerCase(),
                    'assignee_name':
                      issue?.fields.assignee?.displayName?.toLowerCase() || 'unassigned',
                    'reporter': issue?.fields.reporter?.displayName?.toLowerCase(),
                    'assignee_email': issue?.fields.assignee?.email?.toLowerCase(),
                    'priority': issue?.fields.priority?.name?.toLowerCase(),
                    'status': issue?.fields.status?.name?.toLowerCase(),
                    'parent key': issue?.fields.parent?.key?.toLowerCase()
                    // 'description': issue?.fields.description
                    //   ? jiraAdfToMarkdown(issue?.fields.description)?.toLowerCase()
                    //   : ''
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
