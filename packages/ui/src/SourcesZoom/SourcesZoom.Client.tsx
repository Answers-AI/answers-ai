'use client';
import React from 'react';
import useSWR from 'swr';

import Box from '@mui/material/Box';

import Autocomplete from '../AutocompleteSelect';
import { useAnswers } from '../AnswersContext';
import NewDocumentModal from '../NewDocumentModal';

import { Document } from 'types';

const SourcesZoom: React.FC<{}> = ({}) => {
  const source = 'zoom';
  const { filters, updateFilter } = useAnswers();
  const { data, mutate } = useSWR<{
    sources: Document[];
  }>(`/api/sources/${source}`, (url) => fetch(url).then((res) => res.json()));

  const { sources } = data || {};

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          label={'Choose transcript'}
          placeholder={`My zoom meeting`}
          value={filters?.datasources?.[source]?.url || []}
          onChange={(value) => updateFilter({ datasources: { [source]: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
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

export default SourcesZoom;
