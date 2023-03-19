import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import { createInngestFunctions, EventVersionHandler } from 'utils/dist/ingest/EventVersionHandler';
import * as jiraFunctions from 'utils/dist/ingest/jira';
import * as promptFunctions from 'utils/dist/ingest/prompt';
import * as slackFunctions from 'utils/dist/ingest/slack';
import * as embeddingsFunctions from 'utils/dist/ingest/embeddings';
import * as webFunctions from 'utils/dist/ingest/web';
import * as openApiFunctions from 'utils/dist/ingest/openapi';
import * as authFunctions from 'utils/dist/ingest/auth';
import * as messageFunctions from 'utils/dist/ingest/message';

// Create a client to send and receive events

const handlers = {
  ...authFunctions,
  ...embeddingsFunctions,
  ...messageFunctions,
  ...webFunctions,
  ...promptFunctions,
  ...jiraFunctions,
  ...slackFunctions,
  ...openApiFunctions
};

const functions = Object.values(handlers);
type Events = {};
export const inngest = new Inngest<Events>({ name: 'My App' });

const inngestFunctions = createInngestFunctions(functions as any);

export default serve(inngest, inngestFunctions, {
  signingKey: process.env.INNGEST_SIGNING_KEY
});
