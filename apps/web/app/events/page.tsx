import AppSyncToolbar from '../../src/AppSyncToolbar';
import React from 'react';

const Inngest = async () => {
  const response = await fetch(`http://localhost:3000/api/settings`, { cache: 'no-store' });
  const appSettings = await response.json();
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
