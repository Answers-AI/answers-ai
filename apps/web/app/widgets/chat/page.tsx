import React from 'react';
import { getServerSession } from 'next-auth';

import ChatWidget from '@ui/ChatWidget';

const WidgetPageServer = async ({ params }: any) => {
  const session = await getServerSession();
  return <ChatWidget {...params} session={session} />;
};

export default WidgetPageServer;
