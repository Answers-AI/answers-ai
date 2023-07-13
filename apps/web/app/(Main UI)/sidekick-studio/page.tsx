import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import SidekickLists from '@ui/SidekickLists';

export const metadata = {
  title: 'Sidekicks | Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickListPage = async ({ params }: any) => {
  const appSettings = await getAppSettings();
  return <SidekickLists {...params} appSettings={appSettings}></SidekickLists>;
};

export default SidekickListPage;
