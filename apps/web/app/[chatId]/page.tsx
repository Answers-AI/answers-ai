import { getAppSettings } from '../../src/getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { prisma } from 'db/dist';

import DeveloperTools from '../../src/DeveloperTools';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { AnswersProvider } from '../../src/AnswersContext';
import { Chat, User } from 'db/generated/prisma-client';
import { redirect } from 'next/navigation';

export const revalidate = 1; // revalidate every minute

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

const Homepage = async ({ params }: any) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <a href={'/auth'}>Redirect</a>;
  }

  const appSettings = await getAppSettings();
  // Take the first message of every chat from users
  const prompts = await prisma.prompt.findMany({
    orderBy: [
      {
        usages: 'desc'
      }
    ]
  });
  let chat;
  if (params?.chatId) {
    chat = await prisma.chat.findUnique({
      where: {
        id: params.chatId
      }
    });
  }
  if (!chat) {
    return redirect('/');
  }

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: { email: session.user.email }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: { prompt: true }
  });

  return (
    <AnswersProvider chat={chat as Chat}>
      <DeveloperTools
        user={session?.user}
        appSettings={appSettings}
        prompts={prompts}
        chats={chats}
      />
    </AnswersProvider>
  );
};

export default Homepage;
