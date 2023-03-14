'use client';
import { Box, Button } from '@mui/material';
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          gap: 2,
          gridTemplateRows: ''
        }}>
        <MultiSelect
          label="Project"
          options={appSettings?.jira?.projects?.filter((s) => s.enabled)?.map((s) => s.key) || []}
          value={filters?.projectName || []}
          onChange={(value: string[]) => updateFilter({ projectName: value })}
        />
        <MultiSelect
          label="Channel"
          options={appSettings?.slack?.channels?.filter((s) => s.enabled)?.map((s) => s.name) || []}
          value={filters?.channelId || []}
          onChange={(value: string[]) => updateFilter({ channelId: value })}
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          gap: 2,
          gridTemplateRows: ''
        }}>
        {Object.keys(appSettings?.models).map((model: any) => (
          <MultiSelect
            label={`${model} Model`}
            sx={{ textTransform: 'capitalize' }}
            options={appSettings?.models?.[model]}
            value={filters?.models?.[model] || []}
            onChange={(value: string[]) => updateFilter({ models: { [model]: value } })}
          />
        ))}
      </Box>
    </>
  );
};
export default FilterToolbar;
