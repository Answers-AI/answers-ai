'use client';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandLess';
import { useAnswers } from './AnswersContext';

import { AppSettings, AppService } from 'types';
import MultiSelect from './MultiSelect';

const FilterToolbar = ({
  appSettings
}: {
  appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
  const { filters, updateFilter } = useAnswers();
  return (
    <>
      <Accordion
        defaultExpanded={!Object.keys(filters)?.length}
        sx={{
          'width': '100%',
          'overflow': 'hidden',
          'm': 0,
          'background': 'none',
          'boxShadow': 'none',
          '.MuiAccordionSummary-root': {
            p: 0,
            minHeight: '0',
            justifyContent: 'flex-start',
            gap: 2
          },
          '.MuiAccordionSummary-content': { m: 0, flex: 0 },
          '.MuiAccordionDetails-root': { p: 0 }
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 2,
                gridTemplateRows: ''
              }}>
              <MultiSelect
                label="Project"
                options={
                  appSettings?.jira?.projects?.filter((s) => s.enabled)?.map((s) => s.key) || []
                }
                value={filters?.projectName || []}
                onChange={(value: string[]) => updateFilter({ projectName: value })}
              />
              <MultiSelect
                label={`Status`}
                sx={{ textTransform: 'capitalize' }}
                options={['to do', 'in progress', 'done']}
                value={filters?.status_category || []}
                onChange={(value: string[]) => updateFilter({ status_category: value })}
              />
              <MultiSelect
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
              <MultiSelect
                label="Channel"
                options={
                  appSettings?.slack?.channels?.filter((s) => s.enabled)?.map((s) => s.name) || []
                }
                value={filters?.channelId || []}
                onChange={(value: string[]) => updateFilter({ channelId: value })}
              />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                      onChange={(value: string[]) => updateFilter({ models: { [model]: value } })}
                    />
                  ))
                : null}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilterToolbar;
