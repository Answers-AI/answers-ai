import React from 'react';
import getCachedSession from '@ui/getCachedSession';
import IframeNavigator from '@ui/IframeNavigator';
import { redirect } from 'next/navigation';

export const SidekickListPage = async ({ params }: any) => {
  // Fetch app settings
  const session = await getCachedSession();
  const path = params.path?.join('/');
  console.log('Path', path);
  if (!path) redirect('/sidekick-studio/chatflows');
  // Extract hostname from appSettings if available
  // const hostname = appSettings?.hostname; // Need to add this to appSettings
  // Construct the URL for the iframe. Adjust the path as needed.
  const { chatflowDomain } = session?.user ?? {};

  // Return the iframe element with the constructed URL
  // Ensure to adjust the width, height, and other attributes as per your requirements
  return (
    <IframeNavigator
      src={`${chatflowDomain}/${path}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
    />
  );
};
