import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import { createInngestFunctions } from '@utils/ingest/EventVersionHandler';
import * as algoliaFunctions from '@utils/ingest/algolia';
import * as authFunctions from '@utils/ingest/auth';
import * as confluenceFunctions from '@utils/ingest/confluence';
import * as embeddingsFunctions from '@utils/ingest/embeddings';
import * as messageFunctions from '@utils/ingest/message';
import * as openApiFunctions from '@utils/ingest/openapi';
import * as promptFunctions from '@utils/ingest/prompt';
import * as slackFunctions from '@utils/ingest/slack';
import * as webFunctions from '@utils/ingest/web';
import * as jiraFunctions from '@utils/ingest/jira';
import * as fileFunctions from '@utils/ingest/file';
import * as airtableFunctions from '@utils/ingest/airtable';
import * as codebaseFunctions from '@utils/ingest/codebase';
import * as documentFunctions from '@utils/ingest/document';
import * as usageTracking from '@utils/ingest/usageTracking';

// Create a client to send and receive events

const handlers = {
  ...algoliaFunctions,
  ...authFunctions,
  ...confluenceFunctions,
  ...embeddingsFunctions,
  ...messageFunctions,
  ...openApiFunctions,
  ...promptFunctions,
  ...slackFunctions,
  ...webFunctions,
  ...jiraFunctions,
  ...fileFunctions,
  ...airtableFunctions,
  ...codebaseFunctions,
  ...documentFunctions,
  ...usageTracking
};

const functions = Object.values(handlers);
type Events = {};
export const inngest = new Inngest<Events>({ name: 'My App' });

const inngestFunctions = createInngestFunctions(functions as any);

export default serve(inngest, inngestFunctions, {
  signingKey: process.env.INNGEST_SIGNING_KEY
});
