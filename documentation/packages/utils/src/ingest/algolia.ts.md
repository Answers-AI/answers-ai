Filepath: packages/utils/src/ingest/algolia.ts
Overview: Summary:
This file is responsible for processing Algolia search results and embedding them as vectors in the application. It imports necessary dependencies, defines helper functions, and exports the main `processAlgoliaSearch` function.

Import statements:
- `inngest` from './client': A client for ingesting data.
- `EventVersionHandler` from './EventVersionHandler': A handler for processing events with specific versions.
- `chunkArray` from '../utilities/utils': A utility function to split an array into chunks.
- `AlgoliaHit` from 'types': A type definition for Algolia search results.
- `RecursiveCharacterTextSplitter` from 'langchain/text_splitter': A text splitter for breaking down large texts into smaller chunks.
- `algoliasearch`, `SearchClient`, `SearchIndex` from 'algoliasearch': Algolia search library and related types.

Script Summary:
This script processes Algolia search results, splits them into smaller chunks, and embeds them as vectors in the application using the `inngest` client. It exports the `processAlgoliaSearch` function, which is an event handler for the 'algolia/search.sync' event.

Internal Functions:
- `prefixHeaders(markdown: string)`: Adds prefixes to headers in the markdown string and returns the modified string.
- `splitPageHtmlChunkMore(markdownChunk: string)`: Splits a markdown chunk into smaller chunks using the `RecursiveCharacterTextSplitter`.
- `splitPageHtml(algoliaHit: AlgoliaHit)`: Splits the content body of an Algolia hit into smaller chunks.
- `getAlgoliaVectors(algoliaHits: AlgoliaHit[])`: Converts Algolia hits into vectors with metadata.
- `embedVectors(event: any, vectors: any[])`: Embeds the vectors into the application using the `inngest` client.

External Functions:
- `processAlgoliaSearch`: An event handler for the 'algolia/search.sync' event. It processes Algolia search results, splits them into smaller chunks, and embeds them as vectors in the application.

Interaction Summary:
This file interacts with the Algolia search library to process search results and embed them as vectors in the application. It also uses the `inngest` client to send the embedded vectors to the application.

Developer Questions:
- How are Algolia search results structured and what fields are available?
- How does the `RecursiveCharacterTextSplitter` work and what are its limitations?
- What is the purpose of splitting the content body of Algolia hits into smaller chunks?
- How does the `inngest` client work and what are its requirements for sending data?
- Are there any performance considerations when processing large Algolia search results?

