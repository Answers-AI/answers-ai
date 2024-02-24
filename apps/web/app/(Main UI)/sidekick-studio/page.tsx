// Import getAppSettings from your utility functions
import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';

export const metadata = {
  title: 'Sidekicks | Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickListPage = async ({ params }: any) => {
  // Fetch app settings
  const appSettings = await getAppSettings();

  // Extract hostname from appSettings if available
  // const hostname = appSettings?.hostname; // Need to add this to appSettings

  // Construct the URL for the iframe. Adjust the path as needed.
  const hostname = `http://localhost:8080/`;

  // Return the iframe element with the constructed URL
  // Ensure to adjust the width, height, and other attributes as per your requirements
  return (
    <iframe src={hostname} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
  );
};

export default SidekickListPage;
