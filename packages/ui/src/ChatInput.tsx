'use client';
import React, { useState } from 'react';
import { useFlags } from 'flagsmith/react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import { debounce } from '@utils/debounce';
import { useAnswers } from './AnswersContext';
import { SidekickSelect } from './SidekickSelect';

// import defaultSidekick from '@utils/sidekicks/defaultPrompt';
import { Sidekick } from 'types';

export const ChatInput = ({ scrollRef, isWidget }: { scrollRef?: any; isWidget?: boolean }) => {
  const defaultPlaceholderValue = 'How can you help me accomplish my goal?';
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState(defaultPlaceholderValue);
  const [sidekick, setSidekick] = useState<Sidekick | undefined>();
  const [gptModel, setGptModel] = useState('gpt-3.5-turbo');
  const { chat, journey, filters, messages, sendMessage, clearMessages, isLoading } = useAnswers();

  const flags = useFlags(['settings_stream', 'recommended_prompts_expand']);

  const [showPrompts, setShowPrompts] = useState(
    !messages?.length && flags?.recommended_prompts_expand?.enabled
  );
  React.useEffect(() => {}, []);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const debouncedScroll = debounce(() => {
      if (messages?.length)
        scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      inputRef?.current?.focus();
    }, 300);
    debouncedScroll();
  }, [chat, journey, messages, scrollRef]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage({ content: inputValue, sidekick, gptModel });
    setShowPrompts(false);
    setInputValue('');
  };

  const handleSidekickSelected = (value: Sidekick) => {
    setPlaceholder(value?.placeholder ?? defaultPlaceholderValue);
    setSidekick(value);
  };

  const handleGptModelSelected = (event: SelectChangeEvent<string>) => {
    setGptModel(event.target.value as string);
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
    <Box display="flex" position="relative" sx={{ gap: 1, flexDirection: 'column', pb: 2, px: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <SidekickSelect
          onSidekickSelected={handleSidekickSelected}
          // selectedSidekick={sidekick}
          // initialSidekick={sidekick}
        />
        <FormControl size="small">
          <FormLabel id="model-select-label" sx={{ pb: 1 }}>
            Model
          </FormLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            size="small"
            value={gptModel}
            onChange={handleGptModelSelected}>
            <MenuItem key="gpt3" value="gpt-3.5-turbo">
              GPT 3.5
            </MenuItem>
            <MenuItem key="gpt316k" value="gpt-3.5-turbo-16k">
              GPT 3.5 16k
            </MenuItem>
            <MenuItem key="gpt4" value="gpt-4">
              GPT 4
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

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
        placeholder={placeholder}
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
          bottom: 28,
          right: 28
        }}>
        {/* Toggle component that updates when using query or streaming */}

        {/* {flags.settings_stream.enabled ? (
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
        ) : null} */}
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
          disabled={!inputValue || isLoading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};
