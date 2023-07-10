import React from 'react';
import { prisma } from '@db/client';
import SidekickForm from '@ui/SidekickForm';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickFormPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);

  if (!session?.user?.email) return null;

  const uniqueTags = await prisma.sidekick.findMany({
    select: { tags: true },
    where: {
      createdByUser: {
        email: session.user.email
      }
    },
    distinct: ['tags']
  });

  // Flatten and get unique values
  const allTags = Array.from(new Set(uniqueTags.flatMap((dep) => dep.tags)));

  const sidekick = await prisma.sidekick
    .findFirst({
      where: {
        id: params.sidekickId,
        createdByUser: {
          email: session.user.email
        }
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  return <SidekickForm {...params} allTags={allTags} sidekick={sidekick} />;
};

export default SidekickFormPage;
