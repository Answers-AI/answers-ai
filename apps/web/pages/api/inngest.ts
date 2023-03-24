import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import { createInngestFunctions } from '@utils/ingest/EventVersionHandler';
import * as jiraFunctions from '@utils/ingest/jira';
import * as promptFunctions from '@utils/ingest/prompt';
import * as slackFunctions from '@utils/ingest/slack';
import * as embeddingsFunctions from '@utils/ingest/embeddings';
import * as webFunctions from '@utils/ingest/web';
import * as openApiFunctions from '@utils/ingest/openapi';
import * as authFunctions from '@utils/ingest/auth';
import * as messageFunctions from '@utils/ingest/message';
import * as confluenceFunctions from '@utils/ingest/confluence';

// Create a client to send and receive events

const handlers = {
  ...authFunctions,
  ...embeddingsFunctions,
  ...messageFunctions,
  ...webFunctions,
  ...promptFunctions,
  ...jiraFunctions,
  ...slackFunctions,
  ...openApiFunctions,
  ...confluenceFunctions
};

const functions = Object.values(handlers);
type Events = {};
export const inngest = new Inngest<Events>({ name: 'My App' });

const inngestFunctions = createInngestFunctions(functions as any);

export default serve(inngest, inngestFunctions, {
  signingKey: process.env.INNGEST_SIGNING_KEY
});
