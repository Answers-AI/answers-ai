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
import { AppSettings } from 'types';
import useAppSettings from './useAppSettings';
export interface ConfluenceSettingsProps {
  appSettings: AppSettings;
}
export const ConfluenceSettings = ({ appSettings }: ConfluenceSettingsProps) => {
  const { isLoading, updateAppSettings } = useAppSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(appSettings);
  React.useEffect(() => {
    setLocalSettings(appSettings);
  }, [appSettings]);
  const handleSave = () => {
    updateAppSettings(localSettings);
  };

  const handleEnableSpace = (space: { key: string; enabled: boolean }) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      confluence: {
        ...prevSettings?.confluence,
        spaces: prevSettings?.confluence?.spaces?.map((p) => {
          if (p.key === space.key) {
            return {
              ...p,
              enabled: !p.enabled
            };
          }
          return p;
        })
      }
    }));
  };

  // return <div>Loading...</div>;

  const allToggled = localSettings?.confluence?.spaces?.every((p) => p.enabled);

  const handleToggleAll = () => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      confluence: {
        ...prevSettings?.confluence,
        spaces: prevSettings?.confluence?.spaces?.map((p) => ({
          ...p,
          enabled: !allToggled
        }))
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
      <Typography variant="h5">Confluence</Typography>
      <Paper sx={{ p: 2 }}>
        <FormControl sx={{}} component="fieldset" variant="standard">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormLabel color="primary" component="legend">
              <strong>Enabled Spaces</strong>
            </FormLabel>
            <Button onClick={handleToggleAll}>
              {allToggled ? 'Deselect' : 'Select'} All {localSettings?.confluence?.spaces?.length}
            </Button>
          </Box>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}>
            {localSettings &&
              localSettings?.confluence?.spaces?.map((space) => (
                <FormControlLabel
                  key={space.key}
                  control={
                    <Checkbox
                      name={space.key}
                      checked={!!space.enabled}
                      onChange={() => handleEnableSpace(space)}
                    />
                  }
                  label={space.name}
                />
              ))}
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, py: 2 }}>
          <Button
            type="button"
            color="error"
            variant="text"
            onClick={() => setLocalSettings(appSettings)}
            disabled={isLoading}>
            Discard
          </Button>
          <Button type="button" variant="contained" onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default ConfluenceSettings;
