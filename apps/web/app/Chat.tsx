import { AnswersProvider } from '@ui/AnswersContext';
import DeveloperTools from '@ui/DeveloperTools';
import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '@ui/authOptions';
import { prisma } from 'db/dist';
import { Chat, Journey } from 'types';
import { redirect } from 'next/navigation';

export interface Params {
  chatId?: string;
  journeyId?: string;
}
const Chat = async ({ chatId, journeyId }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <a href={'/auth'}>Redirect</a>;
  }
  const appSettingsPromise = getAppSettings();

  const promptsPromise = prisma.prompt
    .findMany({
      where: {
        OR: [
          {
            usages: {
              gt: 0
            }
          },
          {
            likes: {
              gt: 0
            }
          }
        ]
      },
      orderBy: [
        {
          usages: 'desc'
        }
      ]
    })
    .then((data) => JSON.parse(JSON.stringify(data)));

  const chatPromise = chatId
    ? prisma.chat
        .findUnique({
          where: {
            id: chatId
          },
          include: { prompt: true, messages: { include: { user: true } } }
        })
        .then((data) => JSON.parse(JSON.stringify(data)))
    : null;

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
        messages: { orderBy: { createdAt: 'asc' }, include: { user: true } }
      }
    })
    .then((data) => JSON.parse(JSON.stringify(data)));

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
    .then((data) => JSON.parse(JSON.stringify(data)));

  const journeyPromise = journeyId
    ? prisma.journey
        .findUnique({
          where: {
            // users: {
            //   some: { email: session.user.email }
            // },
            id: journeyId
          },
          // orderBy: {
          //   createdAt: 'desc'
          // },
          include: { chats: { include: { prompt: true, messages: { include: { user: true } } } } }
        })
        .then((data) => JSON.parse(JSON.stringify(data)))
    : null;

  const [appSettings, prompts, chat, chats, journeys, journey] = await Promise.all([
    appSettingsPromise,
    promptsPromise,
    chatPromise,
    chatsPromise,
    journeysPromise,
    journeyPromise
  ]);

  return (
    <AnswersProvider chat={chat as Chat} journey={journey}>
      <DeveloperTools
        user={session?.user}
        appSettings={appSettings}
        prompts={prompts}
        chats={chats as Chat[]}
        journeys={journeys as Journey[]}
      />
    </AnswersProvider>
  );
};

export default Chat;
