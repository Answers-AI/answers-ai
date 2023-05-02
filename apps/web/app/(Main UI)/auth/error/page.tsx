import React from 'react';
import Auth from '@ui/Auth';

export const metadata = {
  title: 'Authentication Error | Answers AI'
};

const AuthenticationErrorPage = async ({ params }: any) => {
  return <Auth {...params} />;
};

export default AuthenticationErrorPage;
