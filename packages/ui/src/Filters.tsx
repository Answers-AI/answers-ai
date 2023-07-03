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
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {datasources?.length ? (
        <>
          {/* <strong>
            <Typography variant="overline">Sources:</Typography>
          </strong> */}
          {datasources.map(([source, sourceFilters]) => {
            if (!sourceFilters || !Object.keys(sourceFilters).length) return null;
            return (
              <React.Fragment key={source}>
                <Typography variant="overline">{source}</Typography>
                {Object.entries(sourceFilters)?.map(([field, values]) => (
                  <Box
                    key={`${source}_${field}`}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {!values
                      ? null
                      : (values as any[])?.map((value: any) => (
                          <Chip
                            key={`${field}:${
                              value?.title ?? value?.name ?? value?.id ?? value.url ?? value
                            }`}
                            label={
                              value?.title ??
                              value?.name ??
                              value.url ??
                              value?.id ??
                              JSON.stringify(value)
                            }
                          />
                        ))}
                  </Box>
                ))}
              </React.Fragment>
            );
          })}
        </>
      ) : (
        <Typography variant="overline">
          <strong> Add a source to your journey</strong>
        </Typography>
      )}
    </Box>
  ) : null;
};
