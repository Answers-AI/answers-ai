import React from 'react';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';
import SidekickDetail from '@ui/SidekickDetail';
import { Sidekick } from 'types';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickDetailPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return null;

  const sidekickId = params?.sidekickId;

  if (!sidekickId) return null;

  const sidekick = (await prisma.sidekick.findFirst({
    where: {
      id: sidekickId,
      OR: [
        { createdByUser: { id: userId } },
        { isGlobal: true },
        { isSystem: true },
        {
          createdByUser: {
            organizations: {
              some: { users: { some: { id: userId } } }
            }
          },
          isSharedWithOrg: true
        }
      ]
    }
  })) as Sidekick;

  switch (true) {
    case sidekick.isGlobal:
      sidekick.sharedWith = 'Global';
      break;

    case sidekick.isSharedWithOrg:
      sidekick.sharedWith = 'Org';
      break;

    case sidekick.isSystem:
      sidekick.sharedWith = 'System';
      break;

    default:
      sidekick.sharedWith = 'Private';
      break;
  }

  return <SidekickDetail {...params} sidekick={sidekick} />;
};

export default SidekickDetailPage;
