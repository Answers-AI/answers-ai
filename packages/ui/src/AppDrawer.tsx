'use client';
import React, { useState, useRef } from 'react';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SmartToy from '@mui/icons-material/SmartToy';
import AIIcon from '@mui/icons-material/SmartButton';

const drawerWidth = 240;

const menuConfig = [
  // {
  //   text: 'New Chat',
  //   link: '/chat',
  //   icon: <MessageIcon />
  //   // subMenu: [
  //   //   { text: 'Dashboard', link: '/' },
  //   //   { text: 'New Chat', link: '/chat' },
  //   //   { text: 'New Project', link: '/journey/new' }
  //   // ]
  // },
  {
    text: 'Sidekick Studio',
    // link: '/sidekick-studio',
    icon: <SmartToy />,
    subMenu: [
      { text: 'Sidekicks', link: '/sidekick-studio/assistants' },
      { text: 'Workflows', link: '/sidekick-studio/chatflows' },
      { text: 'Templates', link: '/sidekick-studio/marketplaces' },
      { text: 'Tools', link: '/sidekick-studio/tools' },
      { text: 'Variables', link: '/sidekick-studio/variables' },
      { text: 'Credentials', link: '/sidekick-studio/credentials' }
    ]
  },
  { text: 'Knowledge Base', link: '/knowledge-base', icon: <AIIcon /> },
  {
    text: 'Settings',
    // link: '/settings',
    icon: <SettingsIcon />,
    subMenu: [
      { text: 'Organization', link: '/settings/organization' },
      { text: 'User', link: '/settings/user' }
    ]
  }
  // {
  //   text: 'Developer',
  //   // link: '#',
  //   icon: <StorageIcon />,
  //   subMenu: [
  //     { text: 'Ingest', link: '/developer/ingest' },
  //     { text: 'Prisma', link: '/developer/prisma' },
  //     { text: 'Tracing', link: '/developer/tracing' },
  //     { text: 'API Keys', link: '/developer/apikey' }
  //   ]
  // }
];

export const AppDrawer = ({ session, chatList }: any) => {
  const user = session?.user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState('');
  // Drawer style based on open state
  const drawerStyle = {
    width: drawerOpen ? drawerWidth : 0, // Adjust width based on state
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: 'width 0.5s ease'
  };

  // Updated Drawer component to include onMouseEnter and onMouseLeave
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      'width': open ? drawerWidth : theme.spacing(7),
      'flexShrink': 0,
      'whiteSpace': 'nowrap',
      'transition': theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      '& .MuiDrawer-paper': {
        overflowY: 'hidden'
      },
      ...(open && {
        'width': drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth
          // onMouseEnter: () => setDrawerOpen(true),
          // onMouseLeave: () => setDrawerOpen(false)
        }
      }),
      ...(!open && {
        '& .MuiDrawer-paper': {
          width: theme.spacing(7)
          // onMouseEnter: () => setDrawerOpen(true),
          // onMouseLeave: () => setDrawerOpen(false)
        }
      })
    })
  );

  return (
    <Drawer
      open={drawerOpen}
      variant="permanent"
      onMouseEnter={() => setDrawerOpen(true)}
      onMouseLeave={() => setDrawerOpen(false)}>
      {/* <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <NextLink href="/">
          <Avatar sx={{ objectFit: 'contain' }}>AI</Avatar>
        </NextLink>
      </DrawerHeader> */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>{chatList}</Box>

      <List sx={{ display: 'flex', flexDirection: 'column' }} disablePadding>
        {menuConfig.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setSubmenuOpen(item.text == submenuOpen ? '' : item.text)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography>{item.text}</Typography>
              </ListItemButton>
            </ListItem>
            {drawerOpen ? (
              <Collapse in={submenuOpen === item?.text} timeout="auto">
                {item?.subMenu?.map((subItem) => (
                  <ListItem key={subItem.text} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton component={NextLink} href={subItem.link}>
                      <Typography>{subItem.text}</Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </Collapse>
            ) : null}
          </React.Fragment>
        ))}

        <ListItem disablePadding sx={{ display: 'block' }}>
          <Tooltip
            title={
              <Typography variant="body2">
                {user?.name}
                <br />
                {user?.email}
                <br />
                {user?.org_name}
              </Typography>
            }>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pl: 1 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  src={user?.image}
                  sx={{
                    bgcolor: 'secondary.main',
                    height: '32px',
                    width: '32px'
                  }}
                />
                <Box>
                  <Typography variant="body2">{user?.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {user?.org_name}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                aria-label={'sign out'}
                href="/api/auth/logout"
                sx={{ minHeight: 48, width: 48, justifyContent: 'center' }}>
                <ExitToAppIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
  );
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default AppDrawer;
