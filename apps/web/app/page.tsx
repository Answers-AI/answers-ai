import { getAppSettings } from '../src/getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import DeveloperTools from '../src/DeveloperTools';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Homepage = async () => {
  const session = await getServerSession(authOptions);
  const prompts = await prisma.prompt.findMany({
    orderBy: {
      usages: 'desc'
    }
  });
  if (!session) {
    return <a href={'/auth'}>Redirect</a>;
  }

  const appSettings = await getAppSettings();
  return <DeveloperTools user={session?.user} appSettings={appSettings} prompts={prompts} />;
};

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

export default Homepage;
