'use client';
import React from 'react';
import { AppSettings, AppService } from 'types';

const Auth = ({
  // appSettings,
  onSync
}: {
  // appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
  // TODO: Use Server redirect: https://github.com/vercel/next.js/pull/43510
  // return redirect('/api/auth/signin');
  React.useEffect(() => {
    window.location.href = '/api/auth/signin';
  }, []);
  return <div></div>;
};
export default Auth;
