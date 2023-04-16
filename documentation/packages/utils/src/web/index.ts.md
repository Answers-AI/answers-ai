Filepath: packages/utils/src/web/index.ts
Overview: Summary:
This file contains code related to web client and web page loading. It imports a WebClient module, a getWebPageHtml function, and a redisLoader module. It exports a webClient object and a webPageLoader object.

Import statements:
- WebClient: a module for making HTTP requests to web pages
- getWebPageHtml: a function for getting the HTML content of a web page
- redisLoader: a module for loading data from Redis cache

Script Summary:
This script creates a web client object and a web page loader object. The web page loader uses Redis cache to store and retrieve web page HTML content.

Internal Functions:
None

External Functions:
- webClient: a WebClient object for making HTTP requests to web pages
- webPageLoader: a Redis cache loader object for loading web page HTML content

Interaction Summary:
This file interacts with other parts of the application by providing a web client object and a web page loader object. These objects can be used by other modules to make HTTP requests and load web page HTML content.

Developer Questions:
- How is the Redis cache configured for the web page loader?
- What happens if a web page HTML content is not found in the Redis cache?
- How can the cache expiration time be configured for the web page loader?
- How can the cache be disabled for the web page loader?
- How can the web client object be used to make HTTP requests to web pages?

