import React from 'react';

import Chat from '@ui/Chat';

// export const revalidate = 1; // revalidate every minute

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

const Homepage = async ({ params }: any) => {
  console.log('homepage/pagesmore123256', params);
  // @ts-expect-error
  return <Chat {...params} />;
};

export default Homepage;
