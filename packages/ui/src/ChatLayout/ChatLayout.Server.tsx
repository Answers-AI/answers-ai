import React from 'react';
import { authOptions } from '@ui/authOptions';
import { prisma } from '@db/client';

import ChatLayout from './ChatLayout.Client';
import { getCachedSession } from '@ui/getCachedSession';

export default async function ChatUILayout({
  // This will be populated with nested layouts or pages
  chatId,
  journeyId,
  children
}: {
  children: React.ReactNode;
  chatId: string;
  journeyId: string;
}) {
  const session = await getCachedSession();

  if (!session?.user?.email) return null;

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
        messages: { orderBy: { createdAt: 'desc' }, take: 1 }
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
      include: {
        chats: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            prompt: true,
            messages: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        }
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  const [chats, journeys] = await Promise.all([chatsPromise, journeysPromise]);
  return (
    <ChatLayout chats={chats} journeys={journeys} appSettings={session.user.appSettings}>
      {children}
    </ChatLayout>
  );
}
