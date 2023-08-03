'use client';
import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { getUrlDomain } from '@utils/getUrlDomain';
import { throttle } from '@utils/throttle';

import Autocomplete from '../VirtualAutocomplete';
import { useAnswers } from '../AnswersContext';

import DomainCard from './DomainCard';

import { WebFilters, DocumentFilter } from 'types';

const SourcesWeb: React.FC<{}> = ({}) => {
  const { filters, updateFilter } = useAnswers();
  const [currentInput, setCurrentInput] = useState('');
  const [url, setUrl] = useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUrl = React.useCallback(throttle(setUrl, 600), []);

  const { data, mutate } = useSWR<WebFilters>(url, (urlVal) =>
    Promise.all([
      fetch(`/api/sources/web/url?url=${urlVal}`)
        .then((res) => res.json())
        .then((data) => data?.web?.url?.sources ?? ([] as DocumentFilter[])),
      fetch(`/api/sources/web/domain?url=${urlVal}`)
        .then((res) => res.json())
        .then((data) => data?.web?.domain?.sources ?? ([] as DocumentFilter[]))
    ]).then(([urlSources, domainSources]) => ({
      url: {
        sources: urlSources
      },
      domain: {
        sources: domainSources
      }
    }))
  );

  const urlDomain = React.useMemo(() => {
    if (!currentInput) return null;
    return getUrlDomain(currentInput);
  }, [currentInput]);

  const currentUrlSources = React.useMemo(() => data?.url?.sources ?? [], [data?.url?.sources]);
  const currentDomainSources = React.useMemo(
    () => data?.domain?.sources ?? [],
    [data?.domain?.sources]
  );
  const filterUrlSources = React.useMemo(
    () => filters?.datasources?.web?.url?.sources ?? [],
    [filters?.datasources?.web?.url?.sources]
  );
  const filterDomainSources = React.useMemo(
    () => filters?.datasources?.web?.domain?.sources ?? [],
    [filters?.datasources?.web?.domain?.sources]
  );

  const handleAddUrl = async (newWebUrl: string) => {
    const { data } = await axios.post<DocumentFilter>(`/api/sync/web/url`, {
      url: newWebUrl
    });
    const newWebURLs = [...(filters?.datasources?.web?.url?.sources ?? []), data];
    updateFilter({
      datasources: { web: { url: { sources: newWebURLs } } }
    });

    setCurrentInput('');
  };

  const addDomainFilter = async (domain?: string) => {
    if (!domain) return;
    const { data } = await axios.post<DocumentFilter>(`/api/sync/web/domain`, {
      domain
    });
    const newDomains = [...filterDomainSources, data];
    updateFilter({
      datasources: { web: { domain: { sources: newDomains } } }
    });

    await mutate();
  };

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          freeSolo
          options={currentUrlSources.map((source) => source.label) ?? []}
          // value={filters?.datasources?.web?.documents || []}
          onInputChange={(e: any, value: any) => {
            setCurrentInput(value);
            updateUrl(value);
          }}
          onChange={(e: any, value: any) => {
            if (value) {
              handleAddUrl(value);
              setCurrentInput('');
            }
          }}
          selectOnFocus
          // clearOnBlur
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="URL"
              value={currentInput}
              sx={{ minHeight: 56 }}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>

      {currentDomainSources?.length ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 1 }}>
          {currentDomainSources.map((source) =>
            filterDomainSources.map((d) => d.value).includes(source.value) ? null : (
              <DomainCard
                key={`domain-card-${source.value}`}
                domain={source.label}
                pageCount={source.count}
                onClick={() => addDomainFilter(source.value)}
              />
            )
          )}
        </Box>
      ) : null}

      {urlDomain &&
      !currentDomainSources?.length &&
      !filterDomainSources.map((d) => d.value).includes(urlDomain) ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 1 }}>
          <DomainCard domain={urlDomain} urls={[]} onClick={() => addDomainFilter(urlDomain)} />
        </Box>
      ) : null}

      {/* {sources?.length ? <DocumentTree documents={sources} /> : null} */}
    </>
  );
};

export default SourcesWeb;
