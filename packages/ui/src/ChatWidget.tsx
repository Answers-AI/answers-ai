'use client';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import ChatDetailWidget from './ChatDetailWidget';

interface ChatWidgetProps {
  params: any;
  appSettings: any;
  user: any;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ appSettings, user, params }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Button
        sx={{
          position: 'fixed',
          bottom: 2,
          right: 2,
          zIndex: 9999,
          borderRadius: '50%'
        }}
        aria-label="open chat"
        component="label"
        variant="contained"
        color="primary"
        onClick={toggleOpen}
        startIcon={isOpen ? <Remove /> : <Add />}
        size="large">
        {isOpen ? <Remove /> : <Add />}
      </Button>

      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            maxHeight: '100%',
            overflow: 'auto',
            zIndex: 9998,
            display: 'flex'
          }}>
          <Box>
            <ChatDetailWidget user={user} appSettings={appSettings} {...params} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatWidget;
