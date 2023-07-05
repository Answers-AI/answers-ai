import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import SidekickList from '@ui/SidekickList';

export const metadata = {
  title: 'Sidekicks | Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const NewSidekickPage = async ({ params }: any) => {
  const appSettings = await getAppSettings();
  return <SidekickList {...params} appSettings={appSettings}></SidekickList>;
};

export default NewSidekickPage;
