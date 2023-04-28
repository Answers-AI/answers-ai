import React from 'react';

import ChatDrawer from '@ui/ChatDrawer';
import { Chat, Journey } from 'types';

export default function ChatUILayout({
  // This will be populated with nested layouts or pages
  children,
  chats,
  journeys
}: {
  children: React.ReactNode;
  chats?: Chat[];
  journeys?: Journey[];
}) {
  return (
    <main style={{ display: 'flex', width: '100%', height: '100%' }}>
      <ChatDrawer journeys={journeys} chats={chats} />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        {children}
      </div>
    </main>
  );
}
