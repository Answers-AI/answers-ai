import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import { AppSettings } from 'types';

import JiraSettings from '@ui/JiraSettings';
import SlackSettings from '@ui/SlackSettings';
import ConfluenceSettings from '@ui/ConfluenceSettings';

const SETTINGS: { [key: string]: any } = {
  jira: JiraSettings,
  slack: SlackSettings,
  confluence: ConfluenceSettings
};

const AppSettingPage = async ({ params }: any) => {
  const appSettings = await getAppSettings();
  const Component = SETTINGS[params.app];
  if (!Component && params.app)
    return (
      <div>
        We are working hard to bring support for {params.app}. Subscribe to the newsletter to hear
        when this integration is ready
      </div>
    );
  if (Component) return <Component appSettings={appSettings} />;

  return null;
};

export default AppSettingPage;
