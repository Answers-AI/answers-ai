Filepath: packages/utils/src/ingest/slack.ts
Overview: Summary:
This file is responsible for processing Slack events and sending them to a third-party service called Inngest. It contains three event handlers that are triggered when certain Slack events occur. The events are processed in batches and sent to Inngest for further processing.

Import statements:
- PineconeClient: A client for interacting with a third-party service called Pinecone.
- chunkArray: A utility function for splitting an array into smaller chunks.
- inngest: A client for interacting with a third-party service called Inngest.
- EventVersionHandler: A type definition for an event handler.
- AppSettings, SlackChannel, SlackMessage: Type definitions for Slack-related data.
- SlackMessageModel: A model for representing Slack messages.
- prepareAllForEmbedding: A function for preparing Slack messages for embedding.
- SlackClient: A client for interacting with the Slack API.
- getUserClients: A function for getting user clients.

Script Summary:
This file contains three event handlers for processing Slack events. The first handler processes updates to the Slack app and sends information about selected channels to Inngest. The second handler processes updates to Slack channels and sends information about channel messages to Inngest. The third handler processes updates to Slack messages and prepares them for embedding in Pinecone.

Internal Functions:
None.

External Functions:
- processSlackUpdated: Processes updates to the Slack app and sends information about selected channels to Inngest.
- procesChannelUpdated: Processes updates to Slack channels and sends information about channel messages to Inngest.
- processMessageEmbeddingsUpserted: Processes updates to Slack messages and prepares them for embedding in Pinecone.

Interaction Summary:
This file interacts with the Slack API, Inngest, and Pinecone. It receives events from the Slack API, processes them, and sends them to Inngest for further processing. It also prepares Slack messages for embedding in Pinecone.

Developer Questions:
- What other files in the application interact with Inngest and Pinecone?
- What Slack events trigger the event handlers in this file?
- How are Slack messages prepared for embedding in Pinecone?
- What is the purpose of the chunkArray utility function?
- How are user clients obtained in this file?

