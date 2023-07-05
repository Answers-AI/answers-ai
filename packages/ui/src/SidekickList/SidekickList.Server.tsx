import React from 'react';
import SidekickListClient from './SidekickList.Client';
import { AppSettings } from 'types';

const SidekickList = async (props: { appSettings: AppSettings }) => {
  return <SidekickListClient {...props} />;
};

export default SidekickList;
