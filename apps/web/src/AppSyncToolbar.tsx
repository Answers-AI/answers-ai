'use client';
import { Box, Button } from '@mui/material';
import { useAnswers } from './AnswersContext';
import axios from 'axios';
import { AppSettings, AppService } from 'types';
import { useFlags } from 'flagsmith/react';

const useSync = ({ onSync }: { onSync?: (a: AppService) => void }) => {
  const { filters } = useAnswers();
  const handleSync = async (service: AppService) => {
    try {
      await axios.post(`/api/sync/${service?.name}`, { filters });
      if (onSync) onSync(service);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleSync };
};

const AppSyncToolbar = ({
  appSettings,
  onSync
}: {
  appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
  const flags = useFlags(['sync']);
  const { handleSync } = useSync({ onSync });
  if (!flags.sync.enabled) return null;
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
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
export default AppSyncToolbar;
