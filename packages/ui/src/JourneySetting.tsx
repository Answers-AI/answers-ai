import React from 'react';

import SourcesAirtable from '@ui/SourcesAirtable';
import SourcesConfluence from '@ui/SourcesConfluence';
import SourcesCodebase from '@ui/SourcesCodebase';
import SourcesFile from '@ui/SourcesFile';
import SourcesJira from '@ui/SourcesJira';
import SourcesSlack from '@ui/SourcesSlack';
import SourcesWeb from '@ui/SourcesWeb';
import SourcesYoutube from '@ui/SourcesYoutube';
import SourcesDocument from '@ui/SourcesDocument';
import SourcesZoom from '@ui/SourcesZoom';

const JOURNEY_SETTINGS: { [key: string]: any } = {
  airtable: SourcesAirtable,
  confluence: SourcesConfluence,
  codebase: SourcesCodebase,
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
