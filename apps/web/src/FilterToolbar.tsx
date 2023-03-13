'use client';
import { Box, Button } from '@mui/material';
import { useAnswers } from 'AnswersContext';
import axios from 'axios';
import { AppSettings, AppService } from 'types';

const FilterToolbar = ({
  appSettings
}: {
  appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
  const { setFiletrs, filters } = useAnswers();
  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
      {appSettings?.services?.map((service) => (
        <Button
          key={service?.name}
          sx={{
            position: 'relative'
          }}
          variant="outlined"
          color="primary"
          disabled={!service.enabled}
          onClick={() => handleSync(service)}>
          Sync {service.name}
        </Button>
      ))}
    </Box>
  );
};
export default FilterToolbar;
