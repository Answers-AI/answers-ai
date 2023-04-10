import React from 'react';

import Chat from './Chat';

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

const Homepage = async ({ params }: any) => {
  // @ts-expect-error
  return <Chat {...params} />;
};

export default Homepage;
