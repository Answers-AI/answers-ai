import React from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

const App = () => {
  const [namespace, setNamespace] = React.useState('web');
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newNamespace: string) => {
    setNamespace(newNamespace);
  };

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
        <Button variant="contained" color="secondary">
          Summarize
        </Button>
      </Box>
      <TextField variant={'outlined'} fullWidth placeholder="Ask anything..." />
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
    </Box>
  );
};

export default App;
