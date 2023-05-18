import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import JourneyFormNew from '@ui/JourneyFormNew';
import { prisma } from 'db/dist';

const NewJourneyPage = async ({}: any) => {
  const appSettings = await getAppSettings();
  return (
    <>
      <JourneyFormNew appSettings={appSettings}></JourneyFormNew>
    </>
  );
};

export default NewJourneyPage;
