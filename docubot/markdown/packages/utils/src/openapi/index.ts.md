Summary:
This file exports two constants, `openApiClient` and `openApiLoader`, which are used to interact with an OpenAPI specification document. The `openApiClient` constant is an instance of the `OpenApiClient` class, while `openApiLoader` is a Redis loader that loads OpenAPI documents from a Redis cache.

Import statements:
- `OpenApiClient` from './client': imports the `OpenApiClient` class from the `client.ts` file in the same directory.
- `getOpenApiJson` from './getOpenApiJson': imports the `getOpenApiJson` function from the `getOpenApiJson.ts` file in the same directory.
- `redisLoader` from '../redisLoader': imports the `redisLoader` function from the `redisLoader.ts` file in the parent directory.
- `OpenAPIV3` from 'openapi-types': imports the `OpenAPIV3` interface from the `openapi-types` package.

Script Summary:
This file exports two constants:
- `openApiClient`: an instance of the `OpenApiClient` class.
- `openApiLoader`: a Redis loader that loads OpenAPI documents from a Redis cache.

Internal Functions:
None.

External Functions:
None.

Interaction Summary:
This file interacts with the rest of the application by providing an interface for loading OpenAPI documents. Other parts of the application can use the `openApiClient` constant to interact with an OpenAPI server, or use the `openApiLoader` constant to load OpenAPI documents from a Redis cache.

Developer Questions:
- What is the `OpenApiClient` class and how is it used?
- How does the `openApiLoader` constant interact with Redis?
- What is the purpose of the `getOpenApiJson` function?
- How are OpenAPI documents used in the rest of the application?