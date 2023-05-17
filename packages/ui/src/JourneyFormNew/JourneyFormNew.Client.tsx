'use client';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { JourneyAppsDrawer } from '@ui/JourneyLayout/JourneyAppsDrawer';

import { AppSettings } from 'types';
import { AnswersProvider } from '@ui/AnswersContext';

const JourneyFormNew = ({
  appSettings,
  handleSubmit,
  sources
}: {
  appSettings: AppSettings;
  handleSubmit: any;
}): JSX.Element => {
  const [goal, setGoal] = useState('');

  return (
    <AnswersProvider appSettings={appSettings}>
      <Box p={8}>
        {/* <form action={handleSubmit}> */}
        <Typography variant="h2" component="h1">
          Create New Journey
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            py: 2
          }}>
          <Typography variant="h5" component="h2">
            <strong>Step 1:</strong> What is the goal of your journey?
          </Typography>
          <TextField
            // label="What is the goal of your journey?"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            margin="normal"
          />
        </Box>
        <Box
          sx={{
            py: 2
          }}>
          <Typography variant="h5" component="h2">
            <strong>Step 2:</strong> Choose your data sources
          </Typography>

          <Grid2 container sx={{ pt: 3, gap: 2, width: '100%' }}>
            <JourneyAppsDrawer appSettings={appSettings} sources={sources} />
          </Grid2>
        </Box>
        <Box
          sx={{
            py: 2,
            textAlign: 'right'
          }}>
          <Button variant="contained" color="primary" type="submit" size="large">
            Create New Journey
          </Button>
        </Box>
        {/* </form> */}
      </Box>
    </AnswersProvider>
  );
};

export default JourneyFormNew;
