API Summary:
This file contains code for a GET API endpoint that retrieves a list of filtered records from a database based on the provided source and user permissions. The endpoint requires authentication using NextAuth and returns a JSON response containing the filtered records.

Import statements:
- `NextResponse` is imported from the 'next/server' module and is used to construct the response sent back to the client.
- `getServerSession` is imported from the 'next-auth' module and is used to retrieve the authenticated session.
- `prisma` is imported from the '@db/client' module and is used to interact with the database.
- `authOptions` is imported from the '@ui/authOptions' module and contains the configuration options for authentication.
- `respond401` is imported from the '@utils/auth/respond401' module and is used to handle unauthorized requests.

Internal Functions:
- `GET`: This is the main function that handles the GET request. It takes in the request object and an object containing the route parameters. It first retrieves the authenticated session using `getServerSession` and extracts the user ID. If the user ID is not available, it returns a 401 unauthorized response using `respond401`. If the source parameter is not provided, it returns a 422 unprocessable entity response with an error message. Otherwise, it queries the database using `prisma.document.findMany` to retrieve the filtered records based on the source and user permissions. It then maps the retrieved records to a new array containing only the url, title, and repo properties. Finally, it constructs a JSON response containing the sources array and returns it using `NextResponse.json`.

External Services:
- NextAuth: This module is used for authentication and provides the `getServerSession` function to retrieve the authenticated session.

API Endpoints:
GET /api/route
Summary: Retrieves a list of filtered records based on the provided source and user permissions.
Example Usage:
```
curl -X GET \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "source": "example"
}'
```
Example Response:
```json
{
  "sources": [
    {
      "url": "https://example.com",
      "title": "Example",
      "repo": "Example"
    }
  ]
}
```

Interaction Summary:
1. The client sends a GET request to the /api/route endpoint.
2. The server retrieves the authenticated session using NextAuth.
3. The server extracts the user ID from the session.
4. If the user ID is not available, the server returns a 401 unauthorized response.
5. If the source parameter is not provided, the server returns a 422 unprocessable entity response with an error message.
6. The server queries the database to retrieve the filtered records based on the source and user permissions.
7. The server maps the retrieved records to a new array containing only the url, title, and repo properties.
8. The server constructs a JSON response containing the sources array and returns it to the client.

Developer Questions:
1. How is authentication handled in this code?
2. What are the possible error responses that can be returned by this endpoint?
3. How can I modify the code to increase the number of records returned?
4. Are there any known performance issues with the database query in this code?

TODO items:
- None

Known issues:
- None