'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { AnswersProvider, useAnswers } from './AnswersContext';
import { useForm } from 'react-hook-form';
// import Modal from '@mui/material/Modal';
// import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
// import HandlebarsEditor from './HandlebarsEditor';
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

interface SidekickInput
  extends Omit<
    Sidekick,
    'createdAt' | 'updatedAt' | 'id' | 'createdByUser' | 'favoritedBy' | 'isGlobal'
  > {}

const SidekickForm = ({
  appSettings,
  sidekick
}: {
  appSettings: AppSettings;
  sidekick?: Sidekick;
}) => {
  const router = useRouter();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [editorCode, setEditorCode] = useState('false');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SidekickInput>({
    defaultValues: sidekick
  });

  // const handleDepartmentsChange = (event: ChangeEvent<{}>, departmentValue: string[]) => {
  //   setSidekick((prevSidekick) => ({
  //     ...prevSidekick,
  //     departments: departmentValue
  //   }));
  // };

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setSidekick((prevSidekick) => ({
  //     ...prevSidekick,
  //     [name]: value
  //   }));
  // };

  // const handleSliderChange = (event: Event, value: number | number[]) => {
  //   const { name } = event.target;
  //   setSidekick((prevSidekick) => ({
  //     ...prevSidekick,
  //     [name]: Array.isArray(value) ? value[0] : value
  //   }));
  // };

  const onSubmit = async (data: SidekickInput) => {
    setLoading(true);
    try {
      const { id, ...rest } = data;
      if (id) {
        await axios.patch(`/api/sidekicks/${id}`, { ...rest });
      } else {
        const { data: sidekick } = await axios.post('/api/sidekicks', { ...rest });
        router.push(`/sidekick-studio/${sidekick.id}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <AnswersProvider appSettings={appSettings}>
      <Box p={8}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
            <Grid item xs={12} md={9}>
              <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                <Grid item sm={12}>
                  <TextField
                    {...register('label')}
                    rows={2}
                    label="Sidekick Name"
                    error={Boolean(errors.label)}
                    size="small"
                    required
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Autocomplete
                    multiple
                    options={allDepartments}
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    // onChange={handleDepartmentsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register('departments')}
                        error={Boolean(errors.departments)}
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
                    multiline
                    rows={3}
                    size="small"
                    label="Help Text"
                    {...register('placeholder')}
                    error={Boolean(errors.placeholder)}
                    required
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register('systemPromptTemplate')}
                    label="System Prompt Template"
                    error={Boolean(errors.systemPromptTemplate)}
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
                    {...register('userPromptTemplate')}
                    label="User Prompt Template"
                    error={Boolean(errors.userPromptTemplate)}
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
                    {...register('contextStringRender')}
                    label="Context String Render"
                    error={Boolean(errors.contextStringRender)}
                    // onChange={handleChange}
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
                      {...register('aiModel')}
                      size="small"
                      required
                      fullWidth
                      error={Boolean(errors.aiModel)}
                      sx={{ mt: 4, width: '100%', mx: 'auto' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small" error={Boolean(errors.temperature)}>
                    <FormLabel id="temperature-label" sx={{ textAlign: 'center' }}>
                      Temperature
                    </FormLabel>
                    <Slider
                      aria-label="Always visible"
                      valueLabelDisplay="on"
                      size="small"
                      {...register('temperature')}
                      min={0}
                      max={2}
                      step={0.01}
                      sx={{ mt: 4, width: '85%', mx: 'auto' }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth size="small" error={Boolean(errors.frequency)}>
                    <FormLabel id="frequency-label" sx={{ textAlign: 'center' }}>
                      Frequency
                    </FormLabel>
                    <Slider
                      {...register('frequency')}
                      valueLabelDisplay="on"
                      // onChange={handleSliderChange}
                      min={0}
                      size="small"
                      max={2}
                      step={0.01}
                      sx={{ mt: 4, width: '85%', mx: 'auto' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small" error={Boolean(errors.presence)}>
                    <FormLabel id="presence-label" sx={{ textAlign: 'center' }}>
                      Presence
                    </FormLabel>
                    <Slider
                      {...register('presence')}
                      valueLabelDisplay="on"
                      // onChange={handleSliderChange}
                      min={0}
                      size="small"
                      max={2}
                      step={0.01}
                      sx={{ mt: 4, width: '85%', mx: 'auto' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small" error={Boolean(errors.maxCompletionTokens)}>
                    <FormLabel id="maxTokens-label" sx={{ textAlign: 'center' }}>
                      Max Tokens
                    </FormLabel>
                    <Slider
                      {...register('maxCompletionTokens')}
                      valueLabelDisplay="on"
                      // onChange={handleSliderChange}
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
          {/* <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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
          </Modal> */}
        </Box>
      </Box>
    </AnswersProvider>
  );
};

export default SidekickForm;
