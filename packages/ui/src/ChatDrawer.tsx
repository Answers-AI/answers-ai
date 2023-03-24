import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Journey } from 'types';
import { useAnswers } from './AnswersContext';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Add from '@mui/icons-material/Add';
import { Collapse } from '@mui/material';

const drawerWidth = 320;

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
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(0)} + 1px)`
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
  journeys: Journey[];
}
export default function ChatDrawer({ journeys }: ChatDrawerProps) {
  const { chat } = useAnswers();
  const [open, setOpen] = React.useState(!chat);
  const [closedJourneys, setclosedJourneys] = React.useState<boolean[]>([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleExpandJourney = (idx: number) => (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setclosedJourneys((prev) => {
      const newArr = [...prev];
      newArr[idx] = !newArr[idx];
      return newArr;
    });
  };
  const handleNewJourney = () => {};
  const handleNewChat = () => {};

  return (
    <>
      <DrawerHeader
        sx={{
          position: 'absolute',
          zIndex: 9999,
          transition: '.2s',
          ...(open ? { opacity: 0 } : { opacity: 1, transitionDelay: '.25s' })
        }}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Drawer
        sx={{
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            position: 'absolute',
            boxSizing: 'border-box'
          }
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
            ...(open ? {} : { opacity: 0 })
          }}>
          <Typography variant="h5">Journeys</Typography>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List disablePadding>
          {journeys?.map((journey, idx) => (
            <React.Fragment key={journey.id}>
              <ListItem key={journey.id} disablePadding sx={{ flexDirection: 'column' }}>
                <ListItemButton href={`/journey/${journey.id}`} sx={{ width: '100%', py: 2 }}>
                  <ListItemText primary={`${journey.title}`} />
                  <IconButton onClick={handleExpandJourney(idx)}>
                    {!closedJourneys[idx] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItemButton>
                <Collapse
                  in={!closedJourneys[idx]}
                  timeout="auto"
                  unmountOnExit
                  sx={{ width: '100%' }}>
                  <List disablePadding>
                    {journey?.chats?.map((chat) => (
                      <ListItem key={chat.id} disablePadding>
                        <ListItemButton sx={{ px: 4 }} href={`/chat/${chat.id}`}>
                          <ListItemText
                            primary={chat.id}
                            secondary={chat?.messages?.[0]?.content}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton
                        href={`/journey/${journey.id}`}
                        sx={{ px: 4 }}
                        onClick={handleNewChat}>
                        <ListItemText primary={'Create new chat'} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Collapse>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <ListItem sx={{ flexDirection: 'column' }} disablePadding>
          <ListItemButton href={`/`} sx={{ width: '100%' }} onClick={handleNewJourney}>
            <ListItemText primary={'Create new journey'} />
            <Add />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </>
  );
}
