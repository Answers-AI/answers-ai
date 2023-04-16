Filepath: packages/utils/src/ingest/openapi.ts
Overview: Summary:
This file contains code related to ingesting OpenAPI specifications from a third-party API and processing them for use in the larger application. It includes functions for retrieving OpenAPI specifications from a list of domains, processing those specifications into Pinecone vectors, and sending those vectors to the Inngest API.

Import statements:
- axios: a Promise-based HTTP client for the browser and node.js
- URL: a built-in module for working with URLs
- inngest: a custom client for sending data to the Inngest API
- openApiLoader: a custom module for loading OpenAPI specifications
- EventVersionHandler: a custom type for defining event handlers
- chunkArray: a custom utility function for chunking arrays

Script Summary:
- Defines an interface for options when retrieving OpenAPI specifications from a list of domains
- Defines a function for checking if two URLs have matching domains
- Defines a function for retrieving x-origin URLs from an OpenAPI specification
- Defines an event handler for syncing with the OpenAPI Guru list and retrieving OpenAPI specifications
- Defines a function for prefixing headers in OpenAPI specification markdown
- Defines an event handler for syncing with a list of domains and retrieving OpenAPI specifications
- Defines an event handler for processing OpenAPI specification URLs into Pinecone vectors and sending them to the Inngest API

Internal Functions:
- isDomainMatch(url1: string | undefined, url2: string | undefined): boolean
  - Description: Checks if two URLs have matching domains
  - Parameters:
    - url1: a string representing the first URL
    - url2: a string representing the second URL
  - Returns: a boolean indicating whether the two URLs have matching domains
- getXOriginUrls(json: OpenApiProvider, options: GuruListOptions = {}): string[]
  - Description: Retrieves x-origin URLs from an OpenAPI specification
  - Parameters:
    - json: an OpenAPIProvider object representing the OpenAPI specification
    - options: an optional object containing options for retrieving the x-origin URLs
  - Returns: an array of strings representing the x-origin URLs
- prefixHeaders(markdown: string): string
  - Description: Prefixes headers in OpenAPI specification markdown
  - Parameters:
    - markdown: a string representing the OpenAPI specification markdown
  - Returns: a string representing the OpenAPI specification markdown with prefixed headers

External Functions:
- processOpenApiGuruList: EventVersionHandler<{ format?: string[]; version?: string }>
  - Description: Event handler for syncing with the OpenAPI Guru list and retrieving OpenAPI specifications
  - Parameters:
    - event: an object representing the event being handled
  - Returns: none
- processOpenApiDomainList: EventVersionHandler<{ format?: string; version?: string; urls: string[] }>
  - Description: Event handler for syncing with a list of domains and retrieving OpenAPI specifications
  - Parameters:
    - event: an object representing the event being handled
  - Returns: none
- processOpenApiUrl: EventVersionHandler<{ urls: string[] }>
  - Description: Event handler for processing OpenAPI specification URLs into Pinecone vectors and sending them to the Inngest API
  - Parameters:
    - event: an object representing the event being handled
  - Returns: none

Interaction Summary:
This file interacts with the Inngest API to send processed OpenAPI specifications as Pinecone vectors. It also interacts with a third-party API (OpenAPI Guru) to retrieve OpenAPI specifications.

Developer Questions:
- What is the structure of the OpenAPIProvider object?
- What is the purpose of the OpenApiLoader module?
- How are Pinecone vectors generated from OpenAPI specifications?
- What is the purpose of the chunkArray utility function?
- How are events handled in this file?

