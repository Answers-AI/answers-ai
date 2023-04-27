Summary:
This file contains code for processing Confluence pages and embedding them as vectors in Pinecone. It includes functions for splitting Confluence pages into smaller chunks, prefixing headers, and embedding vectors. 

Import statements:
- `inngest` from `./client`: a custom client for sending data to Pinecone
- `EventVersionHandler` from `./EventVersionHandler`: a custom event handler for processing events
- `chunkArray` from `../utilities/utils`: a utility function for chunking arrays
- `ConfluencePage` from `types`: a custom type for Confluence pages
- `jiraAdfToMarkdown` from `../utilities/jiraAdfToMarkdown`: a utility function for converting Jira ADF to Markdown
- `RecursiveCharacterTextSplitter` from `langchain/text_splitter`: a custom class for splitting text into smaller chunks
- `getUserClients` from `../auth/getUserClients`: a utility function for getting user clients

Script Summary:
This script exports two event handlers for processing Confluence pages and embedding them as vectors in Pinecone. 

Internal Functions:
- `prefixHeaders`: prefixes headers in a Markdown string with the appropriate number of `#` characters and returns the modified string
- `splitPageHtmlChunkMore`: splits a Markdown chunk into smaller HTML chunks using `RecursiveCharacterTextSplitter` and returns an array of HTML chunks
- `splitPageAdf`: splits a Confluence page into smaller Markdown chunks using `prefixHeaders` and `splitPageHtmlChunkMore` and returns an array of Markdown chunks
- `getConfluencePagesVectors`: gets vectors for an array of Confluence pages using `splitPageAdf` and returns an array of vectors
- `embedVectors`: embeds an array of vectors in Pinecone using `inngest` and returns an array of voids

External Functions:
- `processConfluencePages`: an event handler for processing all Confluence pages and embedding them as vectors in Pinecone
- `processConfluencePage`: an event handler for processing a specific Confluence page and embedding it as a vector in Pinecone

Interaction Summary:
This file interacts with the rest of the application by processing Confluence pages and embedding them as vectors in Pinecone. It depends on other utility functions and classes in the `../utilities` and `langchain` directories.

Developer Questions:
- What is the format of the data sent to Pinecone?
- How can we optimize the chunk size for splitting Confluence pages?
- How can we handle errors when embedding vectors in Pinecone?

Known Issues and TODOs:
- None