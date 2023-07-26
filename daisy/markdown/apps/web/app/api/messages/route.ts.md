// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  const records = await prisma.message.findMany({
    where: {
      userId: session?.user?.id
    }
  });
  return NextResponse.json(records);
}

export async function DELETE(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  if (id) {
    const userRecord = await prisma.message.findFirst({
      where: {
        id,
        userId: session?.user?.id
      }
    });

    if (!userRecord) return NextResponse.redirect('/auth');
    await prisma.message.delete({
      where: {
        id
      }
    });
    return NextResponse.json({ id });
  }
}

export async function PATCH(req: Request, res: Response) {
  try {
    // TODO: Validate which fields are allowed to be updated
    const user = await getServerSession(authOptions);
    if (!user?.user?.email) return NextResponse.redirect('/auth');
    const { id, likes, dislikes } = await req.json();

    if (id) {
      await prisma.message.update({
        where: {
          id
        },
        data: { likes, dislikes }
      });

      return NextResponse.json({ id });
    }
  } catch (error) {
    console.log('[PATCH] error', error);
    throw error;
  }
}

API Summary:
This file contains three API endpoints: GET, DELETE, and PATCH. These endpoints are used to interact with the message data in the application. The GET endpoint retrieves all messages associated with the authenticated user, the DELETE endpoint deletes a specific message, and the PATCH endpoint updates the likes and dislikes of a message.

Import statements:
- `NextResponse` is imported from the `next/server` module. It is used to send responses back to the client.
- `getServerSession` is imported from the `next-auth` module. It is used to retrieve the session of the authenticated user.
- `prisma` is imported from the `@db/client` module. It is the Prisma client used to interact with the database.
- `authOptions` is imported from the `@ui/authOptions` module. It contains the options for authentication.

Internal Functions:
- `GET`: This function handles the GET request to retrieve all messages associated with the authenticated user. It uses the `getServerSession` function to get the user session and checks if the user has a valid email. If not, it redirects the user to the authentication page. It then uses the `prisma.message.findMany` function to retrieve all messages with the matching `userId` and returns the records as a JSON response.
- `DELETE`: This function handles the DELETE request to delete a specific message. It extracts the `id` parameter from the request URL. It uses the `getServerSession` function to get the user session and checks if the user has a valid email. If not, it redirects the user to the authentication page. It then uses the `prisma.message.findFirst` function to find the message with the matching `id` and `userId`. If the message does not exist, it redirects the user to the authentication page. Finally, it uses the `prisma.message.delete` function to delete the message and returns the `id` of the deleted message as a JSON response.
- `PATCH`: This function handles the PATCH request to update the likes and dislikes of a message. It first validates the user session and checks if the user has a valid email. If not, it redirects the user to the authentication page. It then extracts the `id`, `likes`, and `dislikes` from the request body. It uses the `prisma.message.update` function to update the message with the matching `id` and sets the `likes` and `dislikes` fields to the provided values. Finally, it returns the `id` of the updated message as a JSON response.

External Services:
- The code interacts with the Prisma client (`prisma`) to perform database operations.
- The code uses the `getServerSession` function from the `next-auth` module to retrieve the user session.

API Endpoints:
1. GET /api/route
Summary: Retrieves all messages associated with the authenticated user.
Example Usage:
```
curl -X GET \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "data": "data"
}'
```
Example Response:
```json
[
  {
    "id": 1,
    "userId": 123,
    "content": "Hello world"
  },
  {
    "id": 2,
    "userId": 123,
    "content": "Lorem ipsum"
  }
]
```

2. DELETE /api/route?id=<messageId>
Summary: Deletes a specific message.
Example Usage:
```
curl -X DELETE \
  http://localhost:3000/api/route?id=1 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "data": "data"
}'
```
Example Response:
```json
{
  "id": 1
}
```

3. PATCH /api/route
Summary: Updates the likes and dislikes of a message.
Example Usage:
```
curl -X PATCH \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": 1,
  "likes": 10,
  "dislikes": 5
}'
```
Example Response:
```json
{
  "id": 1
}
```

Interaction Summary:
The code in this file provides API endpoints for retrieving, deleting, and updating messages. It requires authentication using the `getServerSession` function from the `next-auth` module. The `prisma` client is used to interact with the database and perform CRUD operations on the `message` table. The GET endpoint retrieves all messages associated with the authenticated user, the DELETE endpoint deletes a specific message, and the PATCH endpoint updates the likes and dislikes of a message.

Developer Questions:
1. How is the authentication handled in this code?
2. What are the allowed fields to be updated in the PATCH endpoint?
3. Are there any known issues or limitations with this code?
4. How can I test these API endpoints locally?
5. Are there any additional dependencies required to run this code?