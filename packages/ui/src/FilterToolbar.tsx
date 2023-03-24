'use client';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAnswers } from './AnswersContext';

import { AppSettings, AppService } from 'types';
import MultiSelect from './MultiSelect';
import AutocompleteSelect from './AutocompleteSelect';
import { useFlags } from 'flagsmith/react';

const FilterToolbar = ({
  appSettings
}: {
  appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
  const flags = useFlags(['filters_model']);
  const { filters, updateFilter, showFilters, setShowFilters } = useAnswers();
  return (
    <>
      <Accordion
        expanded={showFilters}
        onChange={() => setShowFilters(!showFilters)}
        sx={{
          '&, .MuiAccordion-root ': {
            'width': '100%',
            'overflow': 'hidden',
            'm': 0,
            'background': 'none',
            'boxShadow': 'none',
            '&.Mui-expanded': {
              margin: 0
            },
            '.MuiAccordionSummary-root': {
              'px': 0,
              'minHeight': 0,
              '&.Mui-expanded': { minHeight: 0 },
              'justifyContent': 'flex-start',
              'gap': 2
            },
            '.MuiAccordionSummary-content': {
              'm': 0,
              'flexGrow': 'initial',
              '&.Mui-expanded': { m: 0 }
            },
            '.MuiAccordionDetails-root': { p: 0 }
          }
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filters-content"
          id="filters-header">
          <Typography variant="overline">Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 2,
                gridTemplateRows: ''
              }}>
              <AutocompleteSelect
                label="Project"
                options={
                  appSettings?.jira?.projects?.filter((s) => s.enabled)?.map((s) => s.key) || []
                }
                value={filters?.datasources?.jira?.project || []}
                onChange={(value: string[]) =>
                  updateFilter({ datasources: { jira: { project: value } } })
                }
              />
              <AutocompleteSelect
                label={`Status`}
                sx={{ textTransform: 'capitalize' }}
                options={['to do', 'in progress', 'done']}
                value={filters?.datasources?.jira?.status_category || []}
                onChange={(value: string[]) =>
                  updateFilter({ datasources: { jira: { status_category: value } } })
                }
              />
              <AutocompleteSelect
                label={`Assignee`}
                sx={{ textTransform: 'capitalize' }}
                options={[
                  'adam harris',
                  'brad taylor',
                  'camilo rios',
                  'cecilia widmer',
                  'dano alexander',
                  'jaime morales',
                  'justin whitley',
                  'maximiliano techera',
                  'tony leung',
                  'unassigned'
                ]}
                value={filters?.datasources?.jira?.assignee || []}
                onChange={(value: string[]) =>
                  updateFilter({ datasources: { jira: { assignee: value } } })
                }
              />
              <AutocompleteSelect
                label="Channel"
                options={
                  appSettings?.slack?.channels?.filter((s) => s.enabled)?.map((s) => s.name) || []
                }
                value={filters?.datasources?.slack?.channelId || []}
                onChange={(value: string[]) =>
                  updateFilter({ datasources: { slack: { channelId: value } } })
                }
              />
              <AutocompleteSelect
                label="Web"
                options={[]}
                // options={appSettings?.web?.urls?.map((s) => s.url) || []}
                value={filters?.datasources?.web?.url || []}
                onChange={(value: string[]) =>
                  updateFilter({ datasources: { web: { url: value } } })
                }
              />
              <AutocompleteSelect
                label="Confluence Space"
                options={
                  appSettings?.confluence?.spaces?.filter((s) => s.enabled)?.map((s) => s.id) || []
                }
                value={filters?.datasources?.confluence?.spaceId || []}
                onChange={(value: string[]) =>
                  updateFilter({ datasources: { confluence: { spaceId: value } } })
                }
              />
            </Box>

            {flags.filters_model.enabled ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="filters-content"
                  id="filters-header">
                  <Typography variant="overline">Models</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: 2,
                      gridTemplateRows: ''
                    }}>
                    {appSettings?.models
                      ? Object.keys(appSettings?.models).map((model: string) => (
                          <MultiSelect
                            key={model}
                            label={`${model} Model`}
                            sx={{ textTransform: 'capitalize' }}
                            options={appSettings?.models?.[model] as string[]}
                            value={filters?.models?.[model] || []}
                            onChange={(value: string[]) =>
                              updateFilter({ models: { [model]: value } })
                            }
                          />
                        ))
                      : null}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterToolbar;
