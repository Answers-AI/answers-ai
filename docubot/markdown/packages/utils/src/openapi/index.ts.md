Summary:
This file exports two constants, `openApiClient` and `openApiLoader`, which are instances of `OpenApiClient` and `redisLoader` respectively. `OpenApiClient` is imported from another file, `client.js`, while `redisLoader` is imported from `redisLoader.js`. The `getOpenApiJson` function is also imported from `getOpenApiJson.js`.

Import statements:
- `OpenApiClient` is imported from `client.js`.
- `getOpenApiJson` is imported from `getOpenApiJson.js`.
- `redisLoader` is imported from `redisLoader.js`.
- `OpenAPIV3` is imported from `openapi-types`.

Script Summary:
This file exports two constants, `openApiClient` and `openApiLoader`. `openApiClient` is an instance of `OpenApiClient`, while `openApiLoader` is an instance of `redisLoader`. `redisLoader` is a function that takes a configuration object and returns a function that can load data from Redis.

Internal Functions:
This file does not contain any internal functions.

External Functions:
This file does not contain any external functions.

Interaction Summary:
This file interacts with the rest of the application by exporting two constants that can be used by other modules. `openApiClient` can be used to make requests to an OpenAPI server, while `openApiLoader` can be used to load OpenAPI documents from Redis.

Developer Questions:
- What is the purpose of `openApiClient` and `openApiLoader`?
- How does `redisLoader` work?
- What is the `getOpenApiJson` function and where is it defined?

Known Issues and TODOs:
There are no known issues or TODOs for this file.