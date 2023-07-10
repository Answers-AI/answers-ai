import React from 'react';
import { prisma } from '@db/client';
import Chat from '@ui/Chat';
import ChatNotFound from '@ui/ChatNotFound';
import getCachedSession from '@ui/getCachedSession';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Chats | Answers AI',
  description: 'Your current Answers AI chat'
};

const ChatDetailPage = async ({ params }: any) => {
  const session = await getCachedSession();
  const chat = await prisma.chat
    .findUnique({
      where: {
        id: params.chatId
      },
      include: {
        prompt: true,
        journey: true,

        messages: {
          include: {
            user: { select: { id: true, email: true, image: true, name: true } },
            contextDocuments: true
          },
          orderBy: { createdAt: 'asc' }
        },
        users: { select: { id: true, email: true, image: true, name: true } }
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  if (!chat?.users?.find((user: any) => user.id === session?.user?.id)) {
    return <ChatNotFound />;
  }

  // @ts-expect-error Async Server Component
  return <Chat {...params} chat={chat} journey={chat?.journey} />;
};

export default ChatDetailPage;
