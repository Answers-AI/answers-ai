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
import { AnswersProvider, useAnswers } from '@ui/AnswersContext';
import { debounce } from '@utils/debounce';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

const JourneyFormNew = ({ appSettings }: { appSettings: AppSettings }): JSX.Element => {
  return (
    <AnswersProvider appSettings={appSettings}>
      <JourneyForm appSettings={appSettings} />
    </AnswersProvider>
  );
};

const JourneyForm = ({ appSettings }: { appSettings: AppSettings }) => {
  const router = useRouter();
  const [goal, setGoal] = useState('');
  const [query, setQuery] = useState<string>('');

  const { updateFilter, upsertJourney, filters } = useAnswers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuery = React.useCallback(debounce(setQuery, 600), []);
  const { data, error, isLoading, mutate } = useSWR(
    query?.length > 3 ? `/api/suggested-sources?query=${query}` : null,
    (url) => fetch(url).then((res) => res.json()),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false
      // onSuccess: ({ domain }) => {
      //   console.log('Data', data);
      //   updateFilter({
      //     datasources: {
      //       web: {
      //         domain
      //       }
      //     }
      //   });
      // }
    }
  );
  const suggestedSources = React.useMemo(() => {
    console.log('Data', data);
    return data;
  }, [data]);
  const handleCreateNewJourney = async () => {
    const { data: journey } = await upsertJourney({
      goal,
      filters
    });
    console.log('Journey', journey);
    router.push(`/journey/${journey.id}`);
  };
  return (
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
          What is the goal of your journey?
        </Typography>
        <TextField
          // label="What is the goal of your journey?"
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
          {/* <pre>{JSON.stringify(suggestedSources, null, 2)}</pre> */}
          <Grid2 container sx={{ pt: 3, gap: 2, width: '100%' }}>
            <JourneyAppsDrawer appSettings={appSettings} />
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
          <Button
            sx={{}}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            onClick={handleCreateNewJourney}>
            Create New Journey
          </Button>
        </Box>
      </>
    </Box>
  );
};

export default JourneyFormNew;
