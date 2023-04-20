import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import AppLayout from '@ui/AppLayout';
import React from 'react';
import flagsmith from 'flagsmith/isomorphic';
import { getProviders } from 'next-auth/react';
import { getAppSettings } from '@ui/getAppSettings';

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
  const session = await getServerSession(authOptions);

  const providers = await getProviders();
  await flagsmith.init({
    // fetches flags on the server and passes them to the App
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!,
    preventFetch: true
  });

  if (session?.user?.email)
    await flagsmith.identify(`user_${session.user.id}`, {
      env: process.env.NODE_ENV,
      role: session.user.role,
      domain: session.user.email.split('@')[1]
    });

  const flagsmithState = flagsmith.getState();

  const appSettings = await getAppSettings();

  return (
    <AppLayout
      appSettings={appSettings}
      providers={providers}
      session={session as Session}
      params={params}
      flagsmithState={flagsmithState}>
      {children}
    </AppLayout>
  );
}
