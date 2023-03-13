'use client';
import { createTheme, CssBaseline, PaletteMode, ThemeProvider, Typography } from '@mui/material';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SessionProvider, signIn } from 'next-auth/react';

// import CssBaseline from '@mui/material/CssBaseline';

import React from 'react';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { Session } from 'next-auth';
import Auth from './Auth';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
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
                <main style={{ flex: 1 }}>{children}</main>
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
