Filepath: packages/utils/src/jira/client.ts
Overview: Summary:
This file contains the JiraClient class, which is responsible for handling interactions with the Jira API. It includes functions for fetching Jira data, handling rate limits, and caching data. 

Import statements:
- axios: a promise-based HTTP client for the browser and Node.js
- Redis: a popular in-memory data structure store used as a database, cache, and message broker
- types: custom type definitions for Jira issues and projects
- getJiraTickets: a function for fetching Jira tickets
- redisLoader: a function for loading data from Redis

Script Summary:
- Defines the JiraClient class
- Includes functions for fetching Jira data, handling rate limits, and caching data
- Exports the JiraClient class

Internal Functions:
- constructor: initializes the JiraClient class with cache expiration time and access token
- getAppData: fetches data about the Jira app
- getCloudId: retrieves the cloud ID for the Jira app
- handleRateLimit: handles rate limits for Jira API requests
- fetchJiraData: fetches Jira data from the API and caches it
- getJiraTickets: fetches Jira tickets
- getJiraProjects: fetches Jira projects
- fetchJiraIssue: fetches a specific Jira issue
- getJiraComments: fetches comments for a specific Jira issue

External Functions:
- None

Interaction Summary:
This file interacts with the Jira API to fetch data about Jira issues and projects. It also interacts with Redis to cache data.

Developer Questions:
- What is the purpose of the JiraClient class?
- How does the caching mechanism work?
- What is the RedisLoader function used for?
- How are rate limits handled for Jira API requests?
- What is the purpose of the getJiraTickets function?

