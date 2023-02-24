import AppSyncToolbar from '../../src/AppSyncToolbar';
import React from 'react';
import { getAppSettings } from '../../src/getAppSettings';

const DB_STUDIO = async () => {
  const appSettings = await getAppSettings();
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <iframe
          src={process.env.DB_STUDIO_SERVER_URL || 'http://localhost:5555/'}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </div>
    </>
  );
};
export default DB_STUDIO;
