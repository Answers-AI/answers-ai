'use client';
import React from 'react';
import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';

import { ClientSafeProvider, SessionProvider } from 'next-auth/react';

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
    // <SessionProvider session={session}>
    <FlagsmithProvider
      serverState={flagsmithState}
      options={{
        environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!
      }}
      flagsmith={flagsmith}>
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles />
        <html lang="en" style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
          <body style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
            {session ? (
              <>
                <AppDrawer params={params} session={session} />
                <div style={{ flex: 1, width: 'calc(100% - 65px)', height: '100vh' }}>
                  {children}
                </div>
              </>
            ) : (
              <Auth session={session} providers={providers} appSettings={appSettings} />
            )}
          </body>
        </html>
      </ThemeProvider>
    </FlagsmithProvider>
    // </SessionProvider>
  );
}
