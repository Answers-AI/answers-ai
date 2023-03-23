'use client';
import React from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';

import { SessionProvider } from 'next-auth/react';

import { Session } from 'next-auth';
import Auth from './Auth';
import { AppDrawer } from './AppDrawer';
import { darkModeTheme } from './theme';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function AppLayout({
  session,
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children,
  flagsmithState
}: {
  session?: Session;
  children: any;
  params: {
    slug: string;
  };
  flagsmithState: any;
}) {
  return (
    <SessionProvider session={session}>
      <FlagsmithProvider
        serverState={flagsmithState}
        options={{
          environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID!
        }}
        flagsmith={flagsmith}>
        <ThemeProvider theme={darkModeTheme}>
          <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />

          <CssBaseline enableColorScheme />

          <html lang="en" style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
            <body style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
              {session ? (
                <>
                  <AppDrawer params={params} session={session} />
                  <main style={{ flex: 1, width: 'calc(100% - 65px)', height: '100vh' }}>
                    {children}
                  </main>
                </>
              ) : (
                <Auth />
              )}
            </body>
          </html>
        </ThemeProvider>
      </FlagsmithProvider>
    </SessionProvider>
  );
}
