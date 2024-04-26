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
import { Box, Button, Typography } from '@mui/material';

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
  chatsByDate?: { [key: string]: Chat[] };
  defaultOpen?: boolean;
}

export default function ChatDrawer({ journeys, chatsByDate = {}, defaultOpen }: ChatDrawerProps) {
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
      {/* <DrawerHeader
        sx={{
          position: 'absolute',
          zIndex: 10,
          transition: '.2s',
          ...(open ? { opacity: 0 } : { opacity: 1, transitionDelay: '.25s' })
        }}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {!open ? <Add /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader> */}

      {/* <Drawer
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
        open={open}> */}
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

      <List
        disablePadding
        sx={{
          'transition': '.2s',
          '.MuiDrawer-closed & > *': {
            opacity: 0
          }
        }}>
        <ListItem
          disablePadding
          sx={(theme) => ({
            opacity: '1!important',
            flexDirection: 'row',
            px: 0,
            py: 1,
            position: 'sticky',
            top: 0,
            zIndex: 2,
            bgcolor: 'background.paper'
          })}>
          <Button
            href={`/chat`}
            variant="outlined"
            onClick={handleDrawerClose}
            component={NextLink}
            endIcon={<Add />}
            fullWidth
            sx={{
              'minWidth': 0,
              'textTransform': 'capitalize',
              'justifyContent': 'space-between',
              '.MuiDrawer-closed & .MuiButton-endIcon': {
                margin: 0
              }
            }}>
            <Box
              component="span"
              sx={{
                'overflow': 'hidden',
                'transition': '.2s',
                'maxWidth': '240px',

                '.MuiDrawer-closed &': {
                  maxWidth: '0',
                  opacity: 0
                  // display: 'none'
                }
              }}>
              New chat
            </Box>
          </Button>

          {/* <ListItemText color="primary" primary={`Chats`} />
          <IconButton
            href={`/chat`}
            component={NextLink}
            color="primary"
            onClick={handleDrawerClose}>
            <Add />
          </IconButton> */}
        </ListItem>
        {Object.keys(chatsByDate ?? {})?.map((date, idx) =>
          !chatsByDate[date]?.length ? null : (
            <React.Fragment>
              <ListItem disablePadding sx={{ color: '#9e9e9e', mt: idx === 0 ? 0 : 1 }}>
                <Typography variant="caption">{date}</Typography>
              </ListItem>
              {chatsByDate[date]?.map((chat) => (
                <ListItem key={chat.id} disablePadding>
                  <ListItemButton
                    selected={pathname === `/chat/${chat.id}`}
                    href={`/chat/${chat.id}`}
                    component={NextLink}>
                    <ListItemText
                      secondary={chat.title}
                      sx={
                        pathname === `/chat/${chat.id}`
                          ? { '.MuiListItemText-secondary': { color: 'white' } }
                          : {}
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          )
        )}
      </List>
      {/* </Drawer> */}
    </>
  );
}
