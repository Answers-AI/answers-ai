import React from 'react';

import getCachedSession from '@ui/getCachedSession';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const ChatFlowsPage = async ({ params }: any) => {
  const session = await getCachedSession();
  const { chatflowDomain } = session?.user ?? {};

  return (
    <iframe
      src={`${chatflowDomain}/chatflows/`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen></iframe>
  );
};

export default ChatFlowsPage;
