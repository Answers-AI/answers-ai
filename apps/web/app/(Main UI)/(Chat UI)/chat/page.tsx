import React from 'react';

import Chat from '@ui/Chat';
import getCachedSession from '@ui/getCachedSession';
import { prisma } from '@db/client';
import { normalizeSidekickList } from '../../../../utilities/normalizeSidekick';
import { Sidekick } from 'types';

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

  const sidekicks = dbSidekicks?.length
    ? normalizeSidekickList(dbSidekicks as Sidekick[], user)
    : [];

  // @ts-expect-error Async Server Component
  return <Chat {...params} sidekicks={sidekicks} />;
};

export default ChatDetailPage;
