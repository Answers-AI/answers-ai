import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@web/authOptions';
import AppLayout from '@web/AppLayout';
import React from 'react';

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

  return (
    <AppLayout session={session as Session} params={params}>
      {children}
    </AppLayout>
  );
}
