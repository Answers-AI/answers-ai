Summary:
This code is a multi-purpose CORS (Cross-Origin Resource Sharing) library. It provides functionality to handle CORS headers and allow cross-origin requests in a web application. The code defines various functions and interfaces to configure and handle CORS headers. It also exports a default function `cors` and a helper function `initCors` to enable CORS in a web application.

Import statements:
- No external dependencies are imported in this code.

Script Summary:
The script defines several types and interfaces related to CORS configuration. It also defines functions to handle CORS headers and enable CORS in a web application. The `cors` function is the main function that handles CORS headers based on the provided options. The `initCors` function is a helper function that returns a middleware function to enable CORS in a web application.

Internal Functions:
1. `isOriginAllowed(origin: string, allowed: StaticOrigin): boolean`: This function checks if a given origin is allowed based on the provided allowed origins. It recursively checks if the origin matches any of the allowed origins, which can be a boolean, string, regular expression, or an array of these types. It returns a boolean indicating whether the origin is allowed.

2. `getOriginHeaders(reqOrigin: string | undefined, origin: StaticOrigin): Headers`: This function generates the appropriate CORS headers based on the provided origin. It creates a new `Headers` object and sets the `Access-Control-Allow-Origin` header based on the origin. If the origin is "*", it allows any origin. If the origin is a string, it sets the header to that string. If the origin is a boolean or regular expression, it checks if the request origin matches the allowed origin and sets the header accordingly. It also appends the "Vary" header to indicate that the response varies based on the origin. It returns the generated headers.

3. `originHeadersFromReq(req: Request, origin: StaticOrigin | OriginFn): Promise<Headers | undefined>`: This async function generates the appropriate CORS headers based on the request origin and the provided origin configuration. It first retrieves the request origin from the `Origin` header. If the provided origin is a function, it calls the function with the request origin and the request object to get the origin configuration. If the origin configuration is falsy, it returns undefined. Otherwise, it calls the `getOriginHeaders` function with the request origin and the origin configuration to get the headers. It returns a promise that resolves to the generated headers or undefined.

4. `getAllowedHeaders(req: Request, allowed?: string | string[]): Headers`: This function generates the appropriate CORS headers for the allowed headers based on the request and the provided allowed headers. It creates a new `Headers` object and sets the `Access-Control-Allow-Headers` header based on the allowed headers. If the allowed headers are not provided, it retrieves the headers from the `Access-Control-Request-Headers` header of the request. If the allowed headers are an array, it joins them into a string. It also appends the "Vary" header to indicate that the response varies based on the allowed headers. It returns the generated headers.

External Functions:
1. `cors(req: Request, res: Response, options?: CorsOptions): Promise<Response>`: This is the main function that handles CORS headers. It takes in a request object, a response object, and an optional `CorsOptions` object. It merges the provided options with the default options. It then calls the `originHeadersFromReq` function with the request and the origin configuration from the options to get the CORS headers based on the request origin. If there are no CORS headers (i.e., the origin is not allowed), it returns the original response. Otherwise, it merges the generated headers with the response headers. If the `credentials` option is true, it sets the `Access-Control-Allow-Credentials` header to "true". If the `exposedHeaders` option is provided, it sets the `Access-Control-Expose-Headers` header based on the provided value. If the request method is "OPTIONS" (preflight request), it sets the `Access-Control-Allow-Methods` header based on the `methods` option. It also calls the `getAllowedHeaders` function to get the allowed headers and merges them with the response headers. If the `maxAge` option is provided, it sets the `Access-Control-Max-Age` header. If the `preflightContinue` option is true, it returns the modified response. Otherwise, it sets the `Content-Length` header to "0" and returns a new empty response with the status code specified in the `optionsSuccessStatus` option and the modified headers.

2. `initCors(options?: CorsOptions): (req: Request, res: Response) => Promise<Response>`: This function returns a middleware function that enables CORS in a web application. It takes in an optional `CorsOptions` object and returns a function that takes in a request object and a response object. The returned function calls the `cors` function with the request, response, and the provided options to handle CORS headers.

Interaction Summary:
This code can be used as a middleware in a web application to handle CORS headers and enable cross-origin requests. It can be integrated into the application by calling the `initCors` function with the desired CORS options and passing the returned middleware function to the appropriate middleware handler.

Developer Questions:
1. How can I configure the allowed origins for CORS?
   - The `CorsOptions` interface has an `origin` property that can be set to a static origin value (boolean, string, regular expression, or an array of these types) or a function that returns a static origin value or a promise that resolves to a static origin value.

2. How can I configure the allowed methods for CORS?
   - The `CorsOptions` interface has a `methods` property that can be set to a string or an array of strings representing the allowed HTTP methods.

3. How can I configure the allowed headers for CORS?
   - The `CorsOptions` interface has an `allowedHeaders` property that can be set to a string or an array of strings representing the allowed headers.

4. How can I configure the exposed headers for CORS?
   - The `CorsOptions` interface has an `exposedHeaders` property that can be set to a string or an array of strings representing the headers that are exposed to the client.

5. How can I enable credentials for CORS?
   - The `CorsOptions` interface has a `credentials` property that can be set to `true` to allow credentials (cookies, HTTP authentication, etc.) to be included in cross-origin requests.

Known Issues or Bugs:
- No known issues or bugs.

Todo Items:
- No todo items.