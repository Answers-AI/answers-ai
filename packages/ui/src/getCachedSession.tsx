import React from 'react';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from './authOptions';

export const getCachedSession = React.cache(async (req?: any, res?: any) => {
  const session = await (req && res
    ? getServerSession(req, res, authOptions)
    : getServerSession(authOptions));
  return session;
});
