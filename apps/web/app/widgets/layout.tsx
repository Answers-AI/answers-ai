import { Session } from 'next-auth';

import AppWidgetLayout from '@ui/AppWidgetLayout';
import React from 'react';
import flagsmith from 'flagsmith/isomorphic';
import getCachedSession from '@ui/getCachedSession';

const WidgetLayout = async ({
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) => {
  const session = await getCachedSession();
  await flagsmith.init({
    // fetches flags on the server and passes them to the App
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!,
    preventFetch: true
  });

  if (session?.user?.email)
    await flagsmith.identify(`user_${session.user.id}`, {
      env: process.env.NODE_ENV,
      domain: session.user.email.split('@')[1]
    });

  const flagsmithState = flagsmith.getState();

  return (
    <AppWidgetLayout session={session as Session} params={params} flagsmithState={flagsmithState}>
      {children}
    </AppWidgetLayout>
  );
};

export default WidgetLayout;
