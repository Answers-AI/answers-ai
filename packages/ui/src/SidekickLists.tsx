'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import SnackMessage from './SnackMessage';
import SidekickList from './SidekickList';
import { SidekickListItem, AppSettings } from 'types';

const SidekickTabs = ({ appSettings }: { appSettings: AppSettings }) => {
  const [currentTab, setCurrentTab] = useState('Favorites');
  const [favoriteSidekicks, setFavoriteSidekicks] = useState<SidekickListItem[]>([]);
  const [privateSidekicks, setPrivateSidekicks] = useState<SidekickListItem[]>([]);
  const [orgSidekicks, setOrgSidekicks] = useState<SidekickListItem[]>([]);
  const [globalSidekicks, setGlobalSidekicks] = useState<SidekickListItem[]>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Flags to track if data has been fetched for each tab
  const [isFavoritesFetched, setIsFavoritesFetched] = useState(false);
  const [isPrivateFetched, setIsPrivateFetched] = useState(false);
  const [isOrganizationFetched, setIsOrganizationFetched] = useState(false);
  const [isGlobalFetched, setIsGlobalFetched] = useState(false);

  // useEffect(() => {
  //   const fetchSidekicks = async () => {
  //     try {
  //       let response;
  //       if (currentTab === 'Favorites' && !isFavoritesFetched) {
  //         response = await axios.get('/api/sidekicks/list/favorite');
  //         setFavoriteSidekicks(response.data);
  //         setIsFavoritesFetched(true); // Set flag to true after fetching data
  //       } else if (currentTab === 'Private' && !isPrivateFetched) {
  //         response = await axios.get('/api/sidekicks/list/private');
  //         setPrivateSidekicks(response.data);
  //         setIsPrivateFetched(true); // Set flag to true after fetching data
  //       } else if (currentTab === 'Organization' && !isOrganizationFetched) {
  //         response = await axios.get('/api/sidekicks/list/org');
  //         setOrgSidekicks(response.data);
  //         setIsOrganizationFetched(true); // Set flag to true after fetching data
  //       } else if (currentTab === 'Global' && !isGlobalFetched) {
  //         response = await axios.get('/api/sidekicks/list/global');
  //         setGlobalSidekicks(response.data);
  //         setIsGlobalFetched(true); // Set flag to true after fetching data
  //       } else {
  //         return;
  //       }
  //     } catch (error) {
  //       console.error('Error fetching sidekicks:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // Skip fetching data during initial render
  //   if (isInitialRender) {
  //     setIsInitialRender(false);
  //   } else {
  //     setIsLoading(true);
  //     fetchSidekicks();
  //   }
  // }, [
  //   isInitialRender,
  //   currentTab,
  //   isFavoritesFetched,
  //   isPrivateFetched,
  //   isOrganizationFetched,
  //   isGlobalFetched
  // ]);

  const getEndpoint = (tab: string) => {
    // Map the tab to the corresponding endpoint
    if (tab === 'Favorites') {
      return '/api/sidekicks/list/favorite';
    } else if (tab === 'Private') {
      return '/api/sidekicks/list/private';
    } else if (tab === 'Organization') {
      return '/api/sidekicks/list/org';
    } else if (tab === 'Global') {
      return '/api/sidekicks/list/global';
    } else {
      return '';
    }
  };

  // const endpoint = getEndpoint(currentTab);

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Box p={8}>
      <SnackMessage message={isLoading ? '...Loading' : ''} />

      <Typography variant="h2" component="h1">
        Sidekicks
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <NextLink href="/sidekick-studio/new" passHref>
          <Button variant="outlined">Add New Sidekick</Button>
        </NextLink>
      </Box>

      <Tabs value={currentTab} onChange={handleTabChange} centered sx={{ mb: 4 }}>
        <Tab label="Favorites" value="Favorites" />
        <Tab label="Private" value="Private" />
        <Tab label="Organization" value="Organization" />
        <Tab label="Global" value="Global" />
      </Tabs>
      <Box role="tabpanel" hidden={currentTab !== 'Favorites'}>
        <SidekickList endpoint={getEndpoint('Favorites')} appSettings={appSettings} />
      </Box>
      <Box role="tabpanel" hidden={currentTab !== 'Private'}>
        <SidekickList endpoint={getEndpoint('Private')} appSettings={appSettings} />
      </Box>
      <Box role="tabpanel" hidden={currentTab !== 'Organization'}>
        <SidekickList endpoint={getEndpoint('Organization')} appSettings={appSettings} />
      </Box>
      <Box role="tabpanel" hidden={currentTab !== 'Global'}>
        <SidekickList endpoint={getEndpoint('Global')} appSettings={appSettings} />
      </Box>

      {/* <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Favorites" value="Favorites" />
        <Tab label="Private" value="Private" />
        <Tab label="Organization" value="Organization" />
        <Tab label="Global" value="Global" />
      </Tabs>

      <SidekickList endpoint={endpoint} appSettings={appSettings} /> */}
    </Box>
  );
};

export default SidekickTabs;
