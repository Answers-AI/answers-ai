import { Box, Button, Chip, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ChatCard from './ChatCard';
import React from 'react';
import { AnswersFilters, Journey } from 'types';

interface Props {
  journeys?: Journey[];
}

function JourneySection({ journeys }: Props) {
  if (!journeys) {
    return (
      <Box>
        <Typography variant="h6">No journeys yet</Typography>
        <Typography>To stat a journey select your data sources and ask a question</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h6">Journey{journeys && journeys?.length > 1 ? 's' : ''}</Typography>

      {journeys?.map(({ id, title, filters, chats }) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
            <Typography>{title || id}</Typography>
            <Filters filters={filters} />
            <Typography>Continue the conversation</Typography>
            <Box
              sx={{
                width: '100%',
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
              }}>
              {chats?.map((chat) => (
                <ChatCard {...chat} />
              ))}

              <Button variant="outlined" color="primary" href={`/journey/${id}`}>
                <MessageIcon />
              </Button>
            </Box>
          </Box>
        </>
      ))}
    </Box>
  );
}

const Filters = ({ filters }: { filters: any }) => {
  return filters ? (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {Object.keys(filters)?.map((filter) =>
        filters[filter]?.length ? (
          <Chip key={`${filter}`} label={filters[filter]?.join(', ')} />
        ) : null
      )}
    </Box>
  ) : null;
};

export default JourneySection;
