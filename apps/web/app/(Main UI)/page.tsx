import React from 'react';

import Chat from '@ui/Chat';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

const Homepage = async ({ params }: any) => {
  return redirect('/chat');
};

export default Homepage;
