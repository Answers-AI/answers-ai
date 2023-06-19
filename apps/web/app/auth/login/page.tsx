import React from 'react';
import { getServerSession } from 'next-auth';

import Auth from '@ui/Auth';
import { getProviders } from 'next-auth/react';

const LoginPage = async ({ params }: any) => {
  const providers = await getProviders();

  return <Auth providers={providers} />;
};

export default LoginPage;
