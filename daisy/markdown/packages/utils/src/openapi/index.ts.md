Summary:
This code is a module that handles the loading and caching of OpenAPI JSON documents. It uses a Redis cache to store the JSON documents and provides functions to retrieve and update the cache.

Import statements:
- `OpenApiClient` is imported from the `./client` file. It is a class that provides methods to interact with the OpenAPI server.
- `getOpenApiJson` is imported from the `./getOpenApiJson` file. It is a function that retrieves the OpenAPI JSON document from a given URL.
- `redisLoader` is imported from the `../redisLoader` file. It is a function that handles the loading and caching of data using Redis.
- `OpenAPIV3` is imported from the `openapi-types` package. It is a type definition for OpenAPI version 3 documents.

Script Summary:
- An instance of the `OpenApiClient` class is created and exported as `openApiClient`.
- A Redis loader is created using the `redisLoader` function and exported as `openApiLoader`. The loader is configured to use a key prefix of 'web:page', the Redis configuration from the `REDIS_URL` environment variable, and to disable caching.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
- This module can be used by other parts of the application to retrieve and update OpenAPI JSON documents. The `openApiClient` instance can be used to make requests to the OpenAPI server, and the `openApiLoader` can be used to load and cache the JSON documents.

Developer Questions:
- How can I use the `openApiClient` instance to make requests to the OpenAPI server?
- How can I use the `openApiLoader` to load and cache OpenAPI JSON documents?
- How can I configure the Redis cache for the `openApiLoader`?
- How can I disable caching for the `openApiLoader`?
- How can I change the key prefix used by the `openApiLoader`?
- How can I change the Redis configuration for the `openApiLoader`?