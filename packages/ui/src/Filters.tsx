'use client';
import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { AnswersFilters } from 'types';

export const Filters = ({ filters, sx }: { filters: AnswersFilters; sx?: any }) => {
  return filters ? (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ...sx }}>
      {filters?.datasources ? (
        <>
          <Typography variant="overline">Sources:</Typography>
          {filters?.datasources
            ? Object.entries(filters.datasources)?.map(([source, sourceFilters]) => {
                if (!sourceFilters) return null;
                return (
                  <>
                    {Object.entries(sourceFilters)?.map(([field, values]) => (
                      <>
                        <Typography variant="overline">
                          {source} {field}
                        </Typography>
                        {!values
                          ? null
                          : values?.map((value: any) => (
                              <Chip
                                key={`${field}:${value?.name ?? value?.id ?? value}`}
                                label={value?.name ?? value?.id ?? JSON.stringify(value)}
                              />
                            ))}
                      </>
                    ))}
                  </>
                );
              })
            : null}
        </>
      ) : null}
    </Box>
  ) : null;
};
