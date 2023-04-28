Summary:
This file exports two constants, `webClient` and `webPageLoader`, which are instances of `WebClient` and `redisLoader` respectively. `webClient` is imported from `./client`, `getWebPageHtml` is imported from `./getWebPage`, and `redisLoader` is imported from `../redisLoader`.

Import statements:
- `WebClient` is imported from `./client`, which is likely a custom module for making HTTP requests.
- `getWebPageHtml` is imported from `./getWebPage`, which is likely a custom module for fetching HTML content from a web page.
- `redisLoader` is imported from `../redisLoader`, which is likely a custom module for caching data in Redis.

Script Summary:
This file exports two constants, `webClient` and `webPageLoader`. `webClient` is an instance of `WebClient`, which is likely used for making HTTP requests. `webPageLoader` is an instance of `redisLoader`, which is likely used for caching HTML content from web pages.

Internal Functions:
This file does not contain any internal functions.

External Functions:
This file does not contain any external functions.

Interaction Summary:
This file likely interacts with other modules in the application by providing a way to make HTTP requests and cache HTML content from web pages.

Developer Questions:
- What is the purpose of `WebClient` and `redisLoader`?
- How is `webPageLoader` used in the application?
- What is the format of the keys and values used by `redisLoader`?
- How is the cache expiration time determined for `webPageLoader`?

Known Issues and TODOs:
There are no known issues or TODOs for this file.