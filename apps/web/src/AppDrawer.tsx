'use client';
import { Avatar } from '@mui/material';
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
import React from 'react';
import { Drawer, DrawerHeader } from './AppLayout';
import { useRouter } from 'next/router';

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
          { component: <Divider /> },
          { text: 'Inngest', link: '/events', icon: <MessageIcon /> },
          { text: 'Store', link: '/store', icon: <StorageIcon /> }
        ].map((item) =>
          item?.component ? (
            item?.component
          ) : (
            // <NextLink key={text} href={link} passHref>
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                display: 'block',
                transition: 'all 0.3s ease-in-out',
                ...(pathname === item.link
                  ? { boxShadow: (theme) => `inset 4px 0px 0px 0px ${theme.palette.primary.dark}` }
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
            // </NextLink>
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
