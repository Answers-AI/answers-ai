import React from 'react';
import JourneyFormNewclient from './JourneyFormNew.Client';

import { AppSettings, User } from 'types';

const JourneyFormNew = (props: { appSettings: AppSettings; user: User }) => {
  return <JourneyFormNewclient {...props} />;
};

export default JourneyFormNew;
