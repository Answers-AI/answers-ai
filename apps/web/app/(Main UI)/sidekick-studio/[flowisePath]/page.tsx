import React from 'react';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const FlowisePage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);
  const { chatflowDomain } = session?.user ?? {};
  const flowisePath = params?.flowisePath;

  // Return the iframe element with the constructed URL
  // Ensure to adjust the width, height, and other attributes as per your requirements
  return (
    <iframe
      src={`${chatflowDomain}/${flowisePath}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen></iframe>
  );
};

export default FlowisePage;
