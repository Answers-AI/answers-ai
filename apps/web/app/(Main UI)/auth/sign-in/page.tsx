import React from 'react';
import Auth from '@ui/Auth';

export const metadata = {
  title: 'Sign In | Answers AI',
  description: 'Sign in to Answers AI'
};

const SignInPage = async ({ params }: any) => {
  return <Auth {...params} />;
};

export default SignInPage;
