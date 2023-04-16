Filepath: packages/ui/src/corsEdge.ts
Overview: Summary:
This file contains a multi-purpose CORS library that is based on the `cors` package in npm but only uses web APIs. It includes a type definition for StaticOrigin, an interface for CorsOptions, and several functions for handling CORS headers and requests.

Import statements:
None

Script Summary:
- Defines type StaticOrigin
- Defines interface CorsOptions
- Defines defaultOptions object
- Defines isOriginAllowed function
- Defines getOriginHeaders function
- Defines originHeadersFromReq function
- Defines getAllowedHeaders function
- Defines cors function
- Defines initCors function

Internal Functions:
- isOriginAllowed: Determines if a given origin is allowed based on a StaticOrigin value.
  Parameters: origin (string), allowed (StaticOrigin)
  Returns: boolean
- getOriginHeaders: Returns a Headers object with the appropriate Access-Control-Allow-Origin header based on the given origin and request origin.
  Parameters: reqOrigin (string), origin (StaticOrigin)
  Returns: Headers
- originHeadersFromReq: Returns a Headers object with the appropriate Access-Control-Allow-Origin header based on the given origin function and request origin.
  Parameters: req (Request), origin (StaticOrigin | OriginFn)
  Returns: Promise<Headers | undefined>
- getAllowedHeaders: Returns a Headers object with the appropriate Access-Control-Allow-Headers header based on the given allowed headers or the Access-Control-Request-Headers header in the request.
  Parameters: req (Request), allowed (string | string[] | undefined)
  Returns: Headers

External Functions:
- cors: Handles CORS headers and requests based on the given options.
  Parameters: req (Request), res (Response), options (CorsOptions)
  Returns: Promise<Response>
- initCors: Returns a function that calls cors with the given options.
  Parameters: options (CorsOptions)
  Returns: (req: Request, res: Response) => Promise<Response>

Interaction Summary:
This file provides a CORS library that can be used by other parts of the application to handle CORS headers and requests. It can be imported and used in other modules that require CORS functionality.

Developer Questions:
- What is the purpose of this file and how does it fit into the larger application?
- What are the possible values for StaticOrigin and how are they used in this file?
- What are the possible options for CorsOptions and how do they affect the behavior of cors?
- How does isOriginAllowed determine if a given origin is allowed?
- How does getOriginHeaders determine the appropriate Access-Control-Allow-Origin header?
- How does originHeadersFromReq handle the case where the origin function returns a Promise?
- How does getAllowedHeaders determine the appropriate Access-Control-Allow-Headers header?
- How does cors handle preflight requests and normal requests differently?
- How does initCors simplify the use of cors by returning a function that calls cors with the given options?

