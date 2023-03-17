'use client';
import React from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

import { SessionProvider } from 'next-auth/react';

import { amber, grey } from '@mui/material/colors';
import { Session } from 'next-auth';
import Auth from './Auth';
import { AppDrawer } from './AppDrawer';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300]
      })
    },
    // ...(mode === 'dark' && {
    //   background: {
    //     default: deepOrange[900],
    //     paper: deepOrange[900]
    //   }
    // }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800]
          }
        : {
            primary: '#fff',
            secondary: grey[500]
          })
    }
  }
});

const darkModeTheme = createTheme(getDesignTokens('dark'));

export default function AppLayout({
  session,
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children
}: {
  session?: Session;
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />

        <html lang="en" style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
          <body style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
            {session ? (
              <>
                <AppDrawer params={params} session={session} />
                <main style={{ flex: 1, width: 'calc(100% - 65px)' }}>{children}</main>
              </>
            ) : (
              <Auth />
            )}

            {/* <ReactQueryDevtools position="top-right" /> */}
          </body>
        </html>
      </ThemeProvider>
    </SessionProvider>
  );
}
