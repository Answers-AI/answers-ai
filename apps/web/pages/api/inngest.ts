import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import * as IngestFunctions from 'utils/dist/ingest';

// Create a client to send and receive events
export const inngest = new Inngest({ name: 'My App' });

export default serve(inngest, [...Object.values(IngestFunctions)], {
  signingKey: process.env.INNGEST_SIGNING_KEY
});
