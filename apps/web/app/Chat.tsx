import { AnswersProvider } from '@web/AnswersContext';
import DeveloperTools from '@web/DeveloperTools';
import { getAppSettings } from '@web/getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '@web/authOptions';
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

  const appSettings = await getAppSettings();
  const prompts = JSON.parse(
    JSON.stringify(
      await prisma.prompt.findMany({
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
    )
  );
  let chat;
  if (chatId) {
    chat = JSON.parse(
      JSON.stringify(
        await prisma.chat.findUnique({
          where: {
            id: chatId
          },
          include: { prompt: true, messages: { include: { user: true } } }
        })
      )
    );
    if (!chat) redirect('/');
  }

  const chats = JSON.parse(
    JSON.stringify(
      await prisma.chat.findMany({
        where: {
          users: {
            some: { email: session.user.email }
          },
          journeyId: journeyId ?? null
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          prompt: true,
          messages: { orderBy: { createdAt: 'asc' }, include: { user: true } }
        }
      })
    )
  );

  const journeys = JSON.parse(
    JSON.stringify(
      await prisma.journey.findMany({
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
    )
  );

  let journey;
  if (journeyId) {
    journey = JSON.parse(
      JSON.stringify(
        await prisma.journey.findUnique({
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
      )
    );
    if (!journey) redirect('/');
  }
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
