Filepath: packages/utils/src/ingest/jira.ts
Overview: Summary:
This file is responsible for handling Jira-related events and processing Jira issues and projects. It interacts with the Jira API, OpenAI API, and Inngest API to fetch, process, and store data. The file exports three event handlers: processJiraUpdated, procesProjectUpdated, and processUpsertedIssues.

Import statements:
- JiraIssue and JiraProject types from 'types'
- chunkArray utility function from '../utilities/utils'
- EventVersionHandler type from './EventVersionHandler'
- AnswersFilters and AppSettings types from 'types'
- jiraAdfToMarkdown utility function from '../utilities/jiraAdfToMarkdown'
- Configuration and OpenAIApi classes from 'openai'
- MODELS constant from '../MODELS'
- inngest client from './client'
- summarizeAI utility function from '../summarizeAI'
- getUserClients utility function from '../auth/getUserClients'

Script Summary:
The script initializes the OpenAI API, defines constants for batch sizes, and exports three event handlers for processing Jira updates, projects, and issues.

Internal Functions:
- initializeOpenAI: Initializes the OpenAI API with the provided API key and returns an instance of the OpenAIApi class.

External Functions:
- processJiraUpdated: Event handler for 'jira/app.sync' event. Fetches Jira projects and sends 'jira/project.sync' events for each project.
- procesProjectUpdated: Event handler for 'jira/project.sync' event. Fetches Jira issues for the given project keys and sends 'jira/issues.upserted' events for each issue.
- processUpsertedIssues: Event handler for 'jira/issues.upserted' event. Processes the given issues, generates vectors using OpenAI API, and sends 'pinecone/vectors.upserted' events for each vector.

Interaction Summary:
This file interacts with the Jira API to fetch project and issue data, processes the data using the OpenAI API, and sends events to the Inngest API for further processing and storage. It also uses utility functions and types from other modules within the application.

Developer Questions:
- How are the API keys for Jira, OpenAI, and Inngest managed and stored?
- How are the batch sizes determined and can they be adjusted for performance optimization?
- Are there any error handling or retry mechanisms in place for API calls?
- How does the application handle rate limiting or API call restrictions from the Jira or OpenAI APIs?
- Are there any caching mechanisms in place for frequently accessed data?

