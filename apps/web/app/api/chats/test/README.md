
# Chat API

This API provides a way to manage chat records.

## Usage

### GET

This endpoint is used to retrieve a list of chat records. It requires authentication and will return a list of records associated with the authenticated user.

Example:

```
import { getServerSession } from 'next-auth';
import { prisma } from 'db/dist';
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
```

### DELETE

This endpoint is used to delete a chat record. It requires authentication and will only delete records associated with the authenticated user.

Example:

```
import { getServerSession } from 'next-auth';
import { prisma } from 'db/dist';
import { authOptions } from '@ui/authOptions';

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
```

## Overview

This API provides a way to manage chat records. It requires authentication and will only allow access to records associated with the authenticated user.

The GET endpoint is used to retrieve a list of chat records associated with the authenticated user. It returns a list of records in JSON format.

The DELETE endpoint is used to delete a chat record. It requires authentication and will only delete records associated with the authenticated user. It takes an ID as a parameter and returns a JSON object with the ID of the deleted record.# api/chats/test/route.ts
This file contains the code for the GET and DELETE routes for the chat API. It is responsible for retrieving and deleting chat records from the database. It also handles authentication to ensure that only authorized users can access the data. The code is written in TypeScript and uses the Next.js framework.
