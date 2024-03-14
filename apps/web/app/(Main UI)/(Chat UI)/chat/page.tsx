import React from 'react';

import Chat from '@ui/Chat';
import getCachedSession from '@ui/getCachedSession';
import { prisma } from '@db/client';
import { normalizeSidekickList } from '../../../../utilities/normalizeSidekick';

export const metadata = {
  title: 'Chats | Answers AI',
  description: 'Your current Answers AI chat'
};

const ChatDetailPage = async ({ params }: any) => {
  const session = await getCachedSession();

  const user = session?.user;
  const userId = user?.id;

  const dbSidekicks = await prisma.sidekick.findMany({
    where: {
      NOT: {
        tags: { has: 'chatflow' }
      },
      OR: [
        {
          favoritedBy: {
            some: {
              id: userId
            }
          }
        },
        {
          isSystem: true
        }
      ]
    }
  });

  const sidekicks = dbSidekicks?.length ? normalizeSidekickList(dbSidekicks, user) : [];

  // @ts-expect-error Async Server Component
  return <Chat {...params} sidekicks={sidekicks} />;
};

export default ChatDetailPage;
