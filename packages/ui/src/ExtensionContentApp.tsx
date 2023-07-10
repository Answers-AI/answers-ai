import React from 'react';

import { ThemeProvider } from '@emotion/react';
import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';

import { darkModeTheme } from './theme';
import { AnswersProvider } from './AnswersContext';
import ChatExtensionWidget from './ChatExtensionWidget';

const ExtensionContentApp = ({ apiUrl }: { apiUrl: string }) => {
  return (
    <AnswersProvider user={{}} appSettings={{}} apiUrl={apiUrl}>
      <FlagsmithProvider
        options={{
          // @ts-expect-error
          environmentID: import.meta.env.FLAGSMITH_ENVIRONMENT_ID!
        }}
        flagsmith={flagsmith}>
        <ThemeProvider theme={darkModeTheme}>
          <ChatExtensionWidget />
        </ThemeProvider>
      </FlagsmithProvider>
    </AnswersProvider>
  );
  // React.useEffect(() => {
  //   console.log('ExtensionContentApp mounted');
  //   chrome.runtime.sendMessage({ data: document.body.innerHTML });
  // }, []);
  // return (
  //   <div
  //     style={{
  //       position: 'fixed',
  //       top: 0,
  //       right: 0,
  //       minWidth: 420,
  //       height: '100vh',
  //       overflow: 'hidden'
  //     }}>
  //     {/* TODO: Use same component as the webapp instead */}
  //     <iframe
  //       src={import.meta.env.VITE_APP_URL}
  //       width="100%"
  //       height="100%"
  //       style={{ border: 'none' }}></iframe>
  //   </div>
  // );
};
export default ExtensionContentApp;
