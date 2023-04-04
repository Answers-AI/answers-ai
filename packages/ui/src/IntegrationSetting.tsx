import React from 'react';

import JiraSettings from './JiraSettings';
import SlackSettings from './SlackSettings';
import ConfluenceSettings from './ConfluenceSettings';
import { useAnswers } from './AnswersContext';

const SETTINGS: { [key: string]: any } = {
  jira: JiraSettings,
  slack: SlackSettings,
  confluence: ConfluenceSettings
};

const AppSettingPage = ({ app }: any) => {
  const Component = SETTINGS[app];
  const { appSettings } = useAnswers();
  if (!Component && app)
    return (
      <div>
        We are working hard to bring support for {app}. Subscribe to the newsletter to hear when
        this integration is ready
      </div>
    );
  if (Component) return <Component appSettings={appSettings} />;

  return null;
};

export default AppSettingPage;
