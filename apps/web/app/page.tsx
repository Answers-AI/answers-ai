import { getAppSettings } from '../src/getAppSettings';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import DeveloperTools from '../src/DeveloperTools';

const Homepage = async () => {
  const session = await getServerSession(authOptions);
  console.log('Session', session);
  if (!session) {
    return <a href={'/auth'}>Redirect</a>;
  }

  const appSettings = await getAppSettings();
  return <DeveloperTools appSettings={appSettings} />;
};
export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

export default Homepage;
