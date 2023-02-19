'use client';
import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  Box
} from '@mui/material';
import { AppSettings } from 'types';
import useAppSettings from './useAppSettings';

export const AppSettingsForm = ({ appSettings }: { appSettings: AppSettings }) => {
  const { isLoading, updateAppSettings } = useAppSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(appSettings);
  React.useEffect(() => {
    setLocalSettings(appSettings);
  }, [appSettings]);
  console.log('appSettings', { localSettings, appSettings });
  const handleSave = () => {
    updateAppSettings(localSettings);
  };

  const handleJiraProjectsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      jiraProjects: event.target.value.split(',')
    }));
  };

  const handleSlackChannelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      slackChannels: event.target.value.split(',')
    }));
  };
  const handleEnableProject = (project: { key: string; enabled: boolean }) => {
    console.log('EnableProject', project);
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
  const handleEnableService = (service: { name: string; enabled: boolean }) => {
    console.log('Enableservice', service);
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
  // return <div>Loading...</div>;

  return (
    <Box
      component="form"
      sx={{
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // gap: 2,
        padding: 4
      }}>
      <Typography variant="h1">Manage settings </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 2
        }}>
        <FormControl sx={{}} component="fieldset" variant="standard">
          <FormLabel component="legend">Jira Projects</FormLabel>
          <FormGroup
            sx={
              {
                // display: 'flex',
              }
            }>
            {localSettings &&
              localSettings?.jira?.projects?.map((project) => (
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
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
        <FormControl sx={{}} component="fieldset" variant="standard">
          <FormLabel component="legend">Services</FormLabel>
          <FormGroup
            sx={
              {
                // display: 'flex',
              }
            }>
            {localSettings &&
              localSettings?.services?.map((service) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={service.name}
                      checked={service.enabled}
                      onChange={() => handleEnableService(service)}
                    />
                  }
                  label={service.name}
                />
              ))}
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>

        {/* <TextField
        label="Jira Projects"
        fullWidth
        value={localSettings.jiraProjects.join(',')}
        onChange={handleJiraProjectsChange}
      />
      <TextField
        label="Slack Channels"
        fullWidth
        value={localSettings.slackChannels.join(',')}
        onChange={handleSlackChannelsChange}
      />
      {appSettings &&
        Object.entries(appSettings.jobBatchSizes).map(([jobName, batchSize]) => (
          <div key={jobName}>
            <span>{jobName}: </span>
            <Select
              value={localSettings.jobBatchSizes[jobName] || batchSize}
              onChange={(event) => handleJobBatchSizeChange(event, jobName)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </div>
        ))} */}
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
    </Box>
  );
};
