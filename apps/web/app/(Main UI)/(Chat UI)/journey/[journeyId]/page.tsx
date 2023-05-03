import React from 'react';

import Chat from '@ui/Chat';

export const metadata = {
  title: 'Journey | Answers AI',
  description: 'Your journey'
};

const JourneyDetailPage = async ({ params }: any) => {
  // @ts-expect-error Async Server Component
  return <Chat {...params} />;
};

export default JourneyDetailPage;
