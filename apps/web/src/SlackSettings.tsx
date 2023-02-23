'use client';
import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material';
import React, { useState } from 'react';
import { AppSettings } from 'types';
import useAppSettings from 'useAppSettings';
export interface SlackSettingsProps {
  appSettings: AppSettings;
}
export const SlackSettings = ({ appSettings }: SlackSettingsProps) => {
  const { updateAppSettings } = useAppSettings();
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
  //     SlackProjects: event.target.value.split(',')
  //   }));
  // };

  // const handleEnableProject = (project: { key: string; enabled: boolean }) => {
  //   setLocalSettings((prevSettings) => ({
  //     ...prevSettings,
  //     Slack: {
  //       ...prevSettings?.Slack,
  //       projects: prevSettings?.Slack?.projects?.map((p) => {
  //         if (p.key === project.key) {
  //           return {
  //             ...p,
  //             enabled: !p.enabled
  //           };
  //         }
  //         return p;
  //       })
  //     }
  //   }));
  // };
  const handleEnableService = (service: { name: string; enabled: boolean }) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      services: prevSettings?.services?.map((p) => {
        if (p.name === service.name) {
          return {
            ...p,
            enabled: !p.enabled
          };
        }
        return p;
      })
    }));
  };
  // // return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 2
      }}>
      <FormControl sx={{}} component="fieldset" variant="standard">
        <FormLabel component="legend">Slack Projects</FormLabel>
        {/* <FormGroup
          sx={
            {
              // display: 'flex',
            }
          }>
          {appSettings &&
            appSettings?.Slack?.projects?.map((project) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={project.key}
                    checked={project.enabled}
                    onChange={() => handleEnableProject(project)}
                  />
                }
                label={project.key}
              />
            ))}
        </FormGroup> */}
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
        <Button type="button" variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button
          type="button"
          color="error"
          variant="outlined"
          onClick={() => setLocalSettings(appSettings)}>
          Discard
        </Button>
      </Box>
    </Box>
  );
};
export default SlackSettings;
