import { Box, Button, Chip, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ChatCard from './ChatCard';
import React from 'react';
import NextLink from 'next/link';
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
      <Typography variant="overline">
        Journey{journeys && journeys?.length > 1 ? 's' : ''}
      </Typography>

      {journeys?.map(({ id, title, filters, chats }) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
            {title ? <Typography variant="h6">{title}</Typography> : null}
            <Filters filters={filters} />
            <Box
              sx={{
                width: '100%',
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { md: 'repeat(3, minmax(0px, 1fr))', sm: '1fr' }
              }}>
              {chats?.map((chat) => (
                <ChatCard {...chat} />
              ))}

              <Button
                component={NextLink}
                href={`/journey/${id}`}
                variant="outlined"
                color="primary">
                <MessageIcon />
              </Button>
            </Box>
          </Box>
        </>
      ))}
    </Box>
  );
}

const Filters = ({ filters, sx }: { filters: any; sx?: any }) => {
  return filters ? (
    <Box sx={{ display: 'flex', gap: 1, ...sx }}>
      {Object.keys(filters)?.map((filter) =>
        filters[filter]?.length ? (
          <Chip key={`${filter}`} label={filters[filter]?.join(', ')} />
        ) : null
      )}
    </Box>
  ) : null;
};

export default JourneySection;
