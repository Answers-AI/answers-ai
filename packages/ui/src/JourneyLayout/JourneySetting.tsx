import React from 'react';

import SourcesWeb from '../SourcesWeb';
import SourcesJira from './SourcesJira';
import SourcesConfluence from './SourcesConfluence';
import SourcesAirtable from './SourcesAirtable';
import SourcesDocubot from './SourcesDocubot';
import SourcesSlack from './SourcesSlack';

const JOURNEY_SETTINGS: { [key: string]: any } = {
  jira: SourcesJira,
  slack: SourcesSlack,
  confluence: SourcesConfluence,
  docubot: SourcesDocubot,
  airtable: SourcesAirtable,
  web: SourcesWeb
};

const JourneySettings = ({ app, ...other }: any) => {
  const Component = JOURNEY_SETTINGS[app];

  if (!Component && app) return <div>There are currently no filters available for {app}.</div>;
  if (Component) return <Component {...other} />;

  return null;
};

export default JourneySettings;
