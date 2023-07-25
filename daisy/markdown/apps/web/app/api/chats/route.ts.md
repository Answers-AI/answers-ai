// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  const records = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          email: user?.user?.email
        }
      }
    }
  });
  return NextResponse.json(records);
}

export async function DELETE(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  if (id) {
    const userRecord = await prisma.chat.findFirst({
      where: {
        id,
        users: { some: { email: user?.user?.email } }
      }
    });

    if (!userRecord) return NextResponse.redirect('/auth');
    await prisma.chat.delete({
      where: {
        id
      }
    });
    return NextResponse.json({ id });
  }
}

API Summary:
This file contains two API endpoints: GET and DELETE. The GET endpoint retrieves chat records for a user, while the DELETE endpoint deletes a specific chat record.

Import statements:
- `NextResponse` is imported from the `next/server` module. It is used to send responses back to the client.
- `getServerSession` is imported from the `next-auth` module. It is used to retrieve the user session from the server.
- `prisma` is imported from the `@db/client` module. It is the Prisma client used to interact with the database.
- `authOptions` is imported from the `@ui/authOptions` module. It contains options for authentication.

Internal Functions:
- `GET`: This function handles the GET request. It retrieves the user session using `getServerSession` and checks if the user has a valid email. If not, it redirects the user to the '/auth' page. It then queries the database using Prisma to find chat records associated with the user's email. The retrieved records are returned as a JSON response using `NextResponse.json`.
- `DELETE`: This function handles the DELETE request. It extracts the 'id' parameter from the request URL's search parameters. It then retrieves the user session and checks if the user has a valid email. If not, it redirects the user to the '/auth' page. If the 'id' parameter is present, it queries the database using Prisma to find the chat record with the specified 'id' and associated with the user's email. If the record is found, it is deleted from the database. The function returns a JSON response with the deleted 'id' using `NextResponse.json`.

External Services:
- This code interacts with the Prisma database using the `prisma` client. It retrieves chat records and deletes chat records from the database.

API Endpoints:
1. GET /api/route
Summary: Retrieves chat records for the user.
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
    "message": "Hello",
    "user": "john@example.com"
  },
  {
    "id": 2,
    "message": "How are you?",
    "user": "john@example.com"
  }
]
```

2. DELETE /api/route?id=<id>
Summary: Deletes a specific chat record.
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

Interaction Summary:
- The GET endpoint retrieves chat records from the database based on the user's email.
- The DELETE endpoint deletes a specific chat record from the database based on the provided 'id' parameter.

Developer Questions:
1. What is the purpose of the `authOptions` and how is it configured?
2. How is the Prisma client (`prisma`) initialized and connected to the database?
3. What is the structure of the `chat` table in the database?
4. How are the chat records associated with users in the database?
5. How is the user session retrieved and validated using `getServerSession`?
6. What are the potential error scenarios and how are they handled in these endpoints?

TODO Items:
- Add error handling for database queries and Prisma client initialization.
- Implement authentication middleware to handle user authentication in a centralized manner.

Known Issues:
- None.