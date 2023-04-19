Summary:
This file contains functions for processing Confluence pages and sending their vectors to a third-party service called Pinecone. It imports various utility functions and types, and exports two event handlers for processing Confluence pages.

Import statements:
- `inngest` from './client': a client for sending data to Pinecone
- `EventVersionHandler` from './EventVersionHandler': a type for defining event handlers
- `chunkArray` from '../utilities/utils': a utility function for chunking arrays
- `ConfluencePage` from 'types': a type for Confluence pages
- `jiraAdfToMarkdown` from '../utilities/jiraAdfToMarkdown': a utility function for converting Jira ADF to Markdown
- `RecursiveCharacterTextSplitter` from 'langchain/text_splitter': a third-party library for splitting text into smaller chunks
- `getUserClients` from '../auth/getUserClients': a function for getting user clients

Script Summary:
This file contains functions for processing Confluence pages and sending their vectors to a third-party service called Pinecone. It exports two event handlers for processing Confluence pages: `processConfluencePages` and `processConfluencePage`. Both handlers retrieve Confluence pages, split them into smaller chunks, and send their vectors to Pinecone.

Internal Functions:
- `prefixHeaders`: prefixes headers in a Markdown string with a hierarchy of dashes
  - Parameters: `markdown` (string): the Markdown string to prefix headers in
  - Returns: the modified Markdown string
- `splitPageHtmlChunkMore`: splits a Markdown chunk into smaller chunks using a third-party library
  - Parameters: `markdownChunk` (string): the Markdown chunk to split
  - Returns: an array of smaller Markdown chunks
- `splitPageAdf`: splits a Confluence page into Markdown chunks
  - Parameters: `page` (ConfluencePage): the Confluence page to split
  - Returns: an array of Markdown chunks
- `getConfluencePagesVectors`: retrieves vectors for a list of Confluence pages
  - Parameters: `confluencePages` (ConfluencePage[]): the Confluence pages to retrieve vectors for
  - Returns: an array of vectors
- `embedVectors`: sends vectors to Pinecone in batches
  - Parameters: `event` (any): the event that triggered the vector embedding, `vectors` (any[]): the vectors to embed
  - Returns: an array of void values

External Functions:
- `processConfluencePages`: an event handler for processing Confluence pages
  - Parameters: `{ pageIds: string[] }`: an object containing an array of Confluence page IDs
  - Returns: void
- `processConfluencePage`: an event handler for processing a single Confluence page
  - Parameters: `{ pageIds: string[] }`: an object containing an array of Confluence page IDs
  - Returns: void

Interaction Summary:
This file interacts with the rest of the application by exporting two event handlers that can be triggered by events in the Confluence app. These handlers retrieve Confluence pages, split them into smaller chunks, and send their vectors to Pinecone.

Developer Questions:
- What is Pinecone and how does it work?
- What events trigger the `processConfluencePages` and `processConfluencePage` handlers?
- What is the `getUserClients` function and how does it work?
- What is the `RecursiveCharacterTextSplitter` library and how does it work?
- What is the structure of a Confluence page object?
- What is the structure of a vector object?
- How are vectors sent to Pinecone in batches?