'use client';
import React, { useState } from 'react';
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Dialog,
  Typography,
  Box
} from '@mui/material';

import { AppService, AppSettings } from 'types';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import NextLink from 'next/link';
import SelectedListItem from './SelectedListItem';
import { useFlags } from 'flagsmith/react';
import { redirect } from 'next/navigation';
import { AppsDrawer } from './AppsDrawer';
import { AnswersProvider } from './AnswersContext';

export const IntegrationsSettings = ({
  appSettings,
  activeApp
}: {
  appSettings: AppSettings;
  activeApp?: string;
}) => {
  // const flags = useFlags(['settings']);

  // if (!flags?.settings?.enabled) return redirect('/');
  return (
    <AnswersProvider appSettings={appSettings}>
      <Container
        sx={{
          flex: 1,
          height: '100%',
          position: 'relative',
          py: 2,
          px: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
        <Box>
          <Typography variant="h4">Integrations</Typography>
          <Typography>Manage your data sources and other connections</Typography>
        </Box>

        <Grid2 container sx={{ gap: 2, width: '100%' }}>
          <AppsDrawer appSettings={appSettings} activeApp={activeApp} />
        </Grid2>
      </Container>
    </AnswersProvider>
  );
};
