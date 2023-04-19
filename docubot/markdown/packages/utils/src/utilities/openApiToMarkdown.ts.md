Summary:
This file is a utility script that converts OpenAPI specifications (both version 2.0 and 3.0) into Markdown format. It contains several internal functions to process the OpenAPI document, create tables for paths and references, and output the final Markdown content.

Import statements:
- `fs` from 'fs' (file system module for reading files)
- `YAML` from 'yaml' (YAML parsing library)
- `OpenAPIV3` from 'openapi-types' (OpenAPI 3.0 types)
- `swagger2_0ToMarkdown` from './swagger2_0ToMarkdown' (utility to convert Swagger 2.0 to Markdown)

Script Summary:
The script exports a single function `openApiToMarkdown` that takes an OpenAPI specification object and returns a Markdown string.

Internal Functions:
- `markdownText(text: string)`: Converts a given text into Markdown format.
- `createApiDocument(document: OpenAPIV3.Document)`: Creates an API document object with path methods and references.
- `convertPath(path: string)`: Converts a given path into a URL-friendly format.
- `outputPathTable(apiDocument: ApiDocument)`: Outputs the path table in Markdown format.
- `outputReferenceTable(apiDocument: ApiDocument)`: Outputs the reference table in Markdown format.
- `getRefName(refObjecgt: unknown | OpenAPIV3.ReferenceObject)`: Returns the reference name of a given object.
- `getApiObject<T = unknown | OpenAPIV3.ReferenceObject>(apiDocument: ApiDocument, object: OpenAPIV3.ReferenceObject | unknown, refs?: Set<string>)`: Returns the API object of a given reference object.
- `outputParamSchemas(apiDocument: ApiDocument, parameters: OpenAPIV3.ParameterObject[])`: Outputs the parameter schemas in Markdown format.
- `outputSchemas(apiDocument: ApiDocument, schemas: unknown)`: Outputs the schemas in Markdown format.
- `outputObject(apiDocument: ApiDocument, name: string | undefined, schemas: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject, required?: boolean, refs?: Set<string>, level?: number)`: Outputs the object in Markdown format.
- `outputParameters(apiDocument: ApiDocument, parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[])`: Outputs the parameters in Markdown format.
- `outputReferences(apiDocument: ApiDocument)`: Outputs the references in Markdown format.
- `outputRequestBody(apiDocument: ApiDocument, requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined)`: Outputs the request body in Markdown format.
- `outputExamples(apiDocument: ApiDocument, examples: OpenAPIV3.MediaTypeObject['examples'])`: Outputs the examples in Markdown format.
- `outputResponses(apiDocument: ApiDocument, responses: OpenAPIV3.ResponsesObject | undefined)`: Outputs the responses in Markdown format.
- `outputPathDatail(apiDocument: ApiDocument)`: Outputs the path details in Markdown format.

External Functions:
- `openApiToMarkdown(openApiSpec: any)`: Takes an OpenAPI specification object and returns a Markdown string.

Interaction Summary:
This utility script can be used by other parts of the application that require converting OpenAPI specifications into Markdown format. It can be imported and called with the OpenAPI specification object as an argument.

Developer Questions:
1. How can I customize the output Markdown format?
2. How do I handle errors when processing the OpenAPI document?
3. Are there any limitations or edge cases that this utility script does not handle?
4. How can I extend this utility to support other output formats besides Markdown?