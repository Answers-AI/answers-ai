'use client';
import React from 'react';

import { AppSettings } from 'types';

const FlowiseLayout = ({
  appSettings,
  children
}: {
  appSettings: AppSettings;
  children: React.ReactNode;
}) => {
  return (
    <main style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        {children}
      </div>
    </main>
  );
};

export default FlowiseLayout;
