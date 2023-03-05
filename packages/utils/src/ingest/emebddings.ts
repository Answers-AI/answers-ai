import PineconeClient from '../pinecone/client';
import JiraIssueModel from '../jira/models/issue';
import JiraThreadModel from '../jira/models/thread';
import { EventVersionHandler } from './EventVersionHandler';
import * as jira from '../jira';
// import * as slack from '../slack';

import { prepareAllForEmbedding } from '../prepareAllForEmbedding';

const JIRA_PROJECT_BATCH_SIZE = 5;

const pinecone = new PineconeClient({
  namespace: process.env.PINECONE_INDEX_NAMESPACE,
  indexName: process.env.PINECONE_INDEX
});

const DISABLE_EMBEDDING = false;

const JIRA_MODELS = {
  1: {
    parser: (data: any) => new JiraIssueModel(data)
  }
};

const CURRENT_JIRA_MODEL = 1;

export const processEmbeddings: EventVersionHandler<{ issuesKeys: string[] }> = {
  event: 'jira/issue.embeddings.upserted',
  v: '1',
  handler: async ({ event }) => {
    const { issuesKeys } = event.data;

    const issues = await jira.jiraIssueLoader.loadMany(issuesKeys);

    // TODO - select jira -> pinecone transformer here
    // Should default to jira issue
    // Should be able to enable other transformers
    const vectorData = await prepareAllForEmbedding(
      issues.map(JIRA_MODELS[CURRENT_JIRA_MODEL].parser)
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
