Filepath: packages/utils/src/utilities/swagger2_0ToMarkdown.ts
Overview: Summary:
This file contains a function that converts Swagger 2.0 specifications to OpenAPI 3.0 specifications and returns the converted specifications as a string.

Import statements:
The file imports two modules: 'openapi-types' and 'swagger2openapi'.

Script Summary:
The script exports a single function called 'swagger2_0ToMarkdown'. This function takes in an OpenAPIV2.Document object and returns a string that contains the converted OpenAPI 3.0 specifications.

Internal Functions:
There are no internal functions in this file.

External Functions:
swagger2_0ToMarkdown:
This function takes in an OpenAPIV2.Document object and returns a string that contains the converted OpenAPI 3.0 specifications. The function uses the 'swagger2openapi' module to convert the Swagger 2.0 specifications to OpenAPI 3.0 specifications.

Interaction Summary:
This file could potentially interact with other parts of the application that use Swagger 2.0 specifications. The converted OpenAPI 3.0 specifications could be used by other parts of the application to generate documentation or to interact with APIs that require OpenAPI 3.0 specifications.

Developer Questions:
- What is the expected format of the OpenAPIV2.Document object that is passed into the function?
- What are the possible errors that could be thrown by the 'swagger2openapi' module and how should they be handled?
- How is the converted OpenAPI 3.0 specifications string used by other parts of the application?

