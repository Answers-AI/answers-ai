'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useAnswers } from './AnswersContext';
import { useFlags } from 'flagsmith/react';
import { DefaultPrompts } from './DefaultPrompts';
import { SidekickSelect } from './SidekickSelect';
import { GptModelSelect } from './GptModelSelect';

import { Filters } from './Filters';
import { Tooltip } from '@mui/material';

export const ChatInput = ({ inputRef, isWidget }: { inputRef: any; isWidget?: boolean }) => {
  const [inputValue, setInputValue] = useState('');
  const [sidekick, setSidekick] = useState('defaultPrompt');
  const [gptModel, setGptModel] = useState('gpt-3.5-turbo');
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

  const flags = useFlags(['settings_stream', 'recommended_prompts_expand', 'sidekicks', 'gpt_models']);

  const [showPrompts, setShowPrompts] = useState(
    !messages?.length && flags?.recommended_prompts_expand?.enabled
  );
  React.useEffect(() => {}, []);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage(inputValue, isNewJourney, sidekick, gptModel);
    setShowPrompts(false);
    setInputValue('');
  };

  const handleSidekickSelected = (sidekick: string) => {
    setSidekick(sidekick);
    console.log('sidekick selected', sidekick);
  };

  const handleGptModelSelected = (gptModel: string) => {
    setGptModel(gptModel);
    console.log('gpt model selected', gptModel);
  };

  const handleInputFocus = () => {
    if (flags?.recommended_prompts_expand?.value == 'blur') setShowPrompts(true);
  };
  const handleInputBlur = () => {
    if (flags?.recommended_prompts_expand?.value == 'blur') setShowPrompts(false);
  };

  const handleNewChat = () => {
    setInputValue('');
    clearMessages();
  };
  const isNewJourney = !!Object.keys(filters)?.length && !journey && !chat;

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };
  return (
    <Box display="flex" position="relative" sx={{ gap: 1, flexDirection: 'column' }}>

      {flags?.sidekicks?.enabled ? (
        <SidekickSelect onSidekickSelected={handleSidekickSelected} selectedSidekick={sidekick} />
      ) : null}
      {flags?.gpt_models?.enabled ? (
          <GptModelSelect onGptModelSelected={handleGptModelSelected} selectedGptModel={gptModel} />
      ) : null}
      {filters ? <Filters filters={filters} /> : null}
      <TextField
        id="user-chat-input"
        inputRef={inputRef}
        sx={(theme) => ({
          textarea: {
            minHeight: 23,
            paddingRight: 4,
            paddingBottom: 5,
            maxHeight: theme.spacing(8),
            overflowY: 'auto!important'
          }
        })}
        variant="filled"
        fullWidth
        placeholder="How can you help me accomplish my goal?"
        value={inputValue}
        // onBlur={handleInputFocus}
        multiline
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
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
          <Tooltip title="Start new chat">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleNewChat}
              data-test-id="new-chat-button">
              <AddIcon />
            </Button>
          </Tooltip>
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
