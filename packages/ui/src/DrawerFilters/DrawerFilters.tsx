'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SourcesToolbar from '@ui/SourcesToolbar';

import MenuIcon from '@mui/icons-material/Menu';
import { AppSettings } from 'types';
import { useAnswers } from '@ui/AnswersContext';
const drawerWidth = 400;

const openedMixin = (theme: Theme): CSSObject => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth
  },
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
  width: `calc(${theme.spacing(0)} + 0px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(0)} + 0px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    position: 'relative',
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
export interface DrawerFiltersProps {
  appSettings: AppSettings;
}

export default function DrawerFilters({ appSettings }: DrawerFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { showFilters = true, setShowFilters } = useAnswers();
  // const [open, setOpen] = React.useState(true);
  // const open = pathname?.includes('show-canvas=true') || true;
  const handleDrawerClose = () => {
    setShowFilters(false);
    // router.push(pathname.replace('show-canvas=true', 'show-canvas=false'));
  };
  const handleDrawerOpen = () => {
    setShowFilters(true);
    // router.push(pathname.replace('show-canvas=false', 'show-canvas=true'));
  };

  return (
    <>
      {/* <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        sx={{ position: 'absolute', top: 16, right: 0, zIndex: 1000000 }}>
        <MenuIcon />
      </IconButton> */}

      <Drawer
        sx={{
          'flexShrink': 0,
          'zIndex': 1000,
          'position': { md: 'relative', xs: 'absolute' },

          '& .MuiDrawer-paper': {
            position: 'absolute',
            boxSizing: 'border-box'
          },
          'display': 'flex',
          'flexDirection': 'column',
          'height': '100%'
        }}
        variant="permanent"
        anchor="left"
        open={showFilters}>
        {/* <DrawerHeader
          sx={{
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            transition: '.2s',
            paddingLeft: 2,
            position: 'sticky',
            top: '0',
            background: '#161616',
            zIndex: '10',
            ...(open ? {} : { opacity: 0 })
          }}></DrawerHeader> */}
        <SourcesToolbar appSettings={appSettings} />
      </Drawer>
    </>
  );
}
