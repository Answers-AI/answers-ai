import React from 'react';
import { prisma } from '@db/client';
import SidekickForm from '@ui/SidekickForm';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';

export const metadata = {
  title: 'Create Sidekick | Sidekick Studio | Answers AI',
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
  return <SidekickForm {...params} allTags={allTags} />;
};

export default SidekickFormPage;
