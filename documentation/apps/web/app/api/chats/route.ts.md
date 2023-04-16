Filepath: apps/web/app/api/chats/route.ts
Overview: API Summary:
This file contains two API endpoints for managing chat records. The GET endpoint retrieves chat records for the authenticated user, while the DELETE endpoint deletes a specific chat record for the authenticated user.

Import statements:
- NextResponse: A utility function for creating HTTP responses in Next.js
- getServerSession: A function from the next-auth library for retrieving the authenticated user's session
- prisma: An ORM for interacting with the database
- authOptions: An object containing options for authenticating the user

Internal Functions:
- GET: Retrieves chat records for the authenticated user
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: A JSON response containing the chat records for the authenticated user
- DELETE: Deletes a specific chat record for the authenticated user
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: A JSON response containing the ID of the deleted chat record

External Services:
- Database: This API endpoint interacts with the database through the Prisma ORM.

API Endpoints:
GET /api/chats
Summary: Retrieves chat records for the authenticated user.
Example Usage:
```
const response = await fetch('/api/chats');
const data = await response.json();
console.log(data);
```
Example Response:
```
[
  {
    "id": 1,
    "users": [
      {
        "email": "user1@example.com"
      },
      {
        "email": "user2@example.com"
      }
    ],
    "messages": [
      {
        "id": 1,
        "text": "Hello",
        "createdAt": "2022-01-01T00:00:00.000Z",
        "user": {
          "email": "user1@example.com"
        }
      },
      {
        "id": 2,
        "text": "Hi",
        "createdAt": "2022-01-01T00:01:00.000Z",
        "user": {
          "email": "user2@example.com"
        }
      }
    ]
  },
  {
    "id": 2,
    "users": [
      {
        "email": "user1@example.com"
      },
      {
        "email": "user3@example.com"
      }
    ],
    "messages": [
      {
        "id": 3,
        "text": "Hey",
        "createdAt": "2022-01-01T00:02:00.000Z",
        "user": {
          "email": "user1@example.com"
        }
      },
      {
        "id": 4,
        "text": "What's up?",
        "createdAt": "2022-01-01T00:03:00.000Z",
        "user": {
          "email": "user3@example.com"
        }
      }
    ]
  }
]
```
DELETE /api/chats?id={id}
Summary: Deletes a specific chat record for the authenticated user.
Example Usage:
```
const response = await fetch('/api/chats?id=1', { method: 'DELETE' });
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
Client-side components can use the GET endpoint to retrieve chat records for the authenticated user and display them in the UI. The DELETE endpoint can be used to delete a specific chat record when the user selects the option to delete a chat.

Developer Questions:
- How are chat records stored in the database?
- How is authentication handled in the application?
- What other API endpoints interact with the chat records?

