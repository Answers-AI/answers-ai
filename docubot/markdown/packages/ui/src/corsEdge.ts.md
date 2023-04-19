Summary:
This file contains a CORS (Cross-Origin Resource Sharing) library that is used to handle cross-origin requests in web applications. It defines a set of functions and types that can be used to configure CORS policies for an application.

Import statements:
None

Script Summary:
The script defines a set of functions and types that can be used to configure CORS policies for an application. It exports a default function `cors` that takes in a `Request`, `Response`, and `CorsOptions` object and returns a `Response` object with the appropriate CORS headers. It also exports an `initCors` function that returns a middleware function that can be used with web frameworks like Express.

Internal Functions:
- `isOriginAllowed(origin: string, allowed: StaticOrigin): boolean`: This function takes in an origin string and a `StaticOrigin` object and returns a boolean indicating whether the origin is allowed based on the `StaticOrigin` object.
- `getOriginHeaders(reqOrigin: string | undefined, origin: StaticOrigin)`: This function takes in a request origin and a `StaticOrigin` object and returns a `Headers` object with the appropriate CORS headers based on the `StaticOrigin` object.
- `originHeadersFromReq(req: Request, origin: StaticOrigin | OriginFn)`: This function takes in a `Request` object and a `StaticOrigin` or `OriginFn` object and returns a `Headers` object with the appropriate CORS headers based on the `StaticOrigin` or `OriginFn` object.
- `getAllowedHeaders(req: Request, allowed?: string | string[])`: This function takes in a `Request` object and an optional `allowed` header string or array and returns a `Headers` object with the appropriate CORS headers based on the `allowed` header.

External Functions:
- `cors(req: Request, res: Response, options?: CorsOptions)`: This function takes in a `Request`, `Response`, and `CorsOptions` object and returns a `Response` object with the appropriate CORS headers.
- `initCors(options?: CorsOptions)`: This function returns a middleware function that can be used with web frameworks like Express.

Interaction Summary:
This file is used to handle cross-origin requests in web applications. It can be used with web frameworks like Express to configure CORS policies for an application.

Developer Questions:
- What are the different types of `StaticOrigin` objects that can be used to configure CORS policies?
- How does the `cors` function handle preflight requests?
- What is the purpose of the `initCors` function and how is it used with web frameworks like Express?