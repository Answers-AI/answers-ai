{{prompt}}
This technical document describes the code in the provided file and how it works within the context of a larger application.

{{fileContents}}
The file contains three functions that handle HTTP requests for the API endpoints. The functions are GET, DELETE, and PATCH. The functions use the Next.js framework to handle the requests and responses.

API Summary:
The API provides endpoints for retrieving, deleting, and updating prompt records. The endpoints require authentication and use a database to store and retrieve data.

Import statements:
The file imports the following modules:
- NextResponse from 'next/server': This module provides a set of response classes for the Next.js framework.
- getServerSession from 'next-auth': This module provides a function for retrieving the user session from the server.
- prisma from 'db/dist': This module provides access to the Prisma ORM for interacting with the database.
- authOptions from '@ui/authOptions': This module provides options for configuring the authentication system.

Internal Functions:
The file contains three functions:
- GET: This function retrieves prompt records from the database for the authenticated user and returns them as a JSON response.
- DELETE: This function deletes a prompt record from the database for the authenticated user and returns the ID of the deleted record as a JSON response.
- PATCH: This function updates a prompt record in the database for the authenticated user and returns the ID of the updated record as a JSON response.

External Services:
The file uses the following external services:
- Prisma ORM: This service provides an interface for interacting with the database.
- Next.js framework: This service provides a framework for handling HTTP requests and responses.

API Endpoints:
The file provides the following API endpoints:

GET /api/prompt
Summary: Retrieves prompt records from the database for the authenticated user and returns them as a JSON response.
Example Usage:
```
curl -X GET \
  http://localhost:3000/api/prompt \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
```
Example Response:
```json
[
  {
    "id": 1,
    "text": "What is your favorite color?",
    "likes": 10,
    "dislikes": 2,
    "users": [
      {
        "id": 1,
        "email": "user@example.com"
      }
    ]
  },
  {
    "id": 2,
    "text": "What is your favorite food?",
    "likes": 5,
    "dislikes": 1,
    "users": [
      {
        "id": 1,
        "email": "user@example.com"
      }
    ]
  }
]
```

DELETE /api/prompt?id={id}
Summary: Deletes a prompt record from the database for the authenticated user and returns the ID of the deleted record as a JSON response.
Example Usage:
```
curl -X DELETE \
  http://localhost:3000/api/prompt?id=1 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
```
Example Response:
```json
{
  "id": 1
}
```

PATCH /api/prompt
Summary: Updates a prompt record in the database for the authenticated user and returns the ID of the updated record as a JSON response.
Example Usage:
```
curl -X PATCH \
  http://localhost:3000/api/prompt \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": 1,
  "likes": 11,
  "dislikes": 2
}'
```
Example Response:
```json
{
  "id": 1
}
```

Interaction Summary:
The file interacts with the database to retrieve, delete, and update prompt records for the authenticated user. The file also uses the Next.js framework to handle HTTP requests and responses.

Developer Questions:
Developers working with this component may have the following questions when debugging:
- How do I configure the authentication system?
- How do I add additional fields to the prompt records?
- How do I handle errors when interacting with the database?

Known Issues and TODOs:
The file contains a TODO comment to validate which fields are allowed to be updated in the PATCH function. There are no known issues with the file.