import React from 'react';
import { getAppSettings } from '@ui/getAppSettings';
import IntegrationSettings from '@ui/IntegrationSetting';

const AppSettingPage = async ({ params }: any) => {
  const appSettings = await getAppSettings();

  // return <IntegrationSettings app={params.app} appSettings={appSettings} editable />;
};

export default AppSettingPage;
