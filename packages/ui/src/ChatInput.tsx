'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAnswers } from './AnswersContext';
import { useFlags } from 'flagsmith/react';
import { DefaultPrompts } from './DefaultPrompts';

export const ChatInput = ({ inputRef, isWidget }: { inputRef: any; isWidget?: boolean }) => {
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

  const flags = useFlags(['settings_stream', 'recommended_prompts_expand']);
  const [inputValue, setInputValue] = useState('');

  const [showPrompts, setShowPrompts] = useState(
    !messages?.length && flags?.recommended_prompts_expand?.enabled
  );
  React.useEffect(() => {}, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage({ content: inputValue, isNewJourney });
    setShowPrompts(false);
    setInputValue('');
  };
  const handleInputFocus = () => {
    if (!Object.keys(filters)?.length) setShowFilters(true);
  };
  const handlePromptSelected = (prompt: string) => {
    setInputValue(prompt);
  };
  const handleInputBlur = () => {
    if (flags?.recommended_prompts_expand?.value == 'blur') setShowPrompts(true);
  };

  const isNewJourney = !!Object.keys(filters)?.length && !journey && !chat;

  return (
    <Box display="flex" position="relative" sx={{ gap: 1, flexDirection: 'column' }}>
      <DefaultPrompts
        onPromptSelected={handlePromptSelected}
        expanded={showPrompts}
        handleChange={(_, value) => setShowPrompts(value)}
      />

      <TextField
        inputRef={inputRef}
        sx={{ textarea: { minHeight: 23, paddingRight: 4, paddingBottom: 5 } }}
        variant="filled"
        fullWidth
        placeholder="How can you help me accomplish my goal?"
        value={inputValue}
        // onBlur={handleInputBlur}
        multiline
        onFocus={handleInputFocus}
        onKeyPress={(e) => (e.key === 'Enter' && !e.shiftKey ? handleSubmit() : null)}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
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

        {flags.settings_stream.enabled ? (
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
        ) : null}
        {!isWidget && messages?.length ? (
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
