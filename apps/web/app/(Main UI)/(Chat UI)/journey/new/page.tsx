import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import JourneyFormNew from '@ui/JourneyFormNew';

import getCachedSession from '@ui/getCachedSession';

const NewJourneyPage = async ({}: any) => {
  const appSettings = await getAppSettings();
  const session = await getCachedSession();

  return (
    <>
      <JourneyFormNew user={session?.user!} appSettings={appSettings}></JourneyFormNew>
    </>
  );
};

export default NewJourneyPage;
