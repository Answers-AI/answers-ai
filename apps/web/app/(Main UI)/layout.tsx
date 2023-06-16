import React from 'react';
import { Session } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import AppLayout from '@ui/AppLayout';
import flagsmith from 'flagsmith/isomorphic';
import { getProviders } from 'next-auth/react';
import { getCachedSession } from '@ui/getCachedSession';

const MainUiLayout = async (props: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) => {
  const [session, providers] = await Promise.all([
    getCachedSession(authOptions),
    getProviders(),
    flagsmith.init({
      // fetches flags on the server and passes them to the App
      environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!,
      preventFetch: true
    })
  ]);

  if (session?.user?.email)
    await flagsmith.identify(`user_${session.user.id}`, {
      env: process.env.NODE_ENV,
      role: session.user.role,
      invited: !!session.user.invited,
      domain: session.user.email.split('@')[1]
    });

  const flagsmithState = flagsmith.getState();

  return (
    <AppLayout
      appSettings={session?.user?.appSettings!}
      providers={providers}
      session={session as Session}
      params={props.params}
      flagsmithState={flagsmithState}>
      {props.children}
    </AppLayout>
  );
};

export default MainUiLayout;
