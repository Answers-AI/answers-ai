import React from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import useAI from './useAI';
import TurndownService from 'turndown';

var turndownService = new TurndownService();
var activeTabId: any;
//@ts-ignore

chrome.tabs.onActivated.addListener(function (activeInfo) {
  activeTabId = activeInfo.tabId;
});

async function getActiveTab() {
  //@ts-ignore

  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

  if (tab) {
    return tab;
  } else {
    //@ts-ignore
    return chrome.tabs.get(activeTabId);
  }
}

const App = () => {
  const [namespace, setNamespace] = React.useState('web');

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newNamespace: string) => {
    setNamespace(newNamespace);
  };
  const [inputValue, setInputValue] = React.useState('');
  const { generatedResponse, generateResponse, answers, setPrompt, addAnswer } = useAI({
    useStreaming: true
  });
  const handleSubmit = () => {
    if (!inputValue) return;
    setPrompt(inputValue);
    addAnswer({ prompt: inputValue });

    setInputValue('');
    generateResponse(inputValue);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSummarize = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    //@ts-ignore
    let tab = await getActiveTab();

    console.log({ tab });
    if (tab) {
      const content = turndownService.turndown('<h1>Hello world!</h1>');

      let prompt = `Summarize this page: ${content}`;
      setPrompt(prompt);
      addAnswer({ prompt });

      setInputValue('');
      generateResponse(prompt);
    }
  };

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // 2. A page requested user data, respond with a copy of `user`
      console.log('Message', message, sender, sendResponse);
    });
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
        alignItems: 'center'
      }}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Typography variant="h5">Answers AI</Typography>
        <Button variant="contained" color="secondary" onClick={handleSummarize}>
          Summarize
        </Button>
      </Box>
      <TextField
        variant={'outlined'}
        fullWidth
        placeholder="Ask anything..."
        onKeyPress={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
        onChange={handleInputChange}
      />
      <ToggleButtonGroup
        color="secondary"
        value={namespace}
        exclusive
        onChange={handleChange}
        aria-label="Filter">
        <ToggleButton value="internet">Internet</ToggleButton>
        <ToggleButton value="currentPage">This page</ToggleButton>
        <ToggleButton value="currentDomain">This domain</ToggleButton>
      </ToggleButtonGroup>

      {answers?.length
        ? answers.map((answer) => (
            <Typography
              sx={{
                whiteSpace: 'pre-line'
              }}
              variant="subtitle1"
              color="text.secondary"
              component="div">
              <span dangerouslySetInnerHTML={{ __html: answer?.answer }} />
            </Typography>
          ))
        : null}

      {generatedResponse?.answer && (
        <Typography
          sx={{
            whiteSpace: 'pre-line'
          }}
          variant="subtitle1"
          color="text.secondary"
          component="div">
          <span dangerouslySetInnerHTML={{ __html: generatedResponse?.answer }} />
        </Typography>
      )}
    </Box>
  );
};

export default App;
