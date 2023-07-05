'use client';
import React from 'react';
import { Avatar, Box, Button, Chip, Typography } from '@mui/material';
import { AnswersFilters, AppService } from 'types';
import { useAnswers } from './AnswersContext';
import ClearIcon from '@mui/icons-material/Clear';
export const Filters = ({ filters, sx }: { filters: AnswersFilters; sx?: any }) => {
  const { appSettings, updateFilter } = useAnswers();
  const services: { [key: string]: AppService } =
    appSettings?.services?.reduce((acc, service) => ({ ...acc, [service.id]: service }), {}) ?? {};

  const datasources = !filters?.datasources
    ? null
    : Object.entries(filters?.datasources)?.filter(([source, sourceFilters]) => {
        return (
          sourceFilters &&
          Object.values(sourceFilters)?.some((values) => (values as any[])?.length !== 0)
        );
      });

  return filters ? (
    <>
      <strong>
        <Typography variant="overline">Selected sources</Typography>
      </strong>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ...sx }}>
        {datasources?.length ? (
          <>
            {datasources.map(([source, sourceFilters]) => {
              if (!sourceFilters || !Object.keys(sourceFilters).length) return null;
              return (
                <React.Fragment key={source}>
                  {Object.entries(sourceFilters)?.map(([field, values]) => (
                    <React.Fragment key={`${source}_${field}`}>
                      {!values
                        ? null
                        : (values as any[])?.map((value: any) => (
                            <Button
                              color="inherit"
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: '24px', textTransform: 'none' }}
                              startIcon={
                                <Avatar
                                  sx={{ height: 20, width: 20 }}
                                  src={services[source].imageURL}
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
                                      )?.filter((v) => v !== value)
                                    }
                                  }
                                });
                              }}
                              endIcon={<ClearIcon />}
                              key={`${field}:${
                                value?.title ?? value?.name ?? value?.id ?? value.url ?? value
                              }`}>
                              {value?.title ??
                                value?.name ??
                                value.url ??
                                value?.id ??
                                JSON.stringify(value)}
                            </Button>
                          ))}
                    </React.Fragment>
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
    </>
  ) : null;
};
