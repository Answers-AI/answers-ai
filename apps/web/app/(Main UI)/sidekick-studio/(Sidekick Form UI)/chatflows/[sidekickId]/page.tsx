import React from 'react';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';
import SidekickDetail from '@ui/SidekickDetail';
import type { Sidekick } from 'types';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickDetailPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return null;

  const sidekickId = params?.sidekickId;

  const hostname = `http://localhost:8080`;

  // Return the iframe element with the constructed URL
  // Ensure to adjust the width, height, and other attributes as per your requirements
  return (
    <iframe
      src={`${hostname}/chatflows/${sidekickId}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen></iframe>
  );
};

export default SidekickDetailPage;
