'use client';
import React, { useState, useEffect } from 'react';
import { Sidekick, AppSettings } from 'types';
// import axios from 'axios';
import SidekickStudioDrawer from '../SidekickStudioDrawer';

const SidekickFormLayout = ({
  appSettings,
  children,
  sidekicks
}: {
  appSettings: AppSettings;
  children: React.ReactNode;
  sidekicks: Sidekick[];
}) => {
  // const [sidekicks, setSidekicks] = useState<Sidekick[]>([]);

  // useEffect(() => {
  //   const fetchSidekicks = async () => {
  //     try {
  //       const response = await axios.get('/api/sidekicks');
  //       console.log({ response });
  //       setSidekicks(response.data);
  //     } catch (error) {
  //       console.error('Error fetching sidekicks:', error);
  //     }
  //   };

  //   fetchSidekicks();
  // }, []);

  return (
    <main style={{ display: 'flex', width: '100%', height: '100%' }}>
      <SidekickStudioDrawer sidekicks={sidekicks} />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        {children}
      </div>
    </main>
  );
};

export default SidekickFormLayout;
