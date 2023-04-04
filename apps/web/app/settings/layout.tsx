import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';

import SettingsDrawer from '@ui/SettingsDrawer';

const Settings = async ({ children, params }: any) => {
  const appSettings = await getAppSettings();
  console.log('settings/app/settings/layout ', params);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <SettingsDrawer />
      <main style={{ width: '100%', overflow: 'auto', height: '100%' }}>
        {React.cloneElement(children, { appSettings })}
      </main>
    </div>
  );
};

export default Settings;
