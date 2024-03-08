import React from 'react';
import { Session } from '@auth0/nextjs-auth0';
import AppLayout from '@ui/AppLayout';
import flagsmith from 'flagsmith/isomorphic';

import getCachedSession from '@ui/getCachedSession';

const MainUiLayout = async (props: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) => {
  const [session] = await Promise.all([getCachedSession()]);
  await flagsmith.init({
    // fetches flags on the server and passes them to the App
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!,
    ...(session?.user?.id && {
      identity: `user_${session?.user?.id}`,
      traits: {
        env: process.env.NODE_ENV,
        role: session?.user?.role!,
        invited: !!session?.user?.invited,
        domain: session?.user?.email?.split('@')[1]!
      }
    })
  });

  const flagsmithState = flagsmith.getState();

  return (
    <AppLayout
      appSettings={session?.user?.appSettings!}
      // providers={providers}
      session={JSON.parse(JSON.stringify(session as Session))}
      params={props.params}
      flagsmithState={flagsmithState}>
      {props.children}
    </AppLayout>
  );
};

export default MainUiLayout;
