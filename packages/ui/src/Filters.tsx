'use client';
import React, { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useAnswers } from './AnswersContext';

import { AppService, DocumentFilter, SourceFilters } from 'types';
import { FilterStatus } from './FilterStatus';

export const Filters = ({ sx }: { sx?: any }) => {
  const { filters, appSettings, updateFilter } = useAnswers();

  const services: { [key: string]: AppService } = useMemo(
    () =>
      appSettings?.services?.reduce((acc, service) => ({ ...acc, [service.id]: service }), {}) ??
      {},
    [appSettings?.services]
  );

  const datasources: [string, SourceFilters][] = useMemo(
    () => Object.entries(filters?.datasources ?? {}) ?? [],
    [filters?.datasources]
  );

  return datasources ? (
    <>
      {/* <strong>
        <Typography variant="overline">Selected sources</Typography>
      </strong> */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '100%',
          ...sx
        }}>
        {datasources?.length ? (
          <>
            {datasources.map(([source, sourceFilters]) => {
              if (!sourceFilters || !Object.keys(sourceFilters).length) return null;
              return (
                <React.Fragment key={source}>
                  {Object.entries(sourceFilters)?.map(([field, { sources }]) => {
                    return (
                      sources.length && (
                        <React.Fragment key={`${source}_${field}`}>
                          {sources.map((documentFilter: DocumentFilter) => (
                            <Button
                              color="inherit"
                              variant="text"
                              size="small"
                              sx={{
                                width: '100%',
                                borderRadius: '24px',
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                              startIcon={
                                <Avatar
                                  variant="source"
                                  sx={{ height: 20, width: 20 }}
                                  src={services[source]?.imageURL}
                                />
                              }
                              onClick={() => {
                                updateFilter({
                                  datasources: {
                                    [source]: {
                                      [field]: (
                                        ((filters?.datasources as any)?.[source]?.[
                                          field
                                        ] as any[]) ?? []
                                      )?.filter((v) => v.value !== documentFilter.value)
                                    }
                                  }
                                });
                              }}
                              endIcon={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <FilterStatus documentFilter={documentFilter} source={source} />
                                  <ClearIcon />
                                </Box>
                              }
                              key={`${source}:${field}:${documentFilter.value}`}>
                              <Typography
                                variant="body2"
                                sx={{
                                  textAlign: 'left',
                                  width: '100%',

                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                {documentFilter.value}
                              </Typography>
                            </Button>
                          ))}
                        </React.Fragment>
                      )
                    );
                  })}
                </React.Fragment>
              );
            })}
          </>
        ) : null}
      </Box>
    </>
  ) : null;
};
