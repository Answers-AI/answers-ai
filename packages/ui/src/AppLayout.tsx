'use client';
import React from 'react';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';

import { ClientSafeProvider, SessionProvider, signOut } from 'next-auth/react';

import { Session } from 'next-auth';
import Auth from './Auth';
import { AppDrawer } from './AppDrawer';
import { darkModeTheme } from './theme';
import GlobalStyles from './GlobalStyles';
import { AppSettings } from 'types';
export default function AppLayout({
  session,
  appSettings,
  providers,
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children,
  flagsmithState
}: {
  session?: Session;
  appSettings: AppSettings;
  providers: Record<string, ClientSafeProvider> | null;
  children: any;
  params: {
    slug: string;
  };
  flagsmithState: any;
}) {
  return (
    <FlagsmithProvider
      serverState={flagsmithState}
      options={{
        environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!
      }}
      flagsmith={flagsmith}>
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles />
        {!session?.user ? (
          <Auth appSettings={appSettings} providers={providers} />
        ) : flagsmithState?.flags?.access_enabled?.enabled ? (
          <>
            <AppDrawer params={params} session={session} />
            <div style={{ flex: 1, width: 'calc(100% - 65px)', height: '100vh' }}>{children}</div>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}>
                <Typography variant="h4">You are almost in!</Typography>
                <Typography variant="h5">Answer AI is currently in closed beta.</Typography>
                <Typography variant="h6">Check your email for a confirmation soon!</Typography>
                {session?.user ? (
                  <Button variant="outlined" fullWidth onClick={() => signOut()}>
                    Change account
                  </Button>
                ) : null}
              </Box>
            </Box>
          </>
        )}
      </ThemeProvider>
    </FlagsmithProvider>
  );
}
