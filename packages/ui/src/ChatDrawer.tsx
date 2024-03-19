'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Add from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import closedMixin from './theme/closedMixin';
import openedMixin from './theme/openedMixin';

import { Chat, Journey } from 'types';

const drawerWidth = 400;

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
    width: '100%',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin({ theme, width: drawerWidth }),
      '& .MuiDrawer-paper': openedMixin({ theme, width: drawerWidth })
    }),

    ...(!open && {
      ...closedMixin({ theme, spacing: 0 }),
      '& .MuiDrawer-paper': closedMixin({ theme, spacing: 0 })
    })
  })
);
export interface ChatDrawerProps {
  journeys?: Journey[];
  chats?: Chat[];
  defaultOpen?: boolean;
}

export default function ChatDrawer({ journeys, chats, defaultOpen }: ChatDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean | undefined>(defaultOpen);
  const [opened, setOpened] = React.useState<{ [key: string | number]: boolean }>({ chats: true });

  const handleDrawerOpen = () => {
    window.localStorage.setItem('drawerOpen', 'true');
    setOpen(true);
  };

  const handleDrawerClose = () => {
    window.localStorage.setItem('drawerOpen', 'false');
    setOpen(false);
  };

  const handleExpandJourney = (idx: string | number) => (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setOpened((prev) => {
      const newArr = { ...prev };
      newArr[idx] = !newArr[idx];
      return newArr;
    });
  };

  const handleAddChat = ({ journey }: any) => {
    setOpen(false);
    router.push('/chat');
  };

  // React.useEffect(() => {
  //   setOpen(window.localStorage.getItem('drawerOpen') === 'true');
  // }, [setOpen]);

  return (
    <>
      <DrawerHeader
        sx={{
          position: 'absolute',
          zIndex: 10,
          transition: '.2s',
          ...(open ? { opacity: 0 } : { opacity: 1, transitionDelay: '.25s' })
        }}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {!open ? <Add /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

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
        open={open}>
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
          }}>
          <Typography variant="h5">Chats</Typography>

          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader> */}

        {/* <ListItem sx={{ flexDirection: 'column' }} disablePadding>
          <Button
            href={`/chat`}
            component={NextLink}
            sx={{ px: 2, width: '100%', textTransform: 'capitalize' }}
            color="primary">
            <ListItemText primary={'Start New Chat'} />
            <Add />
          </Button>
        </ListItem> */}

        <List disablePadding>
          <ListItem disablePadding sx={{ flexDirection: 'row', px: 1 }}>
            <ListItemText color="primary" primary={`Chats`} />
            <IconButton
              href={`/chat`}
              component={NextLink}
              color="primary"
              onClick={handleDrawerClose}>
              <Add />
            </IconButton>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </ListItem>
          {chats?.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton
                selected={pathname === `/chat/${chat.id}`}
                href={`/chat/${chat.id}`}
                component={NextLink}>
                <ListItemText primary={chat.title} secondary={chat?.messages?.[0]?.content} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
