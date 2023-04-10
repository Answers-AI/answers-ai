'use client';
import React from 'react';
import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';

import { SessionProvider } from 'next-auth/react';

import { Session } from 'next-auth';
import { darkModeTheme } from './theme';
import GlobalStyles from './GlobalStyles';

const AppWidgetLayout = ({
  session,
  children,
  flagsmithState,
  // Layouts must accept a children prop.
  params
}: {
  session?: Session;
  children: any;
  flagsmithState: any;
  params: {
    slug: string;
  };
}) => {
  return (
    <SessionProvider session={session}>
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
              {children}
            </body>
          </html>
        </ThemeProvider>
      </FlagsmithProvider>
    </SessionProvider>
  );
};

export default AppWidgetLayout;
