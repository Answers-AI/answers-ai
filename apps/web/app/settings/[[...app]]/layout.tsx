import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';

import { SettingsLayout } from '@ui/SettingsLayout';
const Settings = async ({ children, params }: any) => {
  const appSettings = await getAppSettings();
  return (
    <SettingsLayout appSettings={appSettings} activeApp={params?.app}>
      {React.cloneElement(children, { appSettings })}
    </SettingsLayout>
  );
};

export default Settings;
