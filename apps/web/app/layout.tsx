import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import AppLayout from '../src/AppLayout';
import React from 'react';
import { redirect } from 'next/navigation';

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
  // console.log('Session', session);
  // if (!session) return children;

  return (
    <AppLayout session={session as Session} params={params}>
      {children}
    </AppLayout>
  );
}
