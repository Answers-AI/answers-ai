import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import { createInngestFunctions } from 'utils/dist/ingest/EventVersionHandler';
import * as jiraFunctions from 'utils/dist/ingest/jira';
import * as promptFunctions from 'utils/dist/ingest/prompt';
import * as slackFunctions from 'utils/dist/ingest/slack';
import * as embeddingsFunctions from 'utils/dist/ingest/embeddings';
import * as webFunctions from 'utils/dist/ingest/web';
import * as openApiFunctions from 'utils/dist/ingest/openapi';
import * as authFunctions from 'utils/dist/ingest/auth';
import * as messageFunctions from 'utils/dist/ingest/message';

// Create a client to send and receive events

export const inngest = new Inngest({ name: 'My App' });

const functions = Object.values({
  ...authFunctions,
  ...jiraFunctions,
  ...slackFunctions,
  ...embeddingsFunctions,
  ...promptFunctions,
  ...webFunctions,
  ...openApiFunctions,
  ...messageFunctions
});

const inngestFunctions = createInngestFunctions(functions as any);

export default serve(inngest, inngestFunctions, {
  signingKey: process.env.INNGEST_SIGNING_KEY
});
