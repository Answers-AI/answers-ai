import { getAppSettings } from '../src/getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { prisma } from 'db/dist';

import DeveloperTools from '../src/DeveloperTools';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { AnswersProvider } from '../src/AnswersContext';

const Homepage = async ({ params }: any) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <a href={'/auth'}>Redirect</a>;
  }

  const prompts = await prisma.prompt.findMany({
    orderBy: {
      usages: 'desc'
    }
  });

  const appSettings = await getAppSettings();

  return (
    <AnswersProvider>
      <DeveloperTools user={session?.user} appSettings={appSettings} prompts={prompts} />;
    </AnswersProvider>
  );
};

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

export default Homepage;
