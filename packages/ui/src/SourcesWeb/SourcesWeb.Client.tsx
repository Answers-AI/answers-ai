'use client';
import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getUrlDomain } from '@utils/getUrlDomain';
import { throttle } from '@utils/throttle';

import Autocomplete from '../VirtualAutocomplete';
import { useAnswers } from '../AnswersContext';

import DomainCard from './DomainCard';

import { WebUrlType, Document } from 'types';

const isDomain = (url: string) => {
  try {
    if (!url) return false;
    const domain = getUrlDomain(url);
    return domain === url;
  } catch (err) {
    return false;
  }
};

const SourcesWeb: React.FC<{}> = ({}) => {
  const { filters, updateFilter } = useAnswers();
  const [currentInput, setCurrentInput] = useState('');
  const [url, setUrl] = useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUrl = React.useCallback(throttle(setUrl, 600), []);
  const { data, error, isLoading, mutate } = useSWR<{
    sources: Document[];
    domains: { domain: string; pageCount: number }[];
  }>(url.length > 10 ? `/api/sources/web?url=${url}` : null, (url) =>
    fetch(url).then((res) => res.json())
  );

  const urlDomain = React.useMemo(() => {
    if (!currentInput) return null;
    return getUrlDomain(currentInput);
  }, [currentInput]);

  const { sources, domains } = data || {};

  const handleAddUrl = async (newWebUrl: string) => {
    const { data } = await axios.post(`/api/sync/web`, {
      url: newWebUrl,
      byDomain: false
    });
    const newWebURLs = [...(filters?.datasources?.web?.documents ?? []), data.web];
    updateFilter({
      datasources: { web: { documents: newWebURLs } }
    });

    setCurrentInput('');
  };

  const handleRemoveUrl = async (webUrl: WebUrlType) => {
    if (webUrl) {
      const domain = getUrlDomain(webUrl.url);

      const newWebURLs = (filters?.datasources?.web?.documents ?? []).filter((urlObj) => {
        if (webUrl.entireDomain) {
          return getUrlDomain(urlObj.url) !== domain;
        } else {
          return urlObj.url !== webUrl.url;
        }
      });

      updateFilter({
        datasources: { web: { documents: newWebURLs } }
      });
    }
  };

  const handleRemoveDomain = async (domain: string) => {
    const newDomain = (filters?.datasources?.web?.domains ?? []).filter((d) => {
      return domain !== d;
    });

    updateFilter({
      datasources: { web: { domains: newDomain } }
    });
  };

  const addDomainFilter = async (domain?: string) => {
    if (!domain) return;
    const { data } = await axios.post(`/api/sync/web`, {
      url: domain,
      byDomain: true
    });
    const newDomains = [...(filters?.datasources?.web?.domains ?? []), ...data.web.domains];
    updateFilter({
      datasources: { web: { domains: newDomains } }
    });

    await mutate();
  };

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        {filters?.datasources?.web?.domains?.length ? (
          <Box>
            <Typography variant="overline">Domains</Typography>
            <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
              {filters?.datasources?.web?.domain?.map((domain) => (
                <Chip
                  key={`domain-chip-${domain}`}
                  size="small"
                  label={domain}
                  onDelete={() => handleRemoveDomain(domain)}
                />
              ))}
            </Box>
          </Box>
        ) : null}

        {filters?.datasources?.web?.documents?.length ? (
          <Box>
            <Typography variant="overline">Pages</Typography>
            <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
              {filters?.datasources?.web?.documents?.map((document) => (
                <Chip
                  key={`page-chip-${document.url}`}
                  size="small"
                  label={document.url}
                  onDelete={() => handleRemoveUrl(document)}
                />
              ))}
            </Box>
          </Box>
        ) : null}

        <Autocomplete
          freeSolo
          options={isDomain(currentInput) ? [] : sources?.map((source) => source.url) ?? []}
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

      {domains?.length ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 1 }}>
          {domains.map(({ domain, pageCount }) =>
            filters?.datasources?.web?.domains?.includes(domain) ? null : (
              <DomainCard
                key={`domain-card-${domain}`}
                domain={domain}
                pageCount={pageCount}
                onClick={() => addDomainFilter(domain)}
              />
            )
          )}
        </Box>
      ) : null}

      {urlDomain && !domains?.length && !filters?.datasources?.web?.domains?.includes(urlDomain) ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 1 }}>
          <DomainCard domain={urlDomain} urls={[]} onClick={() => addDomainFilter(urlDomain)} />
        </Box>
      ) : null}

      {/* {sources?.length ? <DocumentTree documents={sources} /> : null} */}
    </>
  );
};

export default SourcesWeb;
