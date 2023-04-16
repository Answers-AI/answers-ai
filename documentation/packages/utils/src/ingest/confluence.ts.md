Filepath: packages/utils/src/ingest/confluence.ts
Overview: Summary:
This file contains code for processing Confluence pages and embedding their vectors using Pinecone. It includes functions for splitting Confluence page content into smaller chunks, prefixing headers, and getting Confluence page vectors. It also includes event handlers for syncing Confluence pages and syncing individual Confluence pages.

Import statements:
- inngest: a client for sending data to Pinecone
- EventVersionHandler: a type for defining event handlers
- chunkArray: a utility function for chunking arrays
- ConfluencePage: a type for defining Confluence pages
- jiraAdfToMarkdown: a utility function for converting Jira ADF to Markdown
- RecursiveCharacterTextSplitter: a class for splitting text into smaller chunks
- getUserClients: a function for getting user clients

Script Summary:
This script exports two event handlers for syncing Confluence pages and individual Confluence pages. It also includes several internal functions for processing Confluence pages and embedding their vectors using Pinecone.

Internal Functions:
- prefixHeaders: prefixes headers in a Markdown string with parent headers
  - Parameters: 
    - markdown: a string of Markdown
  - Returns: a string of Markdown with prefixed headers
- splitPageHtmlChunkMore: splits a Markdown chunk into smaller chunks using RecursiveCharacterTextSplitter
  - Parameters: 
    - markdownChunk: a string of Markdown
  - Returns: an array of smaller Markdown chunks
- splitPageAdf: splits a Confluence page into smaller Markdown chunks
  - Parameters: 
    - page: a Confluence page
  - Returns: an array of smaller Markdown chunks
- getConfluencePagesVectors: gets vectors for an array of Confluence pages
  - Parameters: 
    - confluencePages: an array of Confluence pages
  - Returns: an array of vectors
- embedVectors: embeds vectors using Pinecone
  - Parameters: 
    - event: a Pinecone event
    - vectors: an array of vectors
  - Returns: an array of void

External Functions:
- processConfluencePages: an event handler for syncing Confluence pages
  - Parameters: 
    - event: a Pinecone event with pageIds
  - Returns: void
- processConfluencePage: an event handler for syncing individual Confluence pages
  - Parameters: 
    - event: a Pinecone event with pageIds
  - Returns: void

Interaction Summary:
This file interacts with Pinecone to embed vectors for Confluence pages. It also interacts with other files in the application to get user clients and load Confluence pages.

Developer Questions:
- What is the purpose of this file?
- How does Pinecone work?
- What is the structure of a Confluence page?
- How are Confluence pages split into smaller chunks?
- How are vectors embedded using Pinecone?
- How are user clients obtained?
- How are Confluence pages loaded?

