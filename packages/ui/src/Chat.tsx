import React from 'react';
import { getServerSession } from 'next-auth';
import { AnswersProvider } from '@ui/AnswersContext';
import { getAppSettings } from '@ui/getAppSettings';
import { authOptions } from '@ui/authOptions';
import { prisma } from 'db/dist';
import { Chat } from 'types';
import { ChatDetail } from './ChatDetail';

export interface Params {
  chatId?: string;
  journeyId?: string;
}

const Chat = async ({ chatId, journeyId }: Params) => {
  const appSettingsPromise = getAppSettings();

  const promptsPromise = prisma.prompt
    .findMany({
      where: {
        usages: { gt: 1 }
        // tags: { has: 'featured' }
      },
      orderBy: [
        {
          likes: 'desc'
        },
        {
          usages: 'desc'
        }
      ]
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

  const [appSettings, prompts, chat, journey] = await Promise.all([
    appSettingsPromise,
    promptsPromise,
    chatPromise,
    journeyPromise
  ]);

  return (
    <AnswersProvider chat={chat as Chat} journey={journey} appSettings={appSettings}>
      <ChatDetail appSettings={appSettings} prompts={prompts} />
    </AnswersProvider>
  );
};

export default Chat;
