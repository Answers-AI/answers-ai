import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import * as jiraFunctions from 'utils/dist/ingest/jira';
import * as promptFunctions from 'utils/dist/ingest/prompt';

// Create a client to send and receive events
export const inngest = new Inngest({ name: 'My App' });

export default serve(
  inngest,
  Object.values({
    ...jiraFunctions,
    ...promptFunctions
  }),
  {
    signingKey: process.env.INNGEST_SIGNING_KEY
  }
);
