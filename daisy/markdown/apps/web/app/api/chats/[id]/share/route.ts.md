// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user?.email)
      return NextResponse.json({ error: 'You must be logged in to share a chat' }, { status: 403 });
    const { chatId, email } = await req.json();

    if (!email?.length) {
      return NextResponse.json({ error: 'You must provide at least one email' }, { status: 403 });
    }
    let chat = await prisma.chat.findUnique({
      where: { id: chatId }
    });

    if (!chat || chat.ownerId !== user.id) {
      NextResponse.json({ error: 'You are not the owner of this chat' }, { status: 403 });
    }

    await prisma.user.createMany({
      data: email.map((email: string) => ({
        email
      })),
      skipDuplicates: true
    });

    chat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        users: {
          set: email.map((email: string) => ({
            email
          }))
        }
      },
      include: { users: true }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[PATCH] error', error);
    throw error;
  }
}

API Summary:
This file contains a single API endpoint that handles a POST request to share a chat. It requires the user to be logged in and the owner of the chat. The endpoint expects a JSON payload with the chatId and an array of email addresses to share the chat with. It creates new user records for the provided email addresses and updates the chat's user list accordingly.

Import statements:
- `NextResponse` is imported from the `next/server` module and is used to send responses back to the client.
- `getServerSession` is imported from the `next-auth` module and is used to retrieve the user session.
- `prisma` is imported from the `@db/client` module and is used to interact with the database.
- `authOptions` is imported from the `@ui/authOptions` module and contains options for session authentication.

Internal Functions:
- `POST`: This function is the main API endpoint handler. It takes a `req` object as a parameter, which represents the incoming request. It first retrieves the user session using `getServerSession` and checks if the user is logged in. If not, it returns a 403 error response. It then extracts the `chatId` and `email` from the request payload. If no email is provided, it returns a 403 error response. It then checks if the chat exists and if the user is the owner of the chat. If not, it returns a 403 error response. It creates new user records for the provided email addresses using `prisma.user.createMany` and updates the chat's user list using `prisma.chat.update`. Finally, it returns a success response.

External Services:
- `next-auth`: This module is used to handle user authentication and session management.
- `@db/client`: This module provides access to the database using Prisma.
- `@ui/authOptions`: This module contains options for session authentication.

API Endpoints:
POST /api/share-chat
Summary: Shares a chat with specified email addresses.
Example Usage:
```
curl -X POST \
  http://localhost:3000/api/share-chat \
  -H 'Content-Type: application/json' \
  -d '{
    "chatId": "123",
    "email": ["user1@example.com", "user2@example.com"]
  }'
```

Example Response:
```json
{
  "success": true
}
```

Interaction Summary:
The API endpoint first checks if the user is logged in and the owner of the chat. If not, it returns a 403 error response. It then creates new user records for the provided email addresses and updates the chat's user list. Finally, it returns a success response.

Developer Questions:
1. What happens if the user is not logged in?
2. What happens if the chat does not exist or the user is not the owner?
3. Can the API handle sharing a chat with multiple email addresses at once?
4. Are there any limitations on the number of email addresses that can be shared with a chat?
5. How are duplicate email addresses handled when creating new user records?
6. Are there any known issues or limitations with this API endpoint?

TODO Items:
- Add input validation for the email addresses.
- Implement error handling for database operations.

Known Issues:
- The API endpoint does not return a response when the chat or user validation fails.