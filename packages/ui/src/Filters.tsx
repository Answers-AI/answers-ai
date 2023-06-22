'use client';
import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { AnswersFilters } from 'types';

export const Filters = ({ filters, sx }: { filters: AnswersFilters; sx?: any }) => {
  const datasources = !filters?.datasources
    ? null
    : Object.entries(filters?.datasources)?.filter(([source, sourceFilters]) => {
        return (
          sourceFilters &&
          Object.values(sourceFilters)?.some((values) => (values as any[])?.length !== 0)
        );
      });

  return filters ? (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ...sx }}>
      {datasources?.length ? (
        <>
          <strong>
            <Typography variant="overline">Sources:</Typography>
          </strong>
          {datasources.map(([source, sourceFilters]) => {
            if (!sourceFilters || !Object.keys(sourceFilters).length) return null;
            return (
              <React.Fragment key={source}>
                {Object.entries(sourceFilters)?.map(([field, values]) => (
                  <React.Fragment key={`${source}_${field}`}>
                    <Typography variant="overline">
                      {source} {field}
                    </Typography>
                    {!values
                      ? null
                      : (values as any[])?.map((value: any) => (
                          <Chip
                            key={`${field}:${value?.name ?? value?.id ?? value.url ?? value}`}
                            label={value?.name ?? value.url ?? value?.id ?? JSON.stringify(value)}
                          />
                        ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </>
      ) : (
        <Typography variant="overline">
          <strong> Add a source to your journey by clicking on a source above</strong>
        </Typography>
      )}
    </Box>
  ) : null;
};
