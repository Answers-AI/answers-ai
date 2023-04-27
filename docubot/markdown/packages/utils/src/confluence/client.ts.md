Summary:
This file contains the implementation of a Confluence API client that interacts with the Confluence API to fetch data about Confluence pages and spaces. It uses Redis for caching and Axios for making HTTP requests.

Import statements:
- axios: a promise-based HTTP client for the browser and Node.js.
- Redis: a popular in-memory data structure store, used as a database, cache, and message broker.
- ConfluencePage, ConfluenceSpace: custom types used to represent Confluence pages and spaces.
- redisLoader: a custom Redis caching utility.

Script Summary:
The ConfluenceClient class is defined, which contains methods for fetching data from the Confluence API. The class constructor takes an optional access token and cache expiration time as parameters. The class also defines two Redis loaders, one for fetching all Confluence pages and one for fetching a single Confluence page.

Internal Functions:
- handleRateLimit: a function that waits for the specified number of seconds before resolving.
- getAppData: a function that fetches data about the Confluence app.
- getCloudId: a function that returns the Confluence cloud ID.
- getSpaces: a function that fetches all Confluence spaces.
- fetchConfluenceData: a function that fetches data from the Confluence API and caches it in Redis.
- getConfluencePage: a function that fetches a single Confluence page.
- getConfluencePages: a function that fetches all Confluence pages.

External Functions:
- None

Interaction Summary:
This file interacts with the Confluence API to fetch data about Confluence pages and spaces. It also uses Redis for caching.

Developer Questions:
- What is the format of the data returned by the Confluence API?
- How does Redis caching work in this file?
- What happens if the Redis cache is unavailable?
- How are rate limits handled in this file?

Known Issues and TODOs:
- None