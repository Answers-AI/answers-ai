import AppSyncToolbar from '@web/AppSyncToolbar';
import React from 'react';
import { getAppSettings } from '@web/getAppSettings';

export const metadata = {
  title: 'Events | Answers AI'
};
const Inngest = async () => {
  const appSettings = await getAppSettings();
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <AppSyncToolbar appSettings={appSettings} />
        <iframe
          src={process.env.INNGEST_SERVER_URL || 'http://localhost:8288/'}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </>
  );
};
export default Inngest;
