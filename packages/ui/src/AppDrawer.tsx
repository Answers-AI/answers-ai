'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useFlags } from 'flagsmith/react';
import { usePathname } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MessageIcon from '@mui/icons-material/QueryBuilder';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AIIcon from '@mui/icons-material/SmartButton';
import { Tooltip, Typography } from '@mui/material';

export const AppDrawer = ({ session }: any) => {
  const flags = useFlags(['settings']);
  const user = session.user;
  // TODO - Use params from request: https://github.com/vercel/next.js/issues/43704
  const pathname = usePathname();
  return (
    <Drawer variant="permanent" sx={{ sm: { width: 0 } }}>
      {/* <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <NextLink href="/">
          <Avatar sx={{ objectFit: 'contain' }}>AI</Avatar>
        </NextLink>
      </DrawerHeader> */}

      <List sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        {[
          { text: 'Message', link: '/', icon: <HomeIcon /> },
          ...(flags?.settings?.enabled
            ? [{ text: 'Settings', link: '/settings', icon: <SettingsIcon /> }]
            : []),
          ...(process.env.NODE_ENV === 'development'
            ? [
                { text: 'Inngest', link: '/events', icon: <MessageIcon /> },
                { text: 'Store', link: '/store', icon: <StorageIcon /> },
                { text: 'Tracing', link: '/tracing', icon: <AIIcon /> }
              ]
            : [])
        ].map((item) => (
          <ListItem
            key={item.text}
            href={item.link}
            component={NextLink}
            prefetch={false}
            disablePadding
            sx={{
              display: 'block',
              transition: 'all 0.3s ease-in-out'
            }}>
            <ListItemButton
              selected={
                (pathname?.includes(item.link) && item.link !== '/') || pathname === item.link
              }
              aria-label={item.text}
              sx={{
                minHeight: 48,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center'
                }}>
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
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
              <Avatar
                src={user?.image}
                sx={{
                  bgcolor: 'secondary.main',
                  height: '32px',
                  width: '32px'
                }}
                title={user?.name?.charAt(0)}
              />
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

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

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
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }),
    '@media (max-width: 600px)': {
      'width': 0,
      '& .MuiDrawer-paper': { width: 0 }
    }
  })
);

export default AppDrawer;
