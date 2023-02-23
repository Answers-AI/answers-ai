'use client';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { AppSettings, AppService } from 'types';

const useSync = ({ onSync }: { onSync?: (a: AppService) => void }) => {
  const handleSync = async (service: AppService) => {
    try {
      await axios.post(`/api/sync/${service?.name}`);
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
  const { handleSync } = useSync({ onSync });
  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
      {appSettings?.services?.map((service) => (
        <Button
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
