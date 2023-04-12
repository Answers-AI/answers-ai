'use client';
import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { AnswersFilters } from 'types';

export const Filters = ({ filters, sx }: { filters: AnswersFilters; sx?: any }) => {
  return filters ? (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', py: 1, ...sx }}>
      {filters?.datasources ? (
        <>
          <Typography variant="overline">Sources:</Typography>
          {filters?.datasources
            ? Object.entries(filters.datasources)?.map(([source, filters]) => {
                return (
                  <>
                    {Object.keys(filters)?.map((field) => (
                      <>
                        <Typography variant="overline">
                          {source} {field}
                        </Typography>
                        {filters[field]?.map((value: any) => (
                          <Chip
                            key={`${field}`}
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
