import { AnswersProvider } from 'AnswersContext';
import DeveloperTools from 'DeveloperTools';
import { getAppSettings } from 'getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { prisma } from 'db/dist';
import { Chat, Journey } from 'types';

const Chat = async ({ id }: any) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <a href={'/auth'}>Redirect</a>;
  }

  const appSettings = await getAppSettings();
  const prompts = JSON.parse(
    JSON.stringify(
      await prisma.prompt.findMany({
        orderBy: [
          {
            usages: 'desc'
          }
        ]
      })
    )
  );
  let chat;
  if (id) {
    chat = JSON.parse(
      JSON.stringify(
        await prisma.chat.findUnique({
          where: {
            id
          },
          include: { prompt: true, messages: { include: { user: true } } }
        })
      )
    );
  }

  const chats = JSON.parse(
    JSON.stringify(
      await prisma.chat.findMany({
        where: {
          users: {
            some: { email: session.user.email }
          },
          journeyId: null
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: { prompt: true, messages: { include: { user: true } } }
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

  return (
    <AnswersProvider chat={chat as Chat}>
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
