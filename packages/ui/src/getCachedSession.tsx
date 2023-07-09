import React, { cache } from 'react';
import { getServerSession } from 'next-auth';

export const getCachedSession = cache(async (...args: any) => {
  const session = await getServerSession(...args);
  return session;
});
