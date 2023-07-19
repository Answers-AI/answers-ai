'use client';
import React from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import flagsmith from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';

import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

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
          {children}
        </ThemeProvider>
      </FlagsmithProvider>
    </SessionProvider>
  );
};

export default AppWidgetLayout;
