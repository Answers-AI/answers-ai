import React from 'react';
import { getServerSession } from 'next-auth';

import ChatWidget from '@ui/ChatWidget';

const WidgetChatPage = async ({ params }: any) => {
  const session = await getServerSession();
  return <ChatWidget {...params} session={session} />;
};

export default WidgetChatPage;
