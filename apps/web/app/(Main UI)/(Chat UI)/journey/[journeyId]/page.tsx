import React from 'react';
import { prisma } from 'db/dist';
import Chat from '@ui/Chat';

export const metadata = {
  title: 'Journey | Answers AI',
  description: 'Your journey'
};

const JourneyDetailPage = async ({ params }: any) => {
  const journey = await prisma.journey
    .findUnique({
      where: {
        id: params.journeyId
      },
      include: { chats: { include: { prompt: true, messages: { include: { user: true } } } } }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  // @ts-expect-error Async Server Component
  return <Chat {...params} journey={journey} />;
};

export default JourneyDetailPage;
