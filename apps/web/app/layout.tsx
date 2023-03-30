import React from 'react';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth/core/types';
import { authOptions } from '@ui/authOptions';
import AppLayout from '@ui/AppLayout';
import flagsmith from 'flagsmith/isomorphic';

export default async function RootLayout({
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  console.log('app layout', params);
  const session = await getServerSession(authOptions);
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
    <AppLayout session={session as Session} params={params} flagsmithState={flagsmithState}>
      {children}
    </AppLayout>
  );
}
