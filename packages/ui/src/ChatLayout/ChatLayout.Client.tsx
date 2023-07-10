import React from 'react';

import ChatDrawer from '../ChatDrawer';
import { AppSettings, Chat, Journey } from 'types';

export default function ChatUILayout({
  // This will be populated with nested layouts or pages
  appSettings,
  children,
  chats,
  journeys
}: {
  children: React.ReactNode;
  appSettings: AppSettings;
  chats?: Chat[];
  journeys?: Journey[];
}) {
  return (
    <main style={{ display: 'flex', width: '100%', height: '100%' }}>
      <ChatDrawer journeys={journeys} chats={chats} />

      {children}
    </main>
  );
}
