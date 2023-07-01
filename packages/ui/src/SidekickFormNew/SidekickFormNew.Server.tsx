import React from 'react';
import SidekickFormNewClient from './SidekickFormNew.Client';

import { AppSettings } from 'types';

const SidekickFormNew = (props: { appSettings: AppSettings }) => {
  return <SidekickFormNewClient {...props} />;
};

export default SidekickFormNew;
