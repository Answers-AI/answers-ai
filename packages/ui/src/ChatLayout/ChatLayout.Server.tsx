import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@ui/authOptions';
import { prisma } from 'db/dist';

import ChatLayout from './ChatLayout.Client';
import { getAppSettings } from '@ui/getAppSettings';

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
  const session = await getServerSession(authOptions);
  console.log('chat layoutserver', { session });
  // if (!session?.user) {
  //   return <a href={'/auth'}>Redirect</a>;
  // }
  const appSettingsPromise = getAppSettings();

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

  const chatPromise = chatId
    ? prisma.chat
        .findUnique({
          where: {
            id: chatId
          },
          include: { prompt: true, messages: { include: { user: true } } }
        })
        .then((data: any) => JSON.parse(JSON.stringify(data)))
    : null;

  const journeyPromise = journeyId
    ? prisma.journey
        .findUnique({
          where: {
            id: journeyId
          },
          include: { chats: { include: { prompt: true, messages: { include: { user: true } } } } }
        })
        .then((data: any) => JSON.parse(JSON.stringify(data)))
    : null;

  const [
    chats,
    journeys,
    // chat,
    //  journey,
    appSettings
  ] = await Promise.all([
    chatsPromise,
    journeysPromise,
    chatPromise,
    journeyPromise,
    appSettingsPromise
  ]);
  return (
    <ChatLayout chats={chats} journeys={journeys} appSettings={appSettings}>
      {children}
    </ChatLayout>
  );
}
