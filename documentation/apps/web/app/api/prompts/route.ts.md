Filepath: apps/web/app/api/prompts/route.ts
Overview: API Summary:
This file contains three API endpoints for managing prompts. The GET endpoint retrieves all prompts associated with the authenticated user. The DELETE endpoint deletes a prompt with a given ID if it belongs to the authenticated user. The PATCH endpoint updates a prompt with a given ID with new likes and dislikes.

Import statements:
- NextResponse and getServerSession are imported from the Next.js framework.
- prisma is imported from the db/dist module.
- authOptions is imported from the @ui/authOptions module.

Internal Functions:
- GET: This function retrieves all prompts associated with the authenticated user. It uses the getServerSession function to retrieve the user's email address from the session. It then uses the Prisma ORM to find all prompts that have at least one user with the same email address. It returns a JSON response with the retrieved prompts.
- DELETE: This function deletes a prompt with a given ID if it belongs to the authenticated user. It uses the getServerSession function to retrieve the user's email address from the session. It then parses the ID from the request URL's search parameters. It uses the Prisma ORM to find the prompt with the given ID and the authenticated user's email address. If the prompt is found, it is deleted and a JSON response with the deleted prompt's ID is returned.
- PATCH: This function updates a prompt with a given ID with new likes and dislikes. It uses the getServerSession function to retrieve the user's email address from the session. It then parses the ID, likes, and dislikes from the request body. It uses the Prisma ORM to update the prompt with the given ID with the new likes and dislikes. If the update is successful, a JSON response with the updated prompt's ID is returned.

External Services:
This file uses the Prisma ORM to interact with a database.

API Endpoints:
- GET /api/prompts
Summary: Retrieves all prompts associated with the authenticated user.
Example Usage:
```
const response = await fetch('/api/prompts');
const data = await response.json();
console.log(data);
```
Example Response:
```
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
Interaction Summary:
A client-side component could use the GET endpoint to retrieve all prompts associated with the authenticated user and display them in a list.

- DELETE /api/prompts?id={id}
Summary: Deletes the prompt with the given ID if it belongs to the authenticated user.
Example Usage:
```
const response = await fetch('/api/prompts?id=1', { method: 'DELETE' });
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
A client-side component could use the DELETE endpoint to delete a prompt when the user clicks a delete button.

- PATCH /api/prompts
Summary: Updates the prompt with the given ID with new likes and dislikes.
Example Usage:
```
const response = await fetch('/api/prompts', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: 1, likes: 11, dislikes: 3 })
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
A client-side component could use the PATCH endpoint to update a prompt's likes and dislikes when the user clicks a like or dislike button.

Developer Questions:
- What database schema is being used for prompts?
- How are prompts associated with users?
- What other API endpoints interact with prompts?
- What validation is needed for the PATCH endpoint's request body?

