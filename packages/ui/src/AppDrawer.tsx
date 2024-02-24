'use client';
import React, { useState, useRef } from 'react';
import { useFlags } from 'flagsmith/react';

import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import MessageIcon from '@mui/icons-material/QueryBuilder';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SmartToy from '@mui/icons-material/SmartToy';
import AIIcon from '@mui/icons-material/SmartButton';

import closedMixin from './theme/closedMixin';
import openedMixin from './theme/openedMixin';

const drawerWidth = 240;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const menuConfig = [
  {
    text: 'Home',
    link: '/',
    icon: <HomeIcon />,
    subMenu: [
      { text: 'New Chat', link: '/chat' },
      { text: 'New Project', link: '/journey/new' }
    ]
  },
  {
    text: 'Sidekick Studio',
    link: '/sidekick-studio',
    icon: <SmartToy />,
    subMenu: [
      { text: 'Sidekicks', link: '/sidekick-studio/assistants' },
      { text: 'Workflows', link: '/sidekick-studio/chatflows' },
      { text: 'Templates', link: '/sidekick-studio/marketplaces' },
      { text: 'Tools', link: '/sidekick-studio/tools' },
      { text: 'Variables', link: '/sidekick-studio/variables' }
    ]
  },
  { text: 'Knowledge Base', link: '/knowledge-base', icon: <AIIcon /> },
  {
    text: 'Settings',
    link: '/settings',
    icon: <SettingsIcon />,
    subMenu: [
      { text: 'Integrations', link: '/settings/integrations' },
      { text: 'Organization', link: '/settings/organization' },
      { text: 'User', link: '/settings/user' }
    ]
  },
  {
    text: 'Developer',
    link: '#',
    icon: <StorageIcon />,
    subMenu: [
      { text: 'Ingest', link: '/developer/ingest' },
      { text: 'Prisma', link: '/developer/prisma' },
      { text: 'Tracing', link: '/developer/tracing' }
    ]
  }
];

export const AppDrawer = ({ session }: any) => {
  const flags = useFlags(['settings']);
  const user = session?.user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuItems, setSubmenuItems] = useState([]);

  const toggleDrawer =
    (open, items = []) =>
    () => {
      setDrawerOpen(open);
      setSubmenuItems(items); // Set submenu items when toggling
    };

  // Drawer style based on open state
  const drawerStyle = {
    width: drawerOpen ? drawerWidth : 0, // Adjust width based on state
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: 'width 0.5s ease'
  };

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: open ? drawerWidth : theme.spacing(7), // Adjust this value to your collapsed width
      flexShrink: 0,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      ...(open && {
        'width': drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth
        }
      }),
      ...(!open && {
        '& .MuiDrawer-paper': {
          width: theme.spacing(7) // Adjust this value to your collapsed width
        }
      })
    })
  );

  return (
    <Drawer open={drawerOpen} variant="permanent">
      {/* <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <NextLink href="/">
          <Avatar sx={{ objectFit: 'contain' }}>AI</Avatar>
        </NextLink>
      </DrawerHeader> */}

      <List sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        {menuConfig.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={toggleDrawer(true, item.subMenu || [])}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {drawerOpen && <Typography>{item.text}</Typography>}{' '}
              {/* Show text if drawer is open */}
            </ListItemButton>
          </ListItem>
        ))}
        {/* Render submenu items if drawer is open */}
        {drawerOpen &&
          submenuItems.map((subItem) => (
            <ListItem key={subItem.text} disablePadding>
              <NextLink href={subItem.link} passHref>
                <ListItemButton component="a">
                  <Typography sx={{ pl: 4 }}>{subItem.text}</Typography>
                </ListItemButton>
              </NextLink>
            </ListItem>
          ))}
        <Box sx={{ flex: 1 }}> </Box>

        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
              // minHeight: 48,
              width: 48
            }}>
            <Tooltip
              title={
                <Typography variant="body2">
                  {user?.name}
                  <br />
                  {user?.email}
                </Typography>
              }>
              <div>
                <Avatar
                  src={user?.image}
                  sx={{
                    bgcolor: 'secondary.main',
                    height: '32px',
                    width: '32px'
                  }}
                />
              </div>
            </Tooltip>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            aria-label={'sign out'}
            onClick={() => signOut()}
            sx={{ minHeight: 48, width: 48, justifyContent: 'center' }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center'
              }}>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    'width': drawerWidth,
    'flexShrink': 0,
    'whiteSpace': 'nowrap',
    'boxSizing': 'border-box',
    'border': 'none',

    ...(open && {
      ...openedMixin({ theme, width: drawerWidth }),
      '& .MuiDrawer-paper': openedMixin({ theme, width: drawerWidth })
    }),

    ...(!open && {
      ...closedMixin({ theme }),
      '& .MuiDrawer-paper': closedMixin({ theme })
    }),

    '@media (max-width: 600px)': {
      'width': 0,
      '& .MuiDrawer-paper': { width: 0 }
    }
  })
);

export default AppDrawer;
