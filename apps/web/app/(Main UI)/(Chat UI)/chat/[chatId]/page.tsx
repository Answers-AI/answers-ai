import React from 'react';
import { prisma } from 'db/dist';
import Chat from '@ui/Chat';

export const metadata = {
  title: 'Chats | Answers AI',
  description: 'Your current Answers AI chat'
};

const ChatDetailPage = async ({ params }: any) => {
  const chat = await prisma.chat
    .findUnique({
      where: {
        id: params.chatId
      },
      include: { prompt: true, journey: true, messages: { include: { user: true } } }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));
  // @ts-expect-error Async Server Component
  return <Chat {...params} chat={chat} journey={chat?.journey} />;
};

export default ChatDetailPage;
