import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import SidekickList from '@ui/SidekickList';
import { prisma } from '@db/client';

const NewSidekickPage = async ({}: any) => {
  const appSettings = await getAppSettings();
  return (
    <>
      <SidekickList appSettings={appSettings}></SidekickList>
    </>
  );
};

export default NewSidekickPage;
