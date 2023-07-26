Summary:
This code is a TypeScript module that defines a class called "ConfluenceClient". The purpose of this class is to provide methods for interacting with the Confluence API, specifically for retrieving Confluence pages and spaces. The class uses the axios library for making HTTP requests and the redis library for caching data. The class also includes methods for handling rate limits and retrieving the cloud ID associated with the Confluence instance.

Import statements:
- `import axios, { AxiosResponse } from 'axios';`: This imports the axios library for making HTTP requests. The `AxiosResponse` type is also imported for type annotations.
- `import { ConfluencePage, ConfluenceSpace } from 'types';`: This imports the `ConfluencePage` and `ConfluenceSpace` types from a module called 'types'.
- `import redisLoader from '../redisLoader';`: This imports the `redisLoader` function from a module located in the '../redisLoader' file.
- `import { redis } from '../redis/client';`: This imports the `redis` object from a module located in the '../redis/client' file.

Script Summary:
The script defines a class called `ConfluenceClient` that provides methods for interacting with the Confluence API. The class has properties for storing the access token, cloud ID, headers, and cache expiration time. It also has two instances of the `redisLoader` function for caching Confluence pages. The class constructor initializes the properties and retrieves the cloud ID. The class includes methods for handling rate limits, retrieving app data, retrieving spaces, and fetching Confluence data. It also includes methods for getting a specific Confluence page and retrieving all Confluence pages.

Internal Functions:
- `handleRateLimit(response: AxiosResponse)`: This function takes an `AxiosResponse` object as a parameter and waits for the number of seconds specified in the 'retry-after' header before resolving.
- `getAppData()`: This function makes a GET request to the 'https://api.atlassian.com/oauth/token/accessible-resources' endpoint to retrieve app data and returns the response data.
- `getCloudId()`: This function retrieves the cloud ID associated with the Confluence instance by filtering the app data based on the 'confluence' scope and returning the ID.
- `getSpaces()`: This function makes a GET request to the Confluence API to retrieve a list of spaces and returns the response data.
- `fetchConfluenceData(endpoint: string, { cache = true }: RequestOptions = {})`: This function makes a GET request to the specified endpoint and returns the response data. It also supports caching the data using Redis.
- `getConfluencePage({ pageId }: { pageId: string })`: This function retrieves a specific Confluence page by making a request to the Confluence API with the page ID. It returns the page data if it exists, otherwise it throws an error.
- `getConfluencePages({ limit = 250, cursor = '' }: { limit?: number; cursor?: string } = {})`: This function retrieves all Confluence pages by making multiple requests to the Confluence API with pagination. It returns an array of page data.

External Functions:
- None

Interaction Summary:
This script can be used as a module in a larger software application to interact with the Confluence API. It provides methods for retrieving Confluence pages and spaces, as well as handling rate limits and caching data. Other parts of the application can create an instance of the `ConfluenceClient` class and call its methods to retrieve Confluence data.

Developer Questions:
- How do I retrieve Confluence pages using this module?
- How do I retrieve Confluence spaces using this module?
- How do I handle rate limits when making requests to the Confluence API?
- How do I cache Confluence data using Redis?
- How do I retrieve the cloud ID associated with the Confluence instance?