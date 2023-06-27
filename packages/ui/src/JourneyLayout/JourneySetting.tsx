import React from 'react';

import SourcesAirtable from './SourcesAirtable';
import SourcesConfluence from './SourcesConfluence';
import SourcesDocubot from './SourcesDocubot';
import SourcesFile from '@ui/SourcesFile';
import SourcesJira from './SourcesJira';
import SourcesSlack from './SourcesSlack';
import SourcesWeb from '../SourcesWeb';
import SourcesYoutube from '../SourcesYoutube';
import SourcesDocument from '../SourcesDocument';
import SourcesZoom from '../SourcesZoom';

const JOURNEY_SETTINGS: { [key: string]: any } = {
  airtable: SourcesAirtable,
  confluence: SourcesConfluence,
  docubot: SourcesDocubot,
  files: SourcesFile,
  jira: SourcesJira,
  slack: SourcesSlack,
  web: SourcesWeb,
  documents: SourcesDocument,
  zoom: SourcesZoom,
  youtube: SourcesYoutube
};

const JourneySettings = ({ app, ...other }: any) => {
  const Component = JOURNEY_SETTINGS[app];

  if (!Component && app) return <div>There are currently no filters available for {app}.</div>;
  if (Component) return <Component {...other} />;

  return null;
};

export default JourneySettings;
