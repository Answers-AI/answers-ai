import React from 'react';

import Chat from '@ui/Chat';

// export const revalidate = 1; // revalidate every minute

export const metadata = {
  title: 'Journey | Answers AI',
  description: 'Your yourney'
};

const Homepage = async ({ params }: any) => {
  console.log('journey/[[journeyId]]/page', params);
  // @ts-expect-error Async Server Component
  return <Chat {...params} />;
};

export default Homepage;
