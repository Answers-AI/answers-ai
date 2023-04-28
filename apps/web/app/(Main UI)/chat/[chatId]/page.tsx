import React from 'react';

import Chat from '@ui/Chat';

export const metadata = {
  title: 'Chats | Answers AI',
  description: 'Your current Answers AI chat'
};

const ChatDetailPage = async ({ params }: any) => {
  // @ts-expect-error Async Server Component
  return <Chat {...params} />;
};

export default ChatDetailPage;
