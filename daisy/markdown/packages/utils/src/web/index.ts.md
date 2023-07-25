Summary:
This code is a script that is responsible for loading web pages and caching their HTML content using Redis. It uses a WebClient class to make HTTP requests and a getWebPageHtml function to retrieve the HTML content of a web page. The script utilizes a redisLoader function to cache the HTML content and retrieve it from the cache when requested.

Import statements:
- `WebClient` is imported from the './client' module. It is a class that provides methods for making HTTP requests.
- `getWebPageHtml` is imported from the './getWebPage' module. It is a function that takes a URL as a parameter and returns the HTML content of the web page.
- `redisLoader` is imported from the '../redisLoader' module. It is a function that handles caching and retrieval of data using Redis.

Script Summary:
The script exports two variables: `webClient` and `webPageLoader`. `webClient` is an instance of the `WebClient` class, and `webPageLoader` is a configured instance of the `redisLoader` function.

Internal Functions:
- None

External Functions:
- `getWebPageHtml`: This function takes a URL as a parameter and returns the HTML content of the web page. It is imported from the './getWebPage' module.

Interaction Summary:
This script can be used by other parts of the application to load web pages and retrieve their HTML content. The `webPageLoader` variable can be called with an array of URLs to retrieve the HTML content of those web pages. The script utilizes Redis for caching the HTML content, which can improve performance by avoiding unnecessary HTTP requests.

Developer Questions:
- How can I use the `webPageLoader` variable to retrieve the HTML content of a web page?
- How does the caching mechanism work with Redis?
- How can I modify the cache expiration time?
- How can I disable the cache if needed?

Known Issues or Bugs:
- None

Todo Items:
- None