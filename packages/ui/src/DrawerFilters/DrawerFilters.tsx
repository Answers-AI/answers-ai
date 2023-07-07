'use client';
import { usePathname, useRouter } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import SourcesToolbar from '@ui/SourcesToolbar';

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
  const { showFilters, setShowFilters } = useAnswers();

  return (
    <>
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
        <SourcesToolbar appSettings={appSettings} />
      </Drawer>
    </>
  );
}
