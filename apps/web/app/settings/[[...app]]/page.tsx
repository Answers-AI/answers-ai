import React from 'react';
import { AppSettings } from 'types';

import JiraSettings from '../../../src/JiraSettings';
import SlackSettings from '../../../src/SlackSettings';

const SETTINGS: { [key: string]: any } = {
  jira: JiraSettings,
  slack: SlackSettings
};

const AppSettingPage = async ({ params }: any) => {
  const response = await fetch(`http://localhost:3000/api/settings`, { cache: 'no-store' });
  const appSettings: AppSettings = await response.json();
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
