import React, { Suspense } from 'react';
import ChatDrawer from '../ChatDrawer.Server';

export default async function ChatUILayout({
  // This will be populated with nested layouts or pages
  chatId,
  journeyId,
  children
}: {
  children: React.ReactNode;
  chatId: string;
  journeyId: string;
}) {
  return (
    <main style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Suspense fallback="">
        {/* @ts-expect-error Server Component */}
        <ChatDrawer />
      </Suspense>

      {children}
    </main>
  );
}
