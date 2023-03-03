'use client';
import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper
} from '@mui/material';
import React, { useState } from 'react';
import { AppSettings, SlackChannelSetting } from 'types';
import useAppSettings from 'useAppSettings';
export interface SlackSettingsProps {
  appSettings: AppSettings;
}
export const SlackSettings = ({ appSettings }: SlackSettingsProps) => {
  const { isLoading, updateAppSettings } = useAppSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(appSettings);
  React.useEffect(() => {
    setLocalSettings(appSettings);
  }, [appSettings]);
  const handleSave = () => {
    updateAppSettings(localSettings);
  };

  // const handleSlackProjectsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLocalSettings((prevSettings) => ({
  //     ...prevSettings,
  //     slackChannels: event.target.value.split(',')
  //   }));
  // };

  const handleEnableChannel = (channel: SlackChannelSetting) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      slack: {
        ...prevSettings?.slack,
        channels: prevSettings?.slack?.channels?.map((c) => {
          if (c.id === channel.id) {
            return {
              ...c,
              enabled: !c.enabled
            };
          }
          return c;
        })
      }
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',

        gap: 2
      }}>
      <Typography variant="h5">Slack</Typography>
      <Paper sx={{ p: 2 }}>
        <FormControl sx={{}} component="fieldset" variant="standard">
          <FormLabel component="legend">
            <strong>Enabled Channels</strong>
          </FormLabel>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}>
            {localSettings &&
              localSettings?.slack?.channels?.map((channel) => (
                <FormControlLabel
                  key={channel.id}
                  control={
                    <Checkbox
                      name={channel.name}
                      checked={channel.enabled}
                      onChange={() => handleEnableChannel(channel)}
                    />
                  }
                  label={channel.name}
                />
              ))}
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, py: 2 }}>
          <Button type="button" variant="contained" onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
          {/* <Button
            type="button"
            color="error"
            variant="outlined"
            onClick={() => setLocalSettings(appSettings)}
            disabled={isLoading}>
            Discard
          </Button> */}
        </Box>
      </Paper>
    </Box>
  );
};
export default SlackSettings;
