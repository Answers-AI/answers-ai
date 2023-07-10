import React, { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

const getCachedSession = cache(async (req?: any, res?: any) => {
  const session = await (req && res
    ? getServerSession(req, res, authOptions)
    : getServerSession(authOptions));
  return session;
});

export default getCachedSession;
