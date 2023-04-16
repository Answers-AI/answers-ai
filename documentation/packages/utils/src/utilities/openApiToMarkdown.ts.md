Filepath: packages/utils/src/utilities/openApiToMarkdown.ts
Overview: Summary:
This file is a utility script that converts OpenAPI (Swagger) specifications into Markdown format. It handles both OpenAPI 2.0 (Swagger) and OpenAPI 3.0 specifications. The script provides functions to create an API document, output path details, output reference tables, and output schemas, among others.

Import statements:
- 'fs' from 'fs' module: Provides file system operations.
- 'YAML' from 'yaml' module: Handles YAML parsing and stringifying.
- 'OpenAPIV3' from 'openapi-types': Provides types for OpenAPI 3.0 specifications.
- 'swagger2_0ToMarkdown' from './swagger2_0ToMarkdown': Converts Swagger 2.0 specifications to OpenAPI 3.0.

Script Summary:
The script exports a single function, `openApiToMarkdown`, which takes an OpenAPI specification object as input and returns a Markdown-formatted string representing the API documentation.

Internal Functions:
- createApiDocument(document: OpenAPIV3.Document): Creates an API document object with path methods and references.
- convertPath(path: string): Converts a path string into a URL-friendly format.
- outputPathTable(apiDocument: ApiDocument): Generates a Markdown-formatted path table.
- outputReferenceTable(apiDocument: ApiDocument): Generates a Markdown-formatted reference table.
- getRefName(refObjecgt: unknown | OpenAPIV3.ReferenceObject): Retrieves the reference name of an object.
- getApiObject(apiDocument: ApiDocument, object: OpenAPIV3.ReferenceObject | unknown): Retrieves an API object from a reference object.
- outputParamSchemas(apiDocument: ApiDocument, parameters: OpenAPIV3.ParameterObject[]): Outputs parameter schemas in Markdown format.
- outputSchemas(apiDocument: ApiDocument, schemas: unknown): Outputs schemas in Markdown format.
- outputObject(apiDocument: ApiDocument, name: string | undefined, schemas: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject, required?: boolean, refs?: Set<string>, level?: number): Outputs an object in Markdown format.
- outputParameters(apiDocument: ApiDocument, parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]): Outputs parameters in Markdown format.
- outputReferences(apiDocument: ApiDocument): Outputs references in Markdown format.
- outputRequestBody(apiDocument: ApiDocument, requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined): Outputs request body in Markdown format.
- outputExamples(apiDocument: ApiDocument, examples: OpenAPIV3.MediaTypeObject['examples']): Outputs examples in Markdown format.
- outputResponses(apiDocument: ApiDocument, responses: OpenAPIV3.ResponsesObject | undefined): Outputs responses in Markdown format.
- outputPathDatail(apiDocument: ApiDocument): Outputs path details in Markdown format.

External Functions:
- openApiToMarkdown(openApiSpec: any): Takes an OpenAPI specification object as input and returns a Markdown-formatted string representing the API documentation.

Interaction Summary:
This file can be used as a standalone utility or imported into other parts of the application to generate Markdown documentation from OpenAPI specifications. It does not directly interact with other components of the application.

Developer Questions:
1. How do I use this utility to convert an OpenAPI specification file to Markdown format?
2. What are the limitations of this utility in terms of handling complex OpenAPI specifications?
3. Can this utility handle custom extensions in OpenAPI specifications?
4. How can I extend this utility to support additional Markdown formatting options?

