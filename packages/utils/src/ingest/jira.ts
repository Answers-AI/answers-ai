import { getJiraComments, getJiraProjects, JiraIssue, JiraProject } from '../jira';
import { getJiraTickets } from '../jira/getJiraTickets';
import { jiraIssueLoader } from '../jira';
import { chunkArray } from '../utilities/utils';
import { EventVersionHandler } from './EventVersionHandler';
import { AnswersFilters, AppSettings } from 'types';
import { jiraAdfToMarkdown } from '../utilities/jiraAdfToMarkdown';
import { Configuration, OpenAIApi } from 'openai';
import { MODELS } from '../MODELS';
import { inngest } from './client';
import { summarizeAI } from '../summarizeAI';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

const JIRA_ISSUE_BATCH_SIZE = 1000;
const JIRA_PROJECT_BATCH_SIZE = 5;
const PINECONE_VECTORS_BATCH_SIZE = 50;

const recursiveCharacterTextSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 6000 });
const splitPageHtmlChunkMore = async (markdownChunk: string) => {
  const contextChunks = await recursiveCharacterTextSplitter.createDocuments([markdownChunk]);
  const smallerChunks = contextChunks.map((chunk) => `${chunk.pageContent}`);

  return smallerChunks;
};

const formatDate = (date: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const formattedDate = date.toLocaleString('en-US', dateOptions);

  return formattedDate;
};

const reduceWhiteSpace = (markdown: string) => {
  // Replace all header level prefixes with bold markers
  markdown = markdown.replace(/^(#{1,6})\s+/gm, '$1 **');

  // Replace two or more consecutive spaces with a single space
  markdown = markdown.replace(/ {2,}/g, ' ');

  // Replace two or more consecutive newlines with a single newline
  markdown = markdown.replace(/\n{2,}/g, '\n');

  return markdown;
};

const getJiraIssueVectors = async (jiraIssues: any[]) => {
  const vectors = await (
    await Promise.all(
      jiraIssues
        ?.filter((issue) => !!issue)
        ?.map(async (issue) => {
          const account = issue?.fields.customfield_10037?.value;
          const title = issue?.fields?.summary;
          const issueKey = issue?.key;
          const parentKey = issue?.fields.parent?.key;
          const project = issue?.fields.project?.key;
          const description = issue?.fields.description
            ? jiraAdfToMarkdown(issue?.fields.description)?.replaceAll('\n', ' ')
            : '';

          const headers = [account, title, parentKey, issueKey];
          const ticketFields = {
            link: `https://lastrev.atlassian.net/browse/${issue?.key}`?.toLowerCase(),
            status_category: issue?.fields.status?.statusCategory?.name?.toLowerCase(),
            status: issue?.fields.status?.name?.toLowerCase(),
            assignee: issue?.fields.assignee?.displayName || 'Unassigned'?.toLowerCase(),
            priority: issue?.fields.priority?.name?.toLowerCase(),
            reporter: issue?.fields.reporter?.displayName?.toLowerCase(),
            assignee_email: issue?.fields.assignee?.email?.toLowerCase()
          };

          let mainHeader = `The "${title}" ticket "${issueKey}" for account "${account}"`;
          let markdown = '';
          const chunkedDescription = await splitPageHtmlChunkMore(description);
          chunkedDescription.map((chunk) => {
            markdown += `${mainHeader}\n${chunk}`;
          });

          Object.entries(ticketFields)
            .filter(([_, value]) => !!value)
            .map(([key, value]) => {
              markdown += `${mainHeader} ${key.replaceAll('_', ' ')} is ${value.toLowerCase()}.\n`;
            });

          if (issue?.comments?.length) {
            await Promise.all(
              issue?.comments?.map(async ({ author, body, updated, self }: any) => {
                const authorName = author?.displayName || 'Unknown';
                const commentDate = updated ?? formatDate(new Date(updated));
                const commentBody = reduceWhiteSpace(jiraAdfToMarkdown(body));

                if (commentBody?.trim().length > 40) {
                  const commentHeader = `On the date ${commentDate}, ${authorName} left a comment on ${mainHeader}.   ${authorName} commented:`;
                  const chunkMore = await splitPageHtmlChunkMore(commentBody);
                  chunkMore.map((chunk) => {
                    markdown += `${commentHeader}\n${chunk}\n`;
                  });
                }
              })
            );
          }

          const markdownChunks = await splitPageHtmlChunkMore(markdown);
          if (!markdownChunks?.length) return [];
          // console.log(
          //   markdownChunks.join(`
          // =================
          // `)
          // );

          return markdownChunks.map((headingChunk: string, i: any) => ({
            uid: `JiraIssue_${issue?.key}_${i}`,
            text: headingChunk,
            metadata: {
              project: project?.toLowerCase(),
              account: account?.toLowerCase(),
              key: issueKey?.toLowerCase(),
              ...ticketFields
            }
          }));
        })
    )
  )
    .flat()
    .filter(Boolean);

  return vectors;
};

const embedVectors = async (event: any, vectors: any[]) => {
  let outVectors: void[] = [];

  if (vectors?.length && vectors?.every((x: any) => !!x)) {
    outVectors = await Promise.all(
      chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
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
  }

  return outVectors;
};

export const processJiraUpdated: EventVersionHandler<{
  appSettings: AppSettings;
  filters: AnswersFilters;
}> = {
  event: 'jira/app.sync',
  v: '1',
  handler: async ({ event, step }) => {
    const { filters, appSettings } = event.data;
    const { datasources: { jira: { project } = { project: [] } } = {} } = filters || {};
    const projectKeysFilter = appSettings?.jira?.projects
      ?.filter((p) => (project?.length ? project?.includes(p.key) : p.enabled))
      ?.map((p) => p.key);

    if (!projectKeysFilter?.length) {
      console.log('No Jira projects to sync.');
      return;
    }

    const projects = await getJiraProjects();

    // Fetch all Jira issues in the configured projects
    await Promise.all(
      chunkArray(
        projects?.filter((project) => projectKeysFilter?.includes(project.key)),
        JIRA_PROJECT_BATCH_SIZE
      ).map(async (batchProjects: JiraProject[], i) => {
        try {
          await Promise.all(
            MODELS.jira?.map(async (model) => {
              const eventData = {
                _page: i,
                _batchSize: JIRA_PROJECT_BATCH_SIZE,
                model,
                total: projects.length,
                projectKeys: batchProjects?.map((project) => project.key)
              };

              await inngest.send({
                ts: new Date().valueOf(),
                name: 'jira/project.sync',
                data: eventData,
                user: event.user
              });
            })
          );
        } catch (e) {
          console.error(e);
        }
      })
    );
  }
};

export const processJiraAllUpdated: EventVersionHandler<{
  appSettings: AppSettings;
  filters: AnswersFilters;
}> = {
  event: 'jira/all.sync',
  v: '1',
  handler: async ({ event, step }) => {
    const projects = await getJiraProjects();

    await Promise.all(
      chunkArray(projects, JIRA_PROJECT_BATCH_SIZE).map(async (batchProjects: JiraProject[], i) => {
        try {
          await Promise.all(
            MODELS.jira?.map(async (model) => {
              const eventData = {
                _page: i,
                _batchSize: JIRA_PROJECT_BATCH_SIZE,
                model,
                total: projects.length,
                projectKeys: batchProjects?.map((project) => project.key)
              };

              await inngest.send({
                ts: new Date().valueOf(),
                name: 'jira/project.sync',
                data: eventData,
                user: event.user
              });
            })
          );
        } catch (e) {
          console.error(e);
        }
      })
    );
  }
};

export const procesProjectUpdated: EventVersionHandler<{ projectKeys: string[]; model: string }> = {
  event: 'jira/project.sync',
  v: '1',
  handler: async ({ event, step }) => {
    const { projectKeys, model } = event.data;

    // Chunk projects into batches of 10
    const issues = await getJiraTickets({
      jql: `project in (${projectKeys?.join(',')})`
    });

    if (!issues?.length) {
      console.log(`No issues to sync for projects ${projectKeys?.join(', ')}`);
      return;
    }

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
  v: '1',
  handler: async ({ event, step }) => {
    try {
      const { issuesKeys } = event.data;

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

      const vectors = await Promise.all(
        jiraIssueComments
          ?.filter((issue) => !!issue)
          ?.map(async (issue) => {
            const commentsSummary = await summarizeAI({
              input: issue?.comments
                ?.map(
                  ({ author, body, updated, self }: any) =>
                    `${author?.displayName} commented on ${new Date(
                      updated
                    ).toDateString()}: ${jiraAdfToMarkdown(body)}`
                )
                ?.join('<sep>'),
              prompt:
                'Summarize each comment consicesly (always include dates, action items, and open questions, provide each comment as a list item by the most recent).'
            });
            const ticketFields = {
              source: 'jira',
              project: issue?.fields.project?.key?.toLowerCase(),
              account: issue?.fields.customfield_10037?.value?.toLowerCase(),
              title: issue?.fields?.summary?.toLowerCase(),
              status_category: issue?.fields.status?.statusCategory?.name?.toLowerCase(),
              status: issue?.fields.status?.name?.toLowerCase(),
              assignee: issue?.fields.assignee?.displayName || 'Unassigned'?.toLowerCase(),
              priority: issue?.fields.priority?.name?.toLowerCase(),
              reporter: issue?.fields.reporter?.displayName?.toLowerCase(),
              assignee_email: issue?.fields.assignee?.email?.toLowerCase(),
              parent_key: issue?.fields.parent?.key?.toLowerCase(),
              link: `https://lastrev.atlassian.net/browse/${issue?.key}`?.toLowerCase(),
              description: (issue?.fields.description
                ? jiraAdfToMarkdown(issue?.fields.description)?.replaceAll('\n', ' ')
                : ''
              )?.toLowerCase(),
              comments_summary: commentsSummary?.toLowerCase()
            };
            const text = `[ticket] [id][id] ${issue?.key?.toLowerCase()} | ${Object.entries(
              ticketFields
            )
              .filter(([_, value]) => !!value)
              .map(([key, value]) => `[${key}] ${value?.replaceAll('\n', ' ')}`)
              ?.join(' | ')}`;

            return !!issue
              ? [
                  {
                    uid: `JiraIssue_${issue?.key}`,
                    text,
                    metadata: ticketFields
                  }
                ]
              : '';
          })
      ).then((vectors) => vectors.flat());

      if (vectors?.length && vectors?.every((x) => !!x))
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};

export const processUpsertedIssuesV2: EventVersionHandler<{ issuesKeys: string[]; key: string }> = {
  event: 'jira/issues.upserted',
  v: '2',
  handler: async ({ event }) => {
    try {
      const { issuesKeys } = event.data;

      const issues = (await jiraIssueLoader.loadMany(issuesKeys)) as JiraIssue[];

      const jiraIssueComments: any[] = await Promise.all(
        issues?.map(async (issue) =>
          getJiraComments(issue?.id)
            .then((comments) => ({ ...issue, comments }))
            .catch((err) => null)
        )
      );

      const vectors = await getJiraIssueVectors(jiraIssueComments);
      const embeddedVectors = await embedVectors(event, vectors);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
