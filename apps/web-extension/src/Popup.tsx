import React from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

const App = () => {
  React.useEffect(() => {
    const messageListener = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      // 2. A page requested user data, respond with a copy of `user`
      console.log('Message', message, sender, sendResponse);
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <Box
      sx={{
        minWidth: 420,
        py: 2,
        px: 2,
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        iframe: {
          width: '100%',
          height: '100%'
        }
      }}>
      <iframe src="http://localhost:3000" />
    </Box>
  );
};

export default App;
