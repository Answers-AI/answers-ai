'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Add from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Chat, Journey } from 'types';

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
  const handleNewJourney = () => {};
  const handleAddChat = ({ journey }: any) => {
    setOpen(false);
    router.push('/');
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
          'position': { md: 'relative', xs: 'absolute' },
          'zIndex': 1,
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
        <DrawerHeader
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
          <Typography variant="h5">Journeys</Typography>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <ListItem sx={{ flexDirection: 'column' }} disablePadding>
          <Button
            href={`/journey/new`}
            component={NextLink}
            sx={{ px: 2, width: '100%', textTransform: 'capitalize' }}
            color="primary">
            <ListItemText primary={'Start New Journey'} />
            <Add />
          </Button>
        </ListItem>
        <List disablePadding sx={{ flex: 1 }}>
          {journeys?.map((journey, idx) => (
            <React.Fragment key={journey.id}>
              <ListItem
                key={journey.id}
                disablePadding
                sx={{
                  'flexDirection': 'column',
                  '.MuiIconButton-root': { opacity: 1, transition: '.1s', overflow: 'hidden' },
                  '&:not(:hover)': {
                    '.MuiIconButton-root': {
                      opacity: 0,
                      px: 0,
                      width: 0
                    }
                  }
                }}>
                <ListItemButton
                  href={`/journey/${journey.id}`}
                  component={NextLink}
                  selected={pathname === `/journey/${journey.id}`}
                  sx={{ width: '100%', py: 2, paddingRight: 1 }}>
                  <ListItemText primary={<strong>{journey.title}</strong>} />
                  {journey?.chats?.length ? (
                    <IconButton onClick={handleExpandJourney(idx)}>
                      {opened[idx] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  ) : null}
                  {/* <IconButton onClick={() => handleAddChat({ journey })}>
                    <Add />
                  </IconButton> */}
                </ListItemButton>
                <Collapse
                  in={
                    pathname === `/journey/${journey.id}` ||
                    opened[idx] ||
                    !!journey?.chats?.find((c) => pathname?.includes(c.id))
                  }
                  timeout="auto"
                  unmountOnExit
                  sx={{ width: '100%' }}>
                  <List disablePadding>
                    {journey?.chats?.map((chat) => (
                      <ListItem key={chat.id} disablePadding>
                        <ListItemButton
                          selected={pathname === `/chat/${chat.id}`}
                          href={`/chat/${chat.id}`}
                          component={NextLink}>
                          <ListItemText
                            primary={chat.title}
                            secondary={chat?.messages?.[0]?.content}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </ListItem>
            </React.Fragment>
          ))}
          <ListItem disablePadding sx={{ flexDirection: 'column' }}>
            <ListItemButton
              sx={{ width: '100%', py: 2, paddingRight: 1 }}
              onClick={handleExpandJourney('chats')}>
              <ListItemText primary={`Chats`} />
              <IconButton onClick={handleExpandJourney('chats')}>
                {opened['chats'] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>{' '}
              <IconButton onClick={handleAddChat}>
                <Add />
              </IconButton>
            </ListItemButton>
            <Collapse in={opened['chats']} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
              <List disablePadding>
                {chats?.map((chat) => (
                  <ListItem key={chat.id} disablePadding>
                    <ListItemButton
                      selected={pathname === `/chat/${chat.id}`}
                      href={`/chat/${chat.id}`}
                      component={NextLink}>
                      <ListItemText primary={chat.id} secondary={chat?.messages?.[0]?.content} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
