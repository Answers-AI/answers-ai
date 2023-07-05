import React from 'react';
import { prisma } from '@db/client';
import SidekickForm from '@ui/SidekickForm';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickFormPage = async ({ params }: any) => {
  const sidekick = await prisma.sidekick
    .findUnique({
      where: {
        id: params.sidekickId
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  return <SidekickForm {...params} sidekick={sidekick} />;
};

export default SidekickFormPage;
