import React from 'react';
import { prisma } from '@db/client';
import Chat from '@ui/Chat';
import ChatNotFound from '@ui/ChatNotFound';
import getCachedSession from '@ui/getCachedSession';
import { normalizeSidekickList } from '../../../../../utilities/normalizeSidekick';
import type { Sidekick, User } from 'types';
import auth0 from '@utils/auth/auth0';

const getMessages = async ({ chat, user }: { chat: Chat; user: User }) => {
  try {
    const { id, chatflowChatId } = chat;
    const { accessToken } = await auth0.getAccessToken();
    const { chatflowDomain } = user;

    const result = await fetch(chatflowDomain + `/api/v1/chatmessage?chatId=${chatflowChatId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const messages = await result.json();
    console.log({ chatflowDomain, id, messages });
    return messages;
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
      journey: true,
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
      tags: { has: 'flowise' },
      OR: [
        {
          favoritedBy: {
            some: {
              id: userId
            }
          }
        },
        {
          createdByUser: {
            organizations: {
              // User attached to the sidekick is in the same organization as the current user
              some: { users: { some: { id: userId } } }
            }
          },
          isSharedWithOrg: true
        },
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
  chat.messages = await getMessages({ user, chat });

  const sidekicks = (dbSidekicks as Sidekick[])?.length
    ? normalizeSidekickList(dbSidekicks as Sidekick[], user)
    : [];

  // @ts-expect-error Async Server Component
  return <Chat {...params} chat={chat} journey={(chat as any)?.journey} sidekicks={sidekicks} />;
};

export default ChatDetailPage;
