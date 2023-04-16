Filepath: apps/web/app/api/journeys/route.ts
Overview: API Summary:
This file contains two API endpoints for the journeys route - a GET and a DELETE endpoint. The GET endpoint returns all journey records associated with the authenticated user, while the DELETE endpoint deletes a specific journey record associated with the authenticated user.

Import statements:
- NextResponse: a utility class for creating HTTP responses in Next.js
- getServerSession: a function from next-auth that retrieves the session object for the authenticated user
- prisma: an ORM for Node.js that provides a type-safe way of interacting with databases
- authOptions: an object containing options for next-auth authentication

Internal Functions:
- GET: retrieves all journey records associated with the authenticated user
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: a JSON response containing the journey records
- DELETE: deletes a specific journey record associated with the authenticated user
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: a JSON response containing the ID of the deleted record

External Services:
- next-auth: an authentication library for Next.js applications
- Prisma: an ORM for Node.js that provides a type-safe way of interacting with databases

API Endpoints:
GET /api/journeys
Summary: Retrieves all journey records associated with the authenticated user.
Example Usage:
```
const response = await fetch('/api/journeys');
const data = await response.json();
console.log(data);
```
Example Response:
```
[
  {
    "id": 1,
    "name": "My Journey",
    "description": "A journey I took",
    "users": [
      {
        "id": 1,
        "email": "user@example.com"
      }
    ]
  },
  {
    "id": 2,
    "name": "Another Journey",
    "description": "Another journey I took",
    "users": [
      {
        "id": 1,
        "email": "user@example.com"
      }
    ]
  }
]
```

DELETE /api/journeys?id=<journey_id>
Summary: Deletes a specific journey record associated with the authenticated user.
Example Usage:
```
const response = await fetch('/api/journeys?id=1', { method: 'DELETE' });
const data = await response.json();
console.log(data);
```
Example Response:
```
{
  "id": 1
}
```

Interaction Summary:
Client-side components can use the GET endpoint to retrieve all journey records associated with the authenticated user and display them in the UI. The DELETE endpoint can be used to delete a specific journey record associated with the authenticated user, and the UI can be updated to reflect the deleted record.

Developer Questions:
- How is the authentication handled in this file?
- What other endpoints in the application interact with the journey records?
- How can the Prisma schema be modified to add or remove fields from the journey records?

