API Summary:
This file contains code for a POST API endpoint that creates a new "sidekick" object in the application. The endpoint requires authentication using NextAuth and expects the request body to contain data for the sidekick. The code validates the user's session, retrieves the user ID from the session, normalizes the sidekick data, and then creates a new sidekick object in the database using Prisma. The created sidekick object is returned as the response.

Import statements:
- `NextResponse` is imported from the 'next/server' module to handle the response.
- `getServerSession` is imported from 'next-auth' to retrieve the user session.
- `prisma` is imported from '@db/client' to interact with the database.
- `authOptions` is imported from '@ui/authOptions' to configure the authentication options.
- `Sidekick` is imported from 'types' to define the type of the sidekick object.
- `respond401` is imported from '@utils/auth/respond401' to handle unauthorized requests.
- `normalizeSidekickForUpdate` is imported from 'utilities/normalizeSidekick' to normalize the sidekick data.

Internal Functions:
- `POST`: This is the main function that handles the POST request. It takes in the request (`req`) and response (`res`) objects. It first retrieves the user session using `getServerSession` and checks if the session contains a valid user ID. If not, it calls `respond401` to return a 401 unauthorized response. If the user ID is present, it retrieves the sidekick data from the request body and normalizes it using `normalizeSidekickForUpdate`. Then, it tries to create a new sidekick object in the database using `prisma.sidekick.create`. If an error occurs during the creation, it logs the error and returns a 422 unprocessable entity response. Otherwise, it returns the created sidekick object as the response.

External Services:
- NextAuth: This service is used for authentication and session management.
- Prisma: This service is used to interact with the database and perform CRUD operations on the sidekick objects.

API Endpoints:
POST /api/sidekick
Summary: Creates a new sidekick object.
Example Usage:
```
curl -X POST \
  http://localhost:3000/api/sidekick \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "name": "John Doe",
  "age": 25,
  "superpower": "Invisibility"
}'
```

Example Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "age": 25,
  "superpower": "Invisibility",
  "favoritedBy": {
    "id": 123,
    "name": "Alice"
  },
  "createdByUser": {
    "id": 123,
    "name": "Alice"
  }
}
```

Interaction Summary:
1. The client sends a POST request to the `/api/sidekick` endpoint with the sidekick data in the request body.
2. The server validates the user's session and retrieves the user ID.
3. The server normalizes the sidekick data.
4. The server creates a new sidekick object in the database, connecting it to the user who created it.
5. The server returns the created sidekick object as the response.

Developer Questions:
1. What are the required fields for the sidekick object?
2. How does the normalization process work for the sidekick data?
3. Are there any additional validations or checks performed on the sidekick data before creating it in the database?

TODO Items:
- None

Known Issues:
- None