'use client';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAnswers } from './AnswersContext';

import { AppSettings, AppService } from 'types';
import MultiSelect from './MultiSelect';
import AutocompleteSelect from './AutocompleteSelect';

const FilterToolbar = ({
  appSettings
}: {
  appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
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
              p: 0,
              minHeight: '0',
              justifyContent: 'flex-start',
              gap: 2
            },
            '.MuiAccordionSummary-content': { m: 0, flex: 0 },
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
                value={filters?.projectName || []}
                onChange={(value: string[]) => updateFilter({ projectName: value })}
              />
              <AutocompleteSelect
                label={`Status`}
                sx={{ textTransform: 'capitalize' }}
                options={['to do', 'in progress', 'done']}
                value={filters?.status_category || []}
                onChange={(value: string[]) => updateFilter({ status_category: value })}
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
                value={filters?.assignee_name || []}
                onChange={(value: string[]) => updateFilter({ assignee_name: value })}
              />
              <AutocompleteSelect
                label="Channel"
                options={
                  appSettings?.slack?.channels?.filter((s) => s.enabled)?.map((s) => s.name) || []
                }
                value={filters?.channelId || []}
                onChange={(value: string[]) => updateFilter({ channelId: value })}
              />
              <AutocompleteSelect
                label="Web"
                options={[]}
                // options={appSettings?.web?.urls?.map((s) => s.url) || []}
                value={filters?.url || []}
                onChange={(value: string[]) => updateFilter({ url: value })}
              />
            </Box>
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterToolbar;
