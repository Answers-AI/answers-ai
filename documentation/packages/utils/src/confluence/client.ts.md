Filepath: packages/utils/src/confluence/client.ts
Overview: Summary:
This file contains the ConfluenceClient class, which is responsible for interacting with the Confluence API to retrieve data about Confluence pages and spaces. It uses axios for making HTTP requests and Redis for caching data. 

Import statements:
- axios: a library for making HTTP requests
- Redis: a library for caching data
- ConfluencePage, ConfluenceSpace: custom types for representing Confluence pages and spaces

Script Summary:
- Defines the ConfluenceClient class, which has methods for retrieving data about Confluence pages and spaces
- Uses axios for making HTTP requests to the Confluence API
- Uses Redis for caching data to improve performance

Internal Functions:
- handleRateLimit: waits for a specified amount of time if a rate limit is encountered
- getAppData: retrieves data about the authorized app from the Atlassian API
- getCloudId: retrieves the ID of the Confluence instance associated with the authorized app
- getSpaces: retrieves a list of Confluence spaces
- fetchConfluenceData: retrieves data from the Confluence API, with an option to cache the data using Redis
- getConfluencePage: retrieves data about a specific Confluence page
- getConfluencePages: retrieves data about all Confluence pages, with pagination support

External Functions:
- None

Interaction Summary:
- This file interacts with the Confluence API to retrieve data about Confluence pages and spaces.
- It uses Redis to cache data, which can improve performance by reducing the number of API requests needed.
- Other parts of the application may use the ConfluenceClient class to retrieve data about Confluence pages and spaces.

Developer Questions:
- What is the format of the data returned by the Confluence API?
- How does Redis caching work, and how can it be configured?
- What happens if the Confluence API returns an error?
- How can pagination be used with the getConfluencePages method?
- How can the ConfluenceClient class be integrated with other parts of the application?

