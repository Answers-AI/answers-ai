Filepath: apps/web/app/api/messages/route.ts
Overview: API Summary:
This file contains three API endpoints for managing messages. The GET endpoint retrieves all messages for a user, the DELETE endpoint deletes a specific message, and the PATCH endpoint updates a specific message.

Import statements:
- NextResponse: a class from the next/server module that provides a way to send responses to API requests
- getServerSession: a function from the next-auth module that retrieves the user session for a given request
- prisma: an instance of the Prisma client for interacting with the database
- authOptions: an object containing options for the next-auth module

Internal Functions:
- GET: retrieves all messages for a user and returns them as a JSON response
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: a JSON response containing an array of message records
- DELETE: deletes a specific message for a user and returns the ID of the deleted message as a JSON response
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: a JSON response containing the ID of the deleted message
- PATCH: updates a specific message for a user and returns the ID of the updated message as a JSON response
  - Parameters: req (NextApiRequest), res (NextApiResponse)
  - Returns: a JSON response containing the ID of the updated message

External Services:
- Prisma: a database client for Node.js and TypeScript that provides a type-safe way to interact with databases

API Endpoints:
GET /api/messages
Summary: Retrieves all messages for a user
Example Usage:
```
const response = await fetch('/api/messages');
const data = await response.json();
console.log(data);
```
Example Response:
```
[
  {
    "id": 1,
    "userId": 1,
    "text": "Hello world!",
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2022-01-01T00:00:00.000Z",
    "updatedAt": "2022-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "userId": 1,
    "text": "How are you?",
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2022-01-01T00:00:00.000Z",
    "updatedAt": "2022-01-01T00:00:00.000Z"
  }
]
```

DELETE /api/messages?id=<messageId>
Summary: Deletes a specific message for a user
Example Usage:
```
const response = await fetch('/api/messages?id=1', { method: 'DELETE' });
const data = await response.json();
console.log(data);
```
Example Response:
```
{
  "id": 1
}
```

PATCH /api/messages
Summary: Updates a specific message for a user
Example Usage:
```
const response = await fetch('/api/messages', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 1, likes: 1, dislikes: 0 })
});
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
Client-side components can use the GET endpoint to retrieve all messages for a user and display them in a list. They can use the DELETE endpoint to remove a specific message from the list when the user clicks a delete button. They can use the PATCH endpoint to update the likes and dislikes count for a specific message when the user clicks a like or dislike button.

Developer Questions:
- What other API endpoints does this file interact with?
- How are the authOptions used to retrieve the user session?
- What fields are allowed to be updated in the PATCH endpoint?
- How are errors handled in the PATCH endpoint?

