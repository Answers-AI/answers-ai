'use client';
import React from 'react';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import * as Sentry from '@sentry/browser';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';

import { ClientSafeProvider, signOut } from 'next-auth/react';

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
  const handleUserFeedback = (event: any) => {
    const eventId = Sentry.captureMessage('User Feedback');
    Sentry.showReportDialog({
      eventId,
      title: 'Submit feedback',
      subtitle: 'Let us know how we can improve the AnswerAI experience',
      subtitle2: 'We will get back to you as soon as possible',
      labelComments: 'Feedback',
      labelSubmit: 'Submit'
    });
  };

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
            <div
              style={{
                flex: 1,
                width: 'calc(100% - 65px)',
                height: '100vh',
                position: 'relative'
              }}>
              <div
                style={{
                  position: 'absolute',
                  zIndex: 999999,
                  top: 0,
                  left: 0,
                  flex: 1,
                  width: '100%',
                  height: '24px',
                  backgroundColor: '#eed202',
                  textAlign: 'center',
                  color: '#000000'
                }}>
                This is an Alpha product.{' '}
                <a
                  href="#"
                  onClick={handleUserFeedback}
                  style={{ color: '#0F0F0F', textDecoration: 'underline' }}>
                  Report bugs and provide feedback here
                </a>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '100vh',
                  paddingTop: '24px',
                  position: 'relative'
                }}>
                {children}
              </div>
            </div>
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
