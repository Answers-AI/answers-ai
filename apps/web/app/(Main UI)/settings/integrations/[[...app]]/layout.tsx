import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';

import { IntegrationsSettings } from '@ui/IntegrationsSettings';

const Settings = async ({ children, params, ...other }: any) => {
  const appSettings = await getAppSettings();

  console.log('settings/integrations ', { params, other });

  const [activeApp] = params?.app || [];
  return (
    <>
      <IntegrationsSettings appSettings={appSettings} activeApp={activeApp}></IntegrationsSettings>
      {React.cloneElement(children, { appSettings })}
    </>
  );
};

export default Settings;
