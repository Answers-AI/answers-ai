Summary:
This file exports two constants, webClient and webPageLoader, which are used for web-related functionality. It imports a WebClient class, a getWebPageHtml function, and a redisLoader function.

Import statements:
- WebClient: a class for making HTTP requests
- getWebPageHtml: a function for getting the HTML of a web page
- redisLoader: a function for loading data from Redis cache

Script Summary:
This file exports two constants:
- webClient: an instance of the WebClient class
- webPageLoader: a Redis cache loader for web page HTML

Internal Functions:
None

External Functions:
- redisLoader: a function that takes in a key prefix, Redis configuration, a function for getting values, a cache expiration time, and a flag for disabling the cache. It returns a function that loads data from Redis cache.

Interaction Summary:
This file is used for web-related functionality in the larger application. The webClient instance can be used to make HTTP requests, while the webPageLoader can be used to load web page HTML from Redis cache.

Developer Questions:
- What is the format of the Redis cache key for web pages?
- How is the Redis cache configured for this application?
- What is the expected format of the keys parameter in the getValuesFn function?
- How is the webPageLoader used in the rest of the application?