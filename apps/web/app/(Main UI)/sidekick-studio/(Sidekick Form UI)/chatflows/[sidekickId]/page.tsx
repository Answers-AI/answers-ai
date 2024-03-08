import React from 'react';
import { authOptions } from '@ui/authOptions';
import { getAppSettings } from '@ui/getAppSettings';
import getCachedSession from '@ui/getCachedSession';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickDetailPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);
  const sidekickId = params?.sidekickId;
  const { chatflowDomain } = session?.user ?? {};

  // Return the iframe element with the constructed URL
  // Ensure to adjust the width, height, and other attributes as per your requirements
  return (
    <iframe
      src={`${chatflowDomain}/chatflows/${sidekickId}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen></iframe>
  );
};

export default SidekickDetailPage;
