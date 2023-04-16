Filepath: packages/utils/src/openapi/client.ts
Overview: Summary:
This file contains a class called OpenApiClient which is responsible for fetching data from an OpenAPI endpoint. It also has a function called blobToString which converts a Blob object to a string.

Import statements:
The file imports axios and Redis libraries.

Script Summary:
The file exports a class called OpenApiClient which has a constructor that initializes Redis, sets default headers and response type, and a cache expiration time. The class has a function called fetchOpenApiData which fetches data from an OpenAPI endpoint and caches it if required.

Internal Functions:
- blobToString: This function takes a Blob object as input and returns a Promise that resolves to a string.

External Functions:
- fetchOpenApiData: This function takes a URL and an optional cache parameter as input and returns a Promise that resolves to the fetched data. If the cache parameter is true, it checks if the data is already cached in Redis and returns the cached data if available. If not, it fetches the data from the OpenAPI endpoint, sets the appropriate headers and response type, and caches the data in Redis if required.

Interaction Summary:
This file interacts with Redis to cache data and with the OpenAPI endpoint to fetch data. It could be used by other components of the application to fetch data from an OpenAPI endpoint.

Developer Questions:
- What is the purpose of the cacheExpireTime parameter in the constructor?
- What is the purpose of the responseType property?
- What is the purpose of the headers property?
- How does the fetchOpenApiData function handle different content types?
- How does the fetchOpenApiData function handle HTTP errors?

