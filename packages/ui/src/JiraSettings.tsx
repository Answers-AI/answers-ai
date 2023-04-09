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
export interface JiraSettingsProps {
  appSettings: AppSettings;
  editable: boolean;
}
export const JiraSettings = ({ appSettings, editable }: JiraSettingsProps) => {
  const { isLoading, updateAppSettings } = useAppSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(appSettings);
  React.useEffect(() => {
    setLocalSettings(appSettings);
  }, [appSettings]);
  const handleSave = () => {
    updateAppSettings(localSettings);
  };

  const handleEnableProject = (project: { key: string; enabled: boolean }) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      jira: {
        ...prevSettings?.jira,
        projects: prevSettings?.jira?.projects?.map((p) => {
          if (p.key === project.key) {
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

  const allToggled = localSettings?.jira?.projects?.every((p) => p.enabled);

  const handleToggleAll = () => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      jira: {
        ...prevSettings?.jira,
        projects: prevSettings?.jira?.projects?.map((p) => ({
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
      <FormControl sx={{}} component="fieldset" variant="standard">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormLabel color="primary" component="legend">
            <strong>Enabled Projects</strong>
          </FormLabel>
          <Button onClick={handleToggleAll}>
            {allToggled ? 'Deselect' : 'Select'} All {localSettings?.jira?.projects?.length}
          </Button>
        </Box>
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}>
          {localSettings &&
            localSettings?.jira?.projects?.map((project) => (
              <FormControlLabel
                key={project.key}
                control={
                  <Checkbox
                    name={project.key}
                    checked={!!project.enabled}
                    onChange={() => handleEnableProject(project)}
                  />
                }
                label={project.key}
              />
            ))}
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>

      {editable ? (
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
      ) : null}
    </Box>
  );
};
export default JiraSettings;
