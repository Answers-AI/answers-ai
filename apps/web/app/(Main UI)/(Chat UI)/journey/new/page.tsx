import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import JourneyFormNew from '@ui/JourneyFormNew';
import { prisma } from 'db/dist';

const NewJourneyPage = async ({}: any) => {
  const appSettings = await getAppSettings();
  // const sources = await prisma.document
  //   .findMany({
  //     where: {
  //       source: 'web'
  //     }
  //   })
  //   .then((data: any) => JSON.parse(JSON.stringify(data)));

  return (
    <>
      <JourneyFormNew appSettings={appSettings}></JourneyFormNew>
    </>
  );
};

export default NewJourneyPage;
