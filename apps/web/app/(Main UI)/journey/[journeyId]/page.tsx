import React from 'react';

import Chat from '../../Chat';

export const metadata = {
  title: 'Chat | Answers AI',
  description: 'Your chat'
};

const Homepage = async ({ params }: any) => {
  // @ts-expect-error
  return <Chat {...params} />;
};

export default Homepage;
