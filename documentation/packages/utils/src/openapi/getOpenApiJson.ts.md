Filepath: packages/utils/src/openapi/getOpenApiJson.ts
Overview: Summary:
This file exports a function that fetches OpenAPI data from a specified URL using an external API client. It returns the OpenAPI data in JSON format.

Import statements:
- `openApiClient` from './index': an external API client for fetching OpenAPI data
- `OpenAPIV3` from 'openapi-types': a type definition for OpenAPI data in version 3 format

Script Summary:
The `getOpenApiJson` function takes in a URL as a parameter and returns the OpenAPI data in JSON format. It first logs a message to the console indicating that it is fetching OpenAPI data for the specified URL. It then calls the `fetchOpenApiData` function from the `openApiClient` module to retrieve the OpenAPI data. If the data is successfully retrieved, it is returned. If not, an error is thrown.

Internal Functions:
None

External Functions:
- `fetchOpenApiData(url: string, options: { cache?: boolean }): Promise<OpenAPIV3.Document>` from `openApiClient`: a function that fetches OpenAPI data from a specified URL and returns it in JSON format. It takes in a URL and an optional `cache` parameter, which determines whether to use cached data or not. It returns a Promise that resolves to the OpenAPI data.

Interaction Summary:
This file interacts with the `openApiClient` module to fetch OpenAPI data. It could potentially be used by other modules in the application that need to retrieve OpenAPI data.

Developer Questions:
- What is the expected format of the OpenAPI data returned by this function?
- How is the `openApiClient` module implemented and what other functions does it provide?
- What happens if the `cache` option is set to `true` when calling `fetchOpenApiData`?
- How is error handling implemented in this function and what types of errors can be thrown?

