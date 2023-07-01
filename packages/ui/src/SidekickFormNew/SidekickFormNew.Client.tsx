'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Slider from '@mui/material/Slider';

import { AnswersProvider, useAnswers } from '../AnswersContext';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import HandlebarsEditor from '../HandlebarsEditor';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Sidekick, AppSettings } from 'types';
import axios from 'axios';
import { Chip } from '@mui/material';

const allDepartments = [
  'Marketing',
  'Sales',
  'Support',
  'Engineering',
  'Product',
  'Finance',
  'Legal'
];

const SidekickFormNew = ({ appSettings }: { appSettings: AppSettings }): JSX.Element => {
  return (
    <AnswersProvider appSettings={appSettings}>
      <SidekickForm appSettings={appSettings} />
    </AnswersProvider>
  );
};
const SidekickForm = ({ appSettings }: { appSettings: AppSettings }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editorCode, setEditorCode] = useState('false');
  const [sidekicks, setSidekicks] = useState<Sidekick[]>([]);
  const [sidekick, setSidekick] = useState<Sidekick>({
    departments: [],
    id: '',
    label: '',
    placeholder: undefined,
    temperature: undefined,
    frequency: undefined,
    presence: undefined,
    aiModel: undefined,
    maxCompletionTokens: undefined,
    systemPromptTemplate: undefined,
    userPromptTemplate: undefined,
    contextStringRender: undefined
  });

  const handleDepartmentsChange = (event: ChangeEvent<{}>, departmentValue: string[]) => {
    setSidekick((prevSidekick) => ({
      ...prevSidekick,
      departments: departmentValue
    }));
    console.log(sidekick);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSidekick((prevSidekick) => ({
      ...prevSidekick,
      [name]: value
    }));
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const { name } = event.target;
    setSidekick((prevSidekick) => ({
      ...prevSidekick,
      [name]: Array.isArray(value) ? value[0] : value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { id, ...rest } = sidekick;
    await axios.post('/api/sidekicks', { ...rest });
  };

  const handleSidekicksChange = (event: ChangeEvent<{}>, sidekickValue: Sidekick) => {
    setSidekick(sidekickValue || { id: '', label: '' });
  };

  useEffect(() => {
    const fetchSidekicks = async () => {
      try {
        const response = await axios.get('/api/sidekicks');
        setSidekicks(response.data);
      } catch (error) {
        console.error('Error fetching sidekicks:', error);
      }
    };

    fetchSidekicks();
  }, []);

  return (
    <Box p={8}>
      <Typography variant="h2" component="h1">
        <Autocomplete
          options={sidekicks}
          getOptionLabel={(sidekick) => sidekick.label}
          onChange={handleSidekicksChange}
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Sidekicks" placeholder="Sidekicks" />
          )}
        />
      </Typography>

      <Divider sx={{ my: 2 }} />

      <form onSubmit={handleSubmit}>
        <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
          <Grid item xs={12} md={9}>
            <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
              <Grid item sm={12}>
                <TextField
                  name="label"
                  rows={2}
                  label="Sidekick Name"
                  value={sidekick.label}
                  onChange={handleChange}
                  size="small"
                  required
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  name="departments"
                  options={allDepartments}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  onChange={handleDepartmentsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Departments"
                      placeholder="Departments"
                    />
                  )}
                  sx={{
                    'width': '100%',
                    'height': '100%',
                    '& .MuiFormControl-root': {
                      height: '100%'
                    },
                    '& .MuiInputBase-root': {
                      height: '100%'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="placeholder"
                  multiline
                  rows={3}
                  size="small"
                  label="Help Text"
                  value={sidekick.placeholder}
                  onChange={handleChange}
                  required
                  sx={{ width: '100%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="systemPromptTemplate"
                  label="System Prompt Template"
                  value={sidekick.systemPromptTemplate || ''}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  // onClick={() => {
                  //   setEditorCode(sidekick.systemPromptTemplate || '');
                  //   setModalOpen(true);
                  // }}
                  // InputProps={{
                  //   readOnly: true
                  // }}
                  multiline
                  rows={6}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="userPromptTemplate"
                  label="User Prompt Template"
                  value={sidekick.userPromptTemplate || ''}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  // onClick={() => {
                  //   setEditorCode(sidekick.userPromptTemplate || '');
                  //   setModalOpen(true);
                  // }}
                  // InputProps={{
                  //   readOnly: true
                  // }}
                  multiline
                  rows={6}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="contextStringRender"
                  label="Context String Render"
                  value={sidekick.contextStringRender || ''}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  // onClick={() => {
                  //   setEditorCode(sidekick.contextStringRender || '');
                  //   setModalOpen(true);
                  // }}
                  // InputProps={{
                  //   readOnly: true
                  // }}
                  multiline
                  rows={6}
                />
              </Grid>

              <Grid item container direction="row" rowSpacing={4} columnSpacing={4}>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={{ margin: '0 auto' }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <FormLabel id="temperature-label" sx={{ textAlign: 'center' }}>
                    AI Model
                  </FormLabel>
                  <TextField
                    name="aiModel"
                    size="small"
                    required
                    value={sidekick.aiModel || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 4, width: '100%', mx: 'auto' }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <FormLabel id="temperature-label" sx={{ textAlign: 'center' }}>
                    Temperature
                  </FormLabel>
                  <Slider
                    aria-label="Always visible"
                    valueLabelDisplay="on"
                    name="temperature"
                    size="small"
                    value={sidekick.temperature || 1}
                    onChange={handleSliderChange}
                    min={0}
                    max={2}
                    step={0.01}
                    sx={{ mt: 4, width: '85%', mx: 'auto' }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <FormLabel id="frequency-label" sx={{ textAlign: 'center' }}>
                    Frequency
                  </FormLabel>
                  <Slider
                    value={sidekick.frequency || 0}
                    name="frequency"
                    valueLabelDisplay="on"
                    onChange={handleSliderChange}
                    min={0}
                    size="small"
                    max={2}
                    step={0.01}
                    sx={{ mt: 4, width: '85%', mx: 'auto' }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <FormLabel id="presence-label" sx={{ textAlign: 'center' }}>
                    Presence
                  </FormLabel>
                  <Slider
                    name="presence"
                    value={sidekick.presence || 0}
                    valueLabelDisplay="on"
                    onChange={handleSliderChange}
                    min={0}
                    size="small"
                    max={2}
                    step={0.01}
                    sx={{ mt: 4, width: '85%', mx: 'auto' }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <FormLabel id="maxTokens-label" sx={{ textAlign: 'center' }}>
                    Max Tokens
                  </FormLabel>
                  <Slider
                    name="maxCompletionTokens"
                    value={sidekick.maxCompletionTokens || 200}
                    valueLabelDisplay="on"
                    onChange={handleSliderChange}
                    min={200}
                    size="small"
                    max={4000}
                    step={1}
                    sx={{ mt: 4, width: '85%', mx: 'auto' }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Paper
            sx={{
              width: '100%',
              height: 'calc(100% - 32px)',
              maxWidth: 800,
              padding: 2,
              backgroundColor: 'background.paper',
              margin: 'auto',
              outline: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <HandlebarsEditor
              typeaheads={[]}
              editorCode={editorCode}
              onSave={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            />
          </Paper>
        </Modal>
      </form>
    </Box>
  );
};

export default SidekickFormNew;
