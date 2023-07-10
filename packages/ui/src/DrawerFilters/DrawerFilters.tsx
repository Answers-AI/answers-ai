'use client';
import { usePathname, useRouter } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import { useAnswers } from '../AnswersContext';
import SourcesToolbar from '../SourcesToolbar';
import closedMixin from '../theme/closedMixin';
import openedMixin from '../theme/openedMixin';

import { AppSettings } from 'types';

const drawerWidth = 400;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    position: 'relative',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin({ theme, width: drawerWidth }),
      '& .MuiDrawer-paper': openedMixin({ theme, width: drawerWidth })
    }),

    ...(!open && {
      ...closedMixin({ theme }),
      '& .MuiDrawer-paper': closedMixin({ theme, spacing: 0 })
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
