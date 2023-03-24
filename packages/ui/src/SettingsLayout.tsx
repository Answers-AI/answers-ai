'use client';
import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  Box,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container
} from '@mui/material';

import { AppSettings } from 'types';
import useAppSettings from './useAppSettings';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import NextLink from 'next/link';
import SelectedListItem from './SelectedListItem';

export const SettingsLayout = ({
  appSettings,
  activeApp,
  children
}: {
  appSettings: AppSettings;
  activeApp: string;
  children?: any;
}) => {
  const { isLoading, updateAppSettings } = useAppSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(appSettings);
  React.useEffect(() => {
    setLocalSettings(appSettings);
  }, [appSettings]);
  const handleSave = () => {
    updateAppSettings(localSettings);
  };

  const handleJiraProjectsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      jiraProjects: event.target.value.split(',')
    }));
  };

  const handleSlackChannelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      slackChannels: event.target.value.split(',')
    }));
  };
  const handleEnableProject = (project: { key: string; enabled: boolean }) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      jira: {
        ...prevSettings?.jira,
        projects: prevSettings?.jira?.projects?.map((p) => {
          if (p.key === project.key) {
            return {
              ...p,
              enabled: !p.enabled
            };
          }
          return p;
        })
      }
    }));
  };
  const handleEnableService = (service: { name: string; enabled: boolean }) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      services: prevSettings?.services?.map((p) => {
        if (p.name === service.name) {
          return {
            ...p,
            enabled: !p.enabled
          };
        }
        return p;
      })
    }));
  };
  // return <div>Loading...</div>;

  return (
    <Container>
      <Grid2 container sx={{ flex: 1, position: 'relative', p: 4, gap: 4 }}>
        <Grid2
          sx={{
            height: '100%',

            top: (theme) => theme.spacing(3),
            overflow: 'auto',
            position: 'sticky'
          }}>
          <AppsDrawer appSettings={appSettings} activeApp={activeApp} />
        </Grid2>
        <Grid2 xs sx={{}}>
          {children}
        </Grid2>
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
  // console.log('params', params);
  // // const activeLink = React.useEffect(() => {
  // //   const path = window.location.pathname;
  // //   return path;
  // // }, []);
  // const { pathname } = params;
  // // const {} = useRouter();

  return (
    <SelectedListItem
      sx={{
        height: '100%',
        minWidth: 200,
        borderRadius: 1,
        // px: 2,
        textTransform: 'capitalize'
      }}
      items={[
        ...(appSettings?.services?.map((service) => ({
          text: service?.name,
          link: '/settings/' + service?.name,
          enabled: service?.enabled,
          icon: (
            <Avatar sx={{ width: 30, height: 30, borderRadius: 2 }} src={service?.imageURL}>
              {service?.name[0]?.toUpperCase()}
            </Avatar>
          )
        })) || [])
      ]}
      renderItem={(item) => (
        <ListItemButton
          prefetch={false}
          component={NextLink}
          href={item?.link}
          key={item?.link}
          sx={{ display: 'flex', gap: 2 }}
          selected={activeApp == item?.text}
          disabled={!item?.enabled}>
          <ListItemIcon sx={{ minWidth: 0 }}>{item?.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      )}
    />
    // <Drawer
    //   variant="permanent"
    //   open={true}
    //   sx={{
    //     'borderLeft': '1px solid black',
    //     '.MuiDrawer-paper': { position: 'relative', background: 'black', borderRadius: 1 }
    //   }}>

    // </Drawer>
  );
};
