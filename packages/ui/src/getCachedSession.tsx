import React from 'react';
import { getServerSession, Session } from 'next-auth';

export const getCachedSession = React.cache(async (...args: any) => {
  const session = await getServerSession(...args);
  if (!session || !session?.user) throw new Error('NoSession');
  return session;
});
