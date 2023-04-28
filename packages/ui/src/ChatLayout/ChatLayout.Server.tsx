import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { prisma } from 'db/dist';

import ChatLayout from './ChatLayout.Client';

export default async function ChatUILayout({
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <a href={'/auth'}>Redirect</a>;
  }

  const chatsPromise = prisma.chat
    .findMany({
      where: {
        users: {
          some: { email: session.user.email }
        },
        journeyId: null
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        prompt: true,
        messages: { orderBy: { createdAt: 'desc' }, include: { user: true } }
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  const journeysPromise = prisma.journey
    .findMany({
      where: {
        users: {
          some: { email: session.user.email }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: { chats: { include: { prompt: true, messages: { include: { user: true } } } } }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  const [chats, journeys] = await Promise.all([chatsPromise, journeysPromise]);
  return (
    <ChatLayout chats={chats} journeys={journeys}>
      {children}
    </ChatLayout>
  );
}
