'use client';
import { Avatar } from '@mui/material';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/QueryBuilder';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AIIcon from '@mui/icons-material/SmartButton';
import React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export const AppDrawer = ({ params }: any) => {
  // TODO - Use params from request: https://github.com/vercel/next.js/issues/43704
  const [pathname, setPathname] = React.useState('');
  React.useEffect(() => {
    setPathname(typeof window === 'undefined' ? '' : window.location.pathname);
  }, []);
  return (
    <Drawer variant="permanent">
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton> */}
        <Avatar>AI</Avatar>
      </DrawerHeader>
      <Divider />
      <List sx={{ flex: '1' }}>
        {[
          { text: 'Message', link: '/', icon: <HomeIcon /> },
          { text: 'Settings', link: '/settings', icon: <SettingsIcon /> },
          ...(process.env.NODE_ENV === 'development'
            ? [
                { component: <Divider key="divider" /> },
                { text: 'Inngest', link: '/events', icon: <MessageIcon /> },
                { text: 'Store', link: '/store', icon: <StorageIcon /> },
                { text: 'Tracing', link: '/tracing', icon: <AIIcon /> }
              ]
            : [])
        ].map((item, idx) =>
          item?.component ? (
            item?.component
          ) : (
            <NextLink key={item.text} href={item.link} passHref>
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: 'block',
                  transition: 'all 0.3s ease-in-out',
                  ...(pathname === item.link
                    ? {
                        boxShadow: (theme) => `inset 4px 0px 0px 0px ${theme.palette.primary.dark}`
                      }
                    : {})
                }}>
                <ListItemButton
                  aria-label={item.text}
                  href={item.link}
                  sx={{
                    minHeight: 48,
                    px: 2.5
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center'
                    }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: 0 }} />
                </ListItemButton>
              </ListItem>
            </NextLink>
          )
        )}
      </List>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          aria-label={'sign out'}
          // href={link}
          onClick={() => signOut()}
          sx={{
            minHeight: 48,
            // ...(pathname === link ? { bgcolor: 'primary.main' } : {}),
            px: 2.5
          }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: 'center'
            }}>
            <ExitToAppIcon />
          </ListItemIcon>
          {/* <ListItemText primary={} sx={{ opacity: 0 }} /> */}
        </ListItemButton>
      </ListItem>
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

export default AppDrawer;
