import React from 'react';
import { getServerSession } from 'next-auth';
import ChatLayout from '@ui/ChatLayout';
import { authOptions } from '@ui/authOptions';

export default async function ChatUILayout({
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <a href={'/auth'}>Redirect</a>;
  }

  return (
    // @ts-expect-error
    <ChatLayout>
      {children}
      {/* <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 2,
          paddingTop: 0,
          paddingBottom: 3
        }}> */}
      {/* <AppSyncToolbar appSettings={session?.user?.appSettings} /> */}
      {/* {journey ? <Filters filters={journey.filters} /> : null} */}

      {/* </div> */}
    </ChatLayout>
  );
}
