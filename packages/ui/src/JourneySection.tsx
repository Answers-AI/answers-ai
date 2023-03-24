import { Box, Button, Chip, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ChatCard from './ChatCard';
import React from 'react';
import NextLink from 'next/link';
import { AnswersFilters, Journey } from 'types';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ChatDrawer from './ChatDrawer';

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
  return <ChatDrawer journeys={journeys} />;
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
