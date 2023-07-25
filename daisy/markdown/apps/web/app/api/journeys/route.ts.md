// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  const records = await prisma.journey.findMany({
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
    const userRecord = await prisma.journey.findFirst({
      where: {
        id,
        users: { some: { email: user?.user?.email } }
      }
    });

    if (!userRecord) return NextResponse.redirect('/auth');
    await prisma.journey.delete({
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
    // TODO: Validate user ownership or permisson scope
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');
    const { id, ...data } = await req.json();

    const organizationId = session?.user?.organizationId;

    const journey = id
      ? await prisma.journey.update({
          where: {
            id
          },
          data: { ...data, organizationId, users: { connect: { email: session?.user?.email } } }
        })
      : await prisma.journey.create({
          data: { ...data, organizationId, users: { connect: { email: session?.user?.email } } }
        });
    return NextResponse.json(journey);
  } catch (error) {
    console.log('[PATCH] error', error);
    throw error;
  }
}

API Summary:
This file contains three API endpoints: GET, DELETE, and PATCH. The GET endpoint retrieves journey records for a user, the DELETE endpoint deletes a journey record, and the PATCH endpoint updates or creates a journey record.

Import statements:
- `NextResponse` is imported from the `next/server` module. It is used to send responses back to the client.
- `getServerSession` is imported from the `next-auth` module. It is used to retrieve the user session.
- `prisma` is imported from the `@db/client` module. It is used to interact with the database.
- `authOptions` is imported from the `@ui/authOptions` module. It contains options for authentication.

Internal Functions:
- `GET`: This function handles the GET request. It retrieves journey records for the user by querying the database using the `prisma` client. It checks if the user is authenticated and redirects to the authentication page if not. It returns the journey records as a JSON response.
- `DELETE`: This function handles the DELETE request. It retrieves the journey record ID from the request URL parameters. It checks if the user is authenticated and redirects to the authentication page if not. It then checks if the user has permission to delete the journey record and deletes it from the database using the `prisma` client. It returns the deleted journey record ID as a JSON response.
- `PATCH`: This function handles the PATCH request. It retrieves the user session, the journey record ID, and the updated data from the request body. It checks if the user is authenticated and redirects to the authentication page if not. It then updates or creates a journey record in the database using the `prisma` client. It returns the updated or created journey record as a JSON response.

External Services:
- This code interacts with the `next-auth` module for user authentication.
- It also interacts with the `prisma` client for database operations.

API Endpoints:
1. GET /api/route
Summary: Retrieves journey records for the authenticated user.
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
    "name": "Journey 1",
    "description": "This is journey 1"
  },
  {
    "id": 2,
    "name": "Journey 2",
    "description": "This is journey 2"
  }
]
```

2. DELETE /api/route?id=<journeyId>
Summary: Deletes a journey record with the specified ID for the authenticated user.
Example Usage:
```
curl -X DELETE \
  http://localhost:3000/api/route?id=1 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
```

Example Response:
```json
{
  "id": 1
}
```

3. PATCH /api/route
Summary: Updates or creates a journey record for the authenticated user.
Example Usage:
```
curl -X PATCH \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": 1,
  "name": "Updated Journey 1",
  "description": "This is the updated journey 1"
}'
```

Example Response:
```json
{
  "id": 1,
  "name": "Updated Journey 1",
  "description": "This is the updated journey 1"
}
```

Interaction Summary:
The code in this file handles three API endpoints: GET, DELETE, and PATCH. The GET endpoint retrieves journey records for the authenticated user, the DELETE endpoint deletes a journey record, and the PATCH endpoint updates or creates a journey record. The code interacts with the `next-auth` module for user authentication and the `prisma` client for database operations.

Developer Questions:
1. What are the allowed fields that can be updated in the PATCH request?
2. How does the code validate user ownership or permission scope?
3. What are the authentication options defined in `authOptions`?
4. Are there any known issues or limitations with this code?