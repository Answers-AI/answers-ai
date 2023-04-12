import React from 'react';
import Auth from '@ui/Auth';
// export const revalidate = 1; // revalidate every minute

export const metadata = {
  title: 'Chat | Answers AI',
  description: 'Your chat'
};

const Homepage = async ({ params }: any) => {
  return <Auth {...params} />;
};

export default Homepage;
