'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { JourneyAppsDrawer } from '../JourneyLayout/JourneyAppsDrawer';
import { AnswersProvider, useAnswers } from '../AnswersContext';
import SnackMessage from '../SnackMessage';
import { debounce } from '@utils/debounce';

import { AppSettings, User, Journey } from 'types';

const JourneyFormNew = ({
  appSettings,
  user,
  journey
}: {
  appSettings: AppSettings;
  user: User;
  journey?: Journey;
}): JSX.Element => {
  return (
    <AnswersProvider user={user} appSettings={appSettings}>
      <JourneyForm appSettings={appSettings} journey={journey} />
    </AnswersProvider>
  );
};

const JourneyForm = ({ appSettings, journey }: { appSettings: AppSettings; journey?: Journey }) => {
  const router = useRouter();
  const [goal, setGoal] = useState(journey?.goal || '');
  const [query, setQuery] = useState<string>('');
  const [theMessage, setTheMessage] = useState('');
  const { updateFilter, upsertJourney, filters } = useAnswers();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuery = React.useCallback(debounce(setQuery, 600), []);
  const { data, error, isLoading, mutate } = useSWR(
    query?.length >= 10 ? `/api/suggested-sources?query=${query}` : null,
    (url) => fetch(url).then((res) => res.json()),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false
    }
  );

  const suggestedSources = React.useMemo(() => {
    return data;
  }, [data]);

  const handleCreateNewJourney = async () => {
    try {
      setTheMessage('... Creating your journey');

      const { data: journey } = await upsertJourney({
        goal,
        filters
      });
      router.push(`/journey/${journey.id}`);
      setTheMessage('Your journey is ready....taking you there now.');
    } catch (err: any) {
      setTheMessage('There was an error creating your journey.   Please try again.');
      console.error(err);
    }
  };

  const handleUpdateJourney = async (id: any) => {
    try {
      setTheMessage('... Updating your journey');

      const { data: journey } = await upsertJourney({
        id,
        goal,
        filters
      });
      router.push(`/journey/${id}`);
      setTheMessage('Your journey is ready....taking you there now.');
    } catch (err: any) {
      setTheMessage('There was an error creating your journey.   Please try again.');
      console.error(err);
    }
  };

  return (
    <Box p={8} width="100%">
      <SnackMessage message={theMessage} />

      <Typography variant="h2" component="h1">
        Create New Journey
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ py: 2 }}>
        <Typography variant="h5" component="h2">
          What is the goal of your journey?
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={goal}
          onChange={(event) => {
            setGoal(event.target.value);
            updateQuery(event.target.value);
          }}
          margin="normal"
        />
      </Box>

      <>
        <Box
          sx={{
            py: 2
          }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="h5" component="h2">
              Choose your data sources
            </Typography>

            {isLoading ? <CircularProgress size={20} sx={{ ml: 1 }} /> : null}
          </Box>
          <Grid2 container sx={{ pt: 3, gap: 2, width: '100%' }}>
            <JourneyAppsDrawer appSettings={appSettings} journey={journey} />
          </Grid2>
        </Box>
        <Box
          sx={{
            py: 2,
            px: 8,
            textAlign: 'right',
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '100%',
            zIndex: 1000,
            background: (theme) => theme.palette.background.paper
          }}>
          {journey ? (
            <Button
              sx={{}}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              onClick={() => handleUpdateJourney(journey.id)}>
              Update Journey
            </Button>
          ) : (
            <Button
              sx={{}}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              onClick={handleCreateNewJourney}>
              Create New Journey
            </Button>
          )}
        </Box>
      </>
    </Box>
  );
};

export default JourneyFormNew;
