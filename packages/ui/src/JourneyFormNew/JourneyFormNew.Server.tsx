import React from 'react';
import JourneyFormNewclient from './JourneyFormNew.Client';

import { AppSettings } from 'types';

const JourneyFormNew = (props: { appSettings: AppSettings }) => {
  const handleSubmit = async (event: any) => {
    'use server';
    event.preventDefault();
    // Handle form submission logic heres
  };
  return <JourneyFormNewclient {...props} handleSubmit={handleSubmit} />;
};

export default JourneyFormNew;
