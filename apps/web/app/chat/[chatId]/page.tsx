import React from 'react';

import Chat from '@ui/Chat';

// export const revalidate = 1; // revalidate every minute

export const metadata = {
  title: 'Chat | Answers AI',
  description: 'Your chat'
};

const Homepage = async ({ params }: any) => {
  console.log('chat/[[chatid]]', params);
  // @ts-expect-error Async Server Component
  return <Chat {...params} />;
};

export default Homepage;
