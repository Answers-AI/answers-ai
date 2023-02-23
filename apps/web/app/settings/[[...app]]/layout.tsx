import React from 'react';

import { SettingsLayout } from '../../../src/SettingsLayout';
const Settings = async ({ children, params }: any) => {
  const response = await fetch(`http://localhost:3000/api/settings`, { cache: 'no-store' });
  const appSettings = await response.json();
  return (
    <SettingsLayout appSettings={appSettings} activeApp={params?.app}>
      {React.cloneElement(children, { appSettings })}
    </SettingsLayout>
  );
};

export default Settings;
