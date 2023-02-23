'use client';
import {
  Avatar,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  Typography
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextLink from 'next/link';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/QueryBuilder';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { amber, deepOrange, grey } from '@mui/material/colors';
// import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300]
      })
    },
    // ...(mode === 'dark' && {
    //   background: {
    //     default: deepOrange[900],
    //     paper: deepOrange[900]
    //   }
    // }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800]
          }
        : {
            primary: '#fff',
            secondary: grey[500]
          })
    }
  }
});

const darkModeTheme = createTheme(getDesignTokens('dark'));

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

export default function RootLayout({
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <html lang="en" style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
          <body style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
            <AppDrawer {...params} />
            <main style={{ flex: 1 }}>{children}</main>
            {/* <ReactQueryDevtools position="top-right" /> */}
          </body>
        </html>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
const AppDrawer = (params: any) => {
  console.log('params', params);
  // const activeLink = React.useEffect(() => {
  //   const path = window.location.pathname;
  //   return path;
  // }, []);
  const { pathname } = params;
  // const {} = useRouter();

  return (
    <Drawer variant="permanent">
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton> */}
        <Avatar>AI</Avatar>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          { text: 'Message', link: '/', icon: <HomeIcon /> },
          { text: 'Inngest', link: '/events', icon: <MessageIcon /> },
          { text: 'Settings', link: '/settings', icon: <SettingsIcon /> }
        ].map(({ text, link, icon }) => (
          // <NextLink key={text} href={link} passHref>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              aria-label={text}
              href={link}
              sx={{
                minHeight: 48,
                ...(pathname === link ? { bgcolor: 'primary.main' } : {}),
                px: 2.5
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center'
                }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: 0 }} />
            </ListItemButton>
          </ListItem>
          // </NextLink>
        ))}
      </List>
    </Drawer>
  );
};
