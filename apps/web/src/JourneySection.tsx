import { Box, Typography } from '@mui/material';
import ChatCard from './ChatCard';
import React from 'react';
import { Journey } from 'types';

interface Props {
  journeys?: Journey[];
}

function JourneySection({ journeys }: Props) {
  return (
    <Box>
      <Typography variant="h6">Journeys</Typography>
      {journeys?.map(({ title, id, chats }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Typography>{title || id}</Typography>
          <Box>
            {chats?.map((chat) => (
              <ChatCard {...chat} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default JourneySection;
