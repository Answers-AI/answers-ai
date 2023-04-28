Summary:
This file exports a function that converts a Swagger 2.0 specification to OpenAPI 3.0 specification using the `swagger2openapi` library.

Import statements:
- `OpenAPIV2` from `openapi-types`: This is a type definition for the OpenAPI 2.0 specification.
- `swagger2openapi` from `swagger2openapi`: This is a library that converts Swagger 2.0 specifications to OpenAPI 3.0 specifications.

Script Summary:
The script exports a function named `swagger2_0ToMarkdown` that takes in an OpenAPIV2 document and returns a string that represents the OpenAPI 3.0 specification. The function uses the `swagger2openapi` library to convert the Swagger 2.0 specification to OpenAPI 3.0 specification.

Internal Functions:
- `swagger2_0ToMarkdown`: This is the main function that takes in an OpenAPIV2 document and returns a string that represents the OpenAPI 3.0 specification.

External Functions:
- None

Interaction Summary:
This file is a utility function that could be used by other parts of the application to convert Swagger 2.0 specifications to OpenAPI 3.0 specifications.

Developer Questions:
- What happens if the input is not a valid OpenAPIV2 document?
- What are the options available for the `swagger2openapi` library?
- How can we test this function?

Known Issues and TODOs:
- None