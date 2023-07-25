Summary:
This code is a script that is responsible for loading web pages and caching their HTML content using Redis. It uses a WebClient class to make HTTP requests and a getWebPageHtml function to retrieve the HTML content of a web page. The script utilizes a redisLoader function to cache the HTML content and retrieve it from the cache when requested.

Import statements:
- `WebClient` is imported from the './client' module. It is used to make HTTP requests.
- `getWebPageHtml` is imported from the './getWebPage' module. It is a function that retrieves the HTML content of a web page.
- `redisLoader` is imported from the '../redisLoader' module. It is a function that handles caching and retrieval of data using Redis.

Script Summary:
The script exports two variables: `webClient` and `webPageLoader`. `webClient` is an instance of the WebClient class, and `webPageLoader` is a configured instance of the redisLoader function.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This script can be used by other parts of the application to load web pages and retrieve their HTML content. The `webClient` instance can be used to make HTTP requests, and the `webPageLoader` instance can be used to load web pages and cache their HTML content using Redis.

Developer Questions:
- How can I use the `webClient` instance to make HTTP requests?
- How can I use the `webPageLoader` instance to load web pages and retrieve their HTML content?
- How can I configure the Redis cache settings for the `webPageLoader` instance?
- How can I disable caching for the `webPageLoader` instance?
- How can I modify the key prefix used for caching in the `webPageLoader` instance?
- How can I modify the cache expiration time for the `webPageLoader` instance?