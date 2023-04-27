Summary:
This file contains event handlers for processing Jira updates, project updates, and upserted issues. It interacts with the Jira API, OpenAI API, and Pinecone API to fetch, process, and store data.

Import statements:
- Importing types, utilities, and other event handlers.
- Importing OpenAI API and Pinecone API for external interactions.

Script Summary:
The script contains three main event handlers: processJiraUpdated, procesProjectUpdated, and processUpsertedIssues. These handlers are responsible for processing Jira updates, project updates, and upserted issues, respectively.

Internal Functions:
- initializeOpenAI: Initializes the OpenAI API with the provided API key.

External Functions:
- processJiraUpdated: Handles the 'jira/app.sync' event, fetching Jira projects and sending 'jira/project.sync' events for each project.
- procesProjectUpdated: Handles the 'jira/project.sync' event, fetching Jira issues for the specified projects and sending 'jira/issues.upserted' events for each issue.
- processUpsertedIssues: Handles the 'jira/issues.upserted' event, processing Jira issues and their comments, generating Pinecone vectors, and sending 'pinecone/vectors.upserted' events for each vector.

Interaction Summary:
This file interacts with the Jira API to fetch project and issue data, the OpenAI API to generate summaries, and the Pinecone API to store and retrieve vectors. It also interacts with other parts of the application through event handling.

Developer Questions:
- How are the events triggered and consumed by other parts of the application?
- How can I modify the Jira API interactions if the API changes?
- How can I add more event handlers for other Jira-related events?

Known Issues and TODOs:
- Fix embeddings getting too big for Pinecone by possibly chunking comments into multiple embeddings.
- Create a JiraIssueCommentsLoader or pull issue and comments from Prisma.
- Save data to Redis by issue key and only send issue keys in events.
- Address any changes in the Jira API, OpenAI API, or Pinecone API that may affect the script's functionality.