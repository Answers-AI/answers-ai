import React, { useState } from 'react';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SmartToy from '@mui/icons-material/SmartToy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AIIcon from '@mui/icons-material/SmartButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { usePathname } from 'next/navigation';
import { Menu, MenuItem } from '@mui/material';
import { useFlags } from 'flagsmith/react';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    'width': drawerWidth,
    'maxWidth': open ? drawerWidth : theme.spacing(7),
    'flexShrink': 0,
    'whiteSpace': 'nowrap',
    'overflowX': 'hidden',
    'transition': '.3s',
    ' .MuiDrawer-paper': {
      transition: '.3s',
      overflowY: 'hidden',
      overflowX: 'hidden',
      padding: 0,
      width: drawerWidth
    },
    'p': {
      transition: '.2s'
    },
    ...(open && {
      '& .MuiDrawer-paper': {
        transition: '.3s',
        maxWidth: drawerWidth
      }
    }),
    ...(!open && {
      '& .MuiDrawer-paper': {
        transition: '.3s',
        maxWidth: theme.spacing(7),
        p: {
          opacity: 0
        }
      }
    })
  })
);

export const AppDrawer = ({ session, chatList, flagsmithState }: any) => {
  const user = session?.user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState('');
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const flags = useFlags(['chatflow:use', 'chatflow:manage', 'org:manage']);
  const MEMBER_ACTIONS = ['chatflows', 'marketplaces', 'document-stores'];
  const BUILDER_ACTIONS = [
    'agentflows',
    'assistants',
    'tools',
    'credentials',
    'variables',
    'apikey',
    'documentstores'
  ];
  const menuConfig = [
    {
      ...(flags['chatflow:use'].enabled
        ? {
            text: 'Sidekick Studio',
            link: '/sidekick-studio',
            icon: <SmartToy />,
            subMenu: [
              { id: 'chatflows', text: 'Chatflows', link: '/sidekick-studio/chatflows' },
              { id: 'agentflows', text: 'Agentflows', link: '/sidekick-studio/agentflows' },
              { id: 'marketplaces', text: 'Marketplaces', link: '/sidekick-studio/marketplaces' },
              { id: 'tools', text: 'Tools', link: '/sidekick-studio/tools' },
              { id: 'assistants', text: 'Assistants', link: '/sidekick-studio/assistants' },
              { id: 'credentials', text: 'Credentials', link: '/sidekick-studio/credentials' },
              { id: 'variables', text: 'Variables', link: '/sidekick-studio/variables' },
              { id: 'apikey', text: 'API Keys', link: '/sidekick-studio/apikey' },
              {
                id: 'documentstores',
                text: 'Document Stores',
                link: '/sidekick-studio/document-stores'
              }
            ]?.filter(
              (item) =>
                (MEMBER_ACTIONS?.includes(item.id) && flags['chatflow:use']?.enabled) ||
                (BUILDER_ACTIONS?.includes(item.id) && flags['chatflow:manage']?.enabled)
            )
          }
        : {})
    }
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNewChat = () => {
    setDrawerOpen(false);
  };

  return (
    <Drawer
      open={drawerOpen}
      variant="permanent"
      className={drawerOpen ? 'MuiDrawer-open' : 'MuiDrawer-closed'}
      sx={{}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: drawerOpen ? 'space-between' : 'center',
          flexDirection: drawerOpen ? 'row' : 'column',
          p: 1
        }}>
        <IconButton onClick={toggleDrawer}>
          <ViewSidebarOutlinedIcon
            sx={{
              transform: drawerOpen ? 'scaleX(-1)' : 'none',
              color: 'primary.main'
            }}
          />
        </IconButton>
        <Button
          href="/chat"
          variant="outlined"
          onClick={handleNewChat}
          component={NextLink}
          endIcon={<RateReviewIcon />}
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
              }
            }}>
            New chat
          </Box>
        </Button>
      </Box>
      <Box
        sx={{
          'flex': 1,
          'overflowY': 'auto',
          'overflowX': 'hidden',
          '&::-webkit-scrollbar': {
            transition: 'opacity 0.5s ease',
            opacity: drawerOpen ? 1 : 0
          },
          '&::-webkit-scrollbar ': {
            transition: '.2s',
            ...(!drawerOpen && {
              width: '0px'
            })
          }
        }}>
        {chatList}
      </Box>

      <List sx={{ display: 'flex', flexDirection: 'column' }} disablePadding>
        {menuConfig.map((item) => (
          <Box key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={!!item.link && pathname.startsWith(item.link)}
                href={item.link}
                component={item.link ? NextLink : 'button'}
                sx={{ flex: 1, display: 'flex', width: '100%' }}
                onClick={() => setSubmenuOpen(item.text == submenuOpen ? '' : item.text ?? '')}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '1',
                    flex: '1'
                  }}>
                  {item.text}
                </Typography>
              </ListItemButton>
            </ListItem>

            <Collapse
              in={drawerOpen || pathname?.includes(item?.link)}
              timeout="auto"
              sx={{ transition: '.2s', opacity: drawerOpen ? 1 : 0 }}>
              {item?.subMenu?.map((subItem) => (
                <ListItem
                  key={subItem.text}
                  disablePadding
                  sx={{ pl: 4, transition: '.2s', opacity: drawerOpen ? 1 : 0 }}>
                  <ListItemButton
                    component={NextLink}
                    href={subItem.link}
                    selected={pathname === subItem.link}>
                    <Typography>{subItem.text}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </Collapse>
          </Box>
        ))}

        <ListItem disablePadding sx={{ display: 'block' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: 1,
              pl: 0.5
            }}>
            <Avatar
              src={user?.picture}
              sx={{
                bgcolor: 'secondary.main',
                height: '32px',
                width: '32px'
              }}
            />
            <Box
              sx={{
                display: 'flex',
                overflow: 'hidden',
                alignItems: 'center',
                width: '100%',
                maxWidth: 124
              }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="caption"
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                  {user?.email}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                  {user?.org_name}
                </Typography>
              </Box>
            </Box>
            <IconButton
              aria-label="more options"
              sx={{ minHeight: 48, width: 48, justifyContent: 'center' }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem variant="caption" disabled>
                <Typography
                  sx={{
                    opacity: 0.9,
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                  {user?.org_name}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  window.location.href = '/api/auth/login';
                }}>
                Switch Organization
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  window.location.href = '/api/auth/logout';
                }}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default AppDrawer;
