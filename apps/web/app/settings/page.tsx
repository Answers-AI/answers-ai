import React from 'react';
import { AppSettings } from 'types';
import { AppSettingsForm } from '../../src/AppSettingsForm';
const Settings = async () => {
  const response = await fetch(`http://localhost:3000/api/settings`, {
    cache: 'no-store'
  });
  const settings = await response.json();
  console.log('AppSettings', settings);
  return (
    <>
      <AppSettingsForm appSettings={settings} />
    </>
  );
};

export default Settings;
