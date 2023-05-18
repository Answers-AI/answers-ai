import React from 'react';

import Homepage from '@ui/Homepage';

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

const HomepagePage = async ({ params }: any) => {
  // @ts-expect-error Async Server Component
  return <Homepage />;
};

export default HomepagePage;
