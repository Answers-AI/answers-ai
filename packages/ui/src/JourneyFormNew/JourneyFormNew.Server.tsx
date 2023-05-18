import React from 'react';
import JourneyFormNewclient from './JourneyFormNew.Client';

import { AppSettings } from 'types';

const JourneyFormNew = (props: { appSettings: AppSettings }) => {
  return <JourneyFormNewclient {...props} />;
};

export default JourneyFormNew;
