import React from 'react';
import { prisma } from '@db/client';
import Chat from '@ui/Chat';
import ChatNotFound from '@ui/ChatNotFound';
import getCachedSession from '@ui/getCachedSession';
import { normalizeSidekickList } from '../../../../../utilities/normalizeSidekick';
import type { Sidekick, User } from 'types';
import auth0 from '@utils/auth/auth0';

const getMessages = async ({ chat, user }: { chat: Partial<Chat>; user: User }) => {
  try {
    const { id, chatflowChatId } = chat;
    const { accessToken } = await auth0.getAccessToken();
    const { chatflowDomain } = user;
    if (!chatflowChatId) return [];

    const result = await fetch(
      chatflowDomain?.replace('8080', '4000') + `/api/v1/chatmessage?chatId=${chatflowChatId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    const messages = await result.json();
    return messages?.map((m: any) => ({
      ...m,
      contextDocuments: m.sourceDocuments ? JSON.parse(m.sourceDocuments) : []
    }));
  } catch (err) {
    console.log({ err });
    return [];
  }
};
export const metadata = {
  title: 'Chats | Answers AI',
  description: 'Your current Answers AI chat'
};

const ChatDetailPage = async ({ params }: any) => {
  const session = await getCachedSession();

  if (!session?.user?.email) {
    return <ChatNotFound />;
  }

  const user = session?.user;
  const userId = user?.id;

  const getChatPromise = prisma.chat.findUnique({
    where: {
      id: params.chatId,
      users: {
        some: {
          id: userId
        }
      }
    },
    include: {
      // prompt: true,
      // journey: true,
      // messages: {
      //   include: {
      //     user: { select: { id: true, email: true, image: true, name: true } },
      //     contextDocuments: true
      //   },
      //   orderBy: { createdAt: 'asc' }
      // },
      users: { select: { id: true, email: true, image: true, name: true } }
    }
  });

  const getSidekicksPromise = prisma.sidekick.findMany({
    where: {
      AND: [{ tags: { has: 'flowise' } }, { NOT: { tags: { has: 'internal' } } }],
      OR: [
        // {
        //   favoritedBy: {
        //     some: {
        //       id: userId
        //     }
        //   }
        // },
        { organization: { id: user.org_id } },
        {
          isSystem: true
        }
      ]
    }
  });

  const [chat, dbSidekicks] = await Promise.all([getChatPromise, getSidekicksPromise]);

  if (!chat) {
    return <ChatNotFound />;
  }
  // @ts-ignore
  chat.messages = await getMessages({ user, chat });

  const sidekicks = (dbSidekicks as Sidekick[])?.length
    ? normalizeSidekickList(dbSidekicks as Sidekick[], user)
    : [];

  // @ts-expect-error Async Server Component
  return <Chat {...params} chat={chat} journey={(chat as any)?.journey} sidekicks={sidekicks} />;
};

export default ChatDetailPage;
