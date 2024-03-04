import React from 'react';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';
import { getAppSettings } from '@ui/getAppSettings';
import SidekickDetail from '@ui/SidekickDetail';
import type { Sidekick } from 'types';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const FlowisePage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);
  const userId = session?.user?.id;
  const appSettings = await getAppSettings();
  if (!userId) return null;

  const flowisePath = params?.flowisePath;

  const { flowiseHostName } = appSettings;

  // Return the iframe element with the constructed URL
  // Ensure to adjust the width, height, and other attributes as per your requirements
  return (
    <iframe
      src={flowisePath ? `${flowiseHostName}/${flowisePath}` : `${flowiseHostName}/`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen></iframe>
  );
};

export default FlowisePage;
