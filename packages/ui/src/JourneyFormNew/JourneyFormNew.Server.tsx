import React from 'react';
import JourneyFormNewclient from './JourneyFormNew.Client';

import { AppSettings, User, Journey } from 'types';

const JourneyFormNew = (props: { appSettings: AppSettings; user: User; journey: Journey }) => {
  return <JourneyFormNewclient {...props} />;
};

export default JourneyFormNew;
