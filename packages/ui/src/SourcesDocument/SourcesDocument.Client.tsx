'use client';
import React from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@ui/AutocompleteSelect';
import { Document } from 'types';
import { useAnswers } from '@ui/AnswersContext';
import NewDocumentModal from '@ui/NewDocumentModal';

import useSWR from 'swr';

const SourcesDocument: React.FC<{}> = ({}) => {
  const source = 'document';
  const { filters, updateFilter } = useAnswers();
  const { data, mutate } = useSWR<{
    sources: Document[];
  }>(`/api/sources?source=${source}`, (url) => fetch(url).then((res) => res.json()));

  const { sources } = data || {};

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          label={'Choose document'}
          placeholder={`My document`}
          value={filters?.datasources?.[source]?.url || []}
          onChange={(value) => updateFilter({ datasources: { [source]: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          getOptionValue={(option) => option?.url}
          options={sources ?? []}
          onFocus={() => mutate()}
        />
        <NewDocumentModal
          source={source}
          onSave={() => {
            setTimeout(mutate, 2000);
          }}
        />
      </Box>
    </>
  );
};

export default SourcesDocument;
