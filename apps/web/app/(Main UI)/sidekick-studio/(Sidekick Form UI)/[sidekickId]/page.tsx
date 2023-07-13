import React from 'react';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';
import SidekickDetail from '@ui/SidekickDetail';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickDetailPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);

  if (!session?.user?.email) return null;
  const userId = session.user.id;

  const sidekick = await prisma.sidekick
    .findFirst({
      where: {
        id: params.sidekickId,
        OR: [
          { createdByUser: { id: userId } },
          { isGlobal: true },
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
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  sidekick.sharedWith = sidekick.isGlobal ? 'Global' : sidekick.isSharedWithOrg ? 'Org' : 'Private';

  return <SidekickDetail {...params} sidekick={sidekick} />;
};

export default SidekickDetailPage;
