'use client';
import React, { useState } from 'react';
import { useFlags } from 'flagsmith/react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import SnackMessage from './SnackMessage';
import SyncStatusList from './SyncStatusList';

import { AppSettings } from 'types';

const SyncStausLists = ({ appSettings }: { appSettings: AppSettings }) => {
  const flags = useFlags(['sidekicks_system']);
  const [currentTab, setCurrentTab] = useState('UserDocs');
  const [isLoading, setIsLoading] = useState(true);

  const getEndpoint = React.useCallback((tab: string) => {
    // Map the tab to the corresponding endpoint
    if (tab === 'UserDocs') {
      return '/api/sync/status/user-documents';
    } else if (tab === 'Web') {
      return '/api/sync/status/web';
    } else {
      return '';
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Box p={8}>
      <SnackMessage message={isLoading ? '...Loading' : ''} />

      <Typography variant="h2" component="h1">
        Document Status
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Tabs value={currentTab} onChange={handleTabChange} centered sx={{ mb: 4 }}>
        <Tab label="My Stuff" value="UserDocs" />
        <Tab label="Web" value="Web" />
      </Tabs>
      <Box role="tabpanel" hidden={currentTab !== 'UserDocs'}>
        <SyncStatusList endpoint={getEndpoint('UserDocs')} appSettings={appSettings} />
      </Box>
      <Box role="tabpanel" hidden={currentTab !== 'Web'}>
        <SyncStatusList
          endpoint={getEndpoint('Web')}
          appSettings={appSettings}
          prefilterSource="web"
        />
      </Box>
    </Box>
  );
};

export default SyncStausLists;
