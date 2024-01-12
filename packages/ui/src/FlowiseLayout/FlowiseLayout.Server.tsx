import React from 'react';
import { authOptions } from '../authOptions';
import FlowiseLayout from './FlowiseLayout.Client';
import getCachedSession from '../getCachedSession';

export default async function ChatUILayout({
  // This will be populated with nested layouts or pages
  sidekickId,
  children
}: {
  children: React.ReactNode;
  sidekickId: string;
}) {
  const session = await getCachedSession(authOptions);

  if (!session?.user?.email) return null;

  return <FlowiseLayout appSettings={session.user.appSettings}>{children}</FlowiseLayout>;
}
