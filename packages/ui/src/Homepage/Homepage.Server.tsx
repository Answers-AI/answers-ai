import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { prisma } from 'db/dist';

import HomepageClient from './Homepage.Client';

const HomepageServer = async () => {
  const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   return <a href={'/auth'}>Redirect</a>;
  // }

  const journeysPromise = prisma.journey
    .findMany({
      where: {
        users: {
          some: { email: session.user.email }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        // goal: true,
        updatedAt: true,
        _count: {
          select: { chats: true }
        }
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  const journeys = await journeysPromise;
  console.log(journeys);
  return <HomepageClient journeys={journeys} />;
};

export default HomepageServer;
