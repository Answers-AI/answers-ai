'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAnswers } from './AnswersContext';

export const ChatInput = ({ inputRef }: { inputRef: any }) => {
  const {
    chat,
    journey,
    filters,
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    useStreaming,
    setUseStreaming,
    setShowFilters
  } = useAnswers();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage({ content: inputValue, isNewJourney });

    setInputValue('');
  };
  const handleInputFocus = () => {
    if (!Object.keys(filters)?.length) setShowFilters(true);
  };
  const handleInputBlur = () => {
    if (Object.keys(filters)?.length) setShowFilters(false);
  };
  const isNewJourney = !!Object.keys(filters)?.length && !journey && !chat;

  return (
    <Box display="flex" position="relative">
      <TextField
        sx={{ textarea: { paddingRight: 4, paddingBottom: 5 } }}
        inputRef={inputRef}
        variant="filled"
        fullWidth
        placeholder="How can you help me accomplish my goal?"
        value={inputValue}
        // onBlur={handleInputBlur}
        multiline
        onFocus={handleInputFocus}
        onKeyPress={(e) => (e.key === 'Enter' && !e.shiftKey ? handleSubmit() : null)}
        onChange={handleInputChange}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          gap: 1,
          right: 16,
          bottom: 16
        }}>
        {/* Toggle component that updates when using query or streaming */}

        <FormControlLabel
          control={
            <Switch
              {...{ inputProps: { 'aria-label': 'Stream mode' } }}
              checked={useStreaming}
              onChange={() => setUseStreaming(!useStreaming)}
              name="Stream"
            />
          }
          label={'Stream'}
        />
        {messages?.length ? (
          <Button variant="outlined" color="primary" onClick={clearMessages}>
            <DeleteIcon />
          </Button>
        ) : null}
        {/* <Button variant="outlined" color="primary" onClick={() => setShowPrompts(true)}>
                  <AddIcon />
                </Button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!inputValue || isLoading}
          sx={{}}>
          {isNewJourney ? 'Start journey' : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};
