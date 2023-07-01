import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import SidekickFormNew from '@ui/SidekickFormNew';
import { prisma } from '@db/client';

const NewSidekickPage = async ({}: any) => {
  const appSettings = await getAppSettings();
  return (
    <>
      <SidekickFormNew appSettings={appSettings}></SidekickFormNew>
    </>
  );
};

export default NewSidekickPage;
