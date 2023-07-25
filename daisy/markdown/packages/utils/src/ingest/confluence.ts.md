Summary:
This code is a script that processes Confluence pages and extracts vectors from the content. It is part of a broader software application that handles syncing and processing data from Confluence. The script is responsible for extracting relevant information from Confluence pages, converting it to markdown format, splitting it into smaller chunks, and then embedding the vectors into a vector database.

Import statements:
- `inngest` from './client': This imports the `inngest` object from the './client' module. It is used to send data to the vector database.
- `EventVersionHandler` from './EventVersionHandler': This imports the `EventVersionHandler` class from the './EventVersionHandler' module. It is used to define event handlers for specific events.
- `chunkArray` from '../utilities/utils': This imports the `chunkArray` function from the '../utilities/utils' module. It is used to split an array into smaller chunks.
- `ConfluencePage, User` from 'types': This imports the `ConfluencePage` and `User` types from the 'types' module. They are used to define the types of variables used in the script.
- `jiraAdfToMarkdown` from '../utilities/jiraAdfToMarkdown': This imports the `jiraAdfToMarkdown` function from the '../utilities/jiraAdfToMarkdown' module. It is used to convert Jira ADF (Atlassian Document Format) to markdown format.
- `RecursiveCharacterTextSplitter` from 'langchain/text_splitter': This imports the `RecursiveCharacterTextSplitter` class from the 'langchain/text_splitter' module. It is used to split text into smaller chunks.
- `getUserClients` from '../auth/getUserClients': This imports the `getUserClients` function from the '../auth/getUserClients' module. It is used to get the Confluence client for a user.

Script Summary:
The script defines several utility functions for processing Confluence pages and extracting vectors. It also defines two event handlers, `processConfluencePages` and `processConfluencePage`, which are triggered when specific events occur. These event handlers retrieve Confluence pages, extract vectors from them, and embed the vectors into the vector database.

Internal Functions:
- `prefixHeaders`: This function takes a markdown string as input and prefixes headers with a hierarchical structure. It splits the markdown string into lines, maintains a stack of headers, and adds the appropriate number of '#' characters to each header based on its level in the hierarchy. It returns the modified markdown string.
- `splitPageHtmlChunkMore`: This async function takes a markdown chunk as input and splits it into smaller chunks using the `RecursiveCharacterTextSplitter` class. It returns an array of smaller markdown chunks.
- `splitPageAdf`: This async function takes a Confluence page as input and converts its content from Jira ADF to markdown format. It then splits the markdown content into smaller chunks based on headings. It returns an array of smaller markdown chunks.
- `getConfluencePagesVectors`: This async function takes a user and an array of Confluence pages as input. It extracts vectors from the Confluence pages and returns them as an array.
- `embedVectors`: This async function takes a user, an event, and an array of vectors as input. It sends the vectors to the vector database in batches and returns an array of embedded vectors.

External Functions:
- `processConfluencePages`: This is an event handler that is triggered when the 'confluence/app.sync' event occurs. It retrieves Confluence pages, extracts vectors from them, and embeds the vectors into the vector database.
- `processConfluencePage`: This is an event handler that is triggered when the 'confluence/page.sync' event occurs. It retrieves specific Confluence pages, extracts vectors from them, and embeds the vectors into the vector database.

Interaction Summary:
This script interacts with the rest of the application by handling specific events related to Confluence syncing. It retrieves Confluence pages, extracts vectors from them, and sends the vectors to the vector database for further processing.

Developer Questions:
- How are the Confluence pages retrieved and processed?
- How are the vectors embedded into the vector database?
- What events trigger the execution of the event handlers?
- How is the markdown content converted from Jira ADF format?
- How are the markdown chunks split into smaller chunks?