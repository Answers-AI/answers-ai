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
  Box,
  ClickAwayListener
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import { AppService, AppSettings } from 'types';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import NextLink from 'next/link';
import SelectedListItem from './SelectedListItem';
import { useFlags } from 'flagsmith/react';
import { redirect } from 'next/navigation';
import IntegrationCard from './IntegrationCard';

export const SettingsLayout = ({
  appSettings,
  activeApp,
  children
}: {
  appSettings: AppSettings;
  activeApp: string;
  children?: any;
}) => {
  const flags = useFlags(['settings']);
  if (!flags?.settings?.enabled) return redirect('/');
  return (
    <Container
      sx={{
        flex: 1,
        height: '100%',
        position: 'relative',
        py: 2,
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
  );
};

const AppsDrawer = ({
  appSettings,
  activeApp
}: {
  appSettings: AppSettings;
  activeApp: string;
}) => {
  // const [expanded, setExpanded] = React.useState<any>({
  //   // ...appSettings?.services?.reduce((accum, item, idx) => ({ ...accum, [idx]: item.enabled }), {})
  // });
  const [expanded, setExpanded] = React.useState<AppService | null>(null);
  console.log('Expanded', expanded);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          gap: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gridAutoFlow: 'dense',
          transition: '.3s'
          // ...Object.keys(expanded).reduce(
          //   (accum, key) => ({
          //     ...accum,
          //     [`> *:nth-child(${parseInt(key) + 1})`]: expanded[key]
          //       ? { transition: '.3s', gridColumn: 'span 2' }
          //       : {}
          //   }),
          //   {}
          // )
        }}>
        {appSettings?.services?.map((item, idx) => (
          <IntegrationCard
            key={item?.id}
            {...item}
            expanded={false}
            onClick={() => setExpanded(item)}
          />
        ))}
      </Box>
      <AnimatePresence>
        {!!expanded ? (
          <Box
            // open={!!expanded}
            // onClose={() => setExpanded(null)}
            component={motion.div}
            key="modal"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              placeContent: 'center',
              placeItems: 'center',
              // transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              height: '100%',
              width: '100%',
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.4)'
            }}>
            <ClickAwayListener onClickAway={() => setExpanded(null)}>
              <Box
                component={motion.div}
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  placeContent: 'center',
                  placeItems: 'center',
                  width: '100%',
                  maxWidth: '900px',
                  willChange: 'transform',
                  pointerEvents: 'all'
                }}>
                <IntegrationCard {...expanded} expanded />
              </Box>
            </ClickAwayListener>
          </Box>
        ) : null}
      </AnimatePresence>
    </>
  );
};
