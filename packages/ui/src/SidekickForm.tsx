'use client';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation';
import { AnswersProvider } from './AnswersContext';
import { useForm, Controller } from 'react-hook-form';
// import Modal from '@mui/material/Modal';
// import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import HandlebarsEditor from './HandlebarsEditor';
import Autocomplete from '@mui/material/Autocomplete';

import { Sidekick, AppSettings } from 'types';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';

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
  sidekick,
  allDepartments = []
}: {
  appSettings: AppSettings;
  sidekick?: Sidekick;
  allDepartments?: string[];
}) => {
  const defaultSliderValues = {
    presence: 0,
    temperature: 1,
    frequency: 0,
    maxCompletionTokens: 500
  };
  const router = useRouter();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [editorCode, setEditorCode] = useState('false');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sliderValues, setSliderValues] = useState(defaultSliderValues);

  const handleSliderChange = (event: ChangeEvent<any>, slideValue: number | number[]) => {
    const { name, value } = event.target;
    // console.log('handleSliderChange', { name, value, num: Number(value) });
    setSliderValues((prevSliderValues) => ({
      ...prevSliderValues,
      [name]: Number(value)
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
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
                  <Controller
                    control={control}
                    name="departments"
                    rules={{
                      required: 'required field'
                    }}
                    render={({ field: { onChange } }) => (
                      <Autocomplete
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
                        multiple
                        defaultValue={sidekick?.departments || []}
                        options={allDepartments}
                        freeSolo
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                              key={option}
                            />
                          ))
                        }
                        // getOptionLabel={(option) => option.label}
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Departments" placeholder="Departments" />
                        )}
                      />
                    )}
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
                      {sidekick?.id ? 'Save Sidekick' : 'Create Sidekick'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={3}>
              <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <FormLabel id="aiModel-label" sx={{ textAlign: 'center' }}>
                      AI Model
                    </FormLabel>
                    <Controller
                      name="aiModel"
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId="aiModel-label"
                          {...field}
                          size="small"
                          required
                          defaultValue={sidekick?.aiModel ?? 'gpt-3.5-turbo'}
                          fullWidth
                          sx={{ mt: 4, width: '100%', mx: 'auto' }}>
                          <MenuItem value="gpt-3.5-turbo">GPT 3.5</MenuItem>
                          <MenuItem value="gpt-3.5-turbo-16k">GPT 3.5 16k</MenuItem>
                          <MenuItem value="gpt-4">GPT 4</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText error={true}>{errors.aiModel?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TextField
                      name="temperature"
                      value={sliderValues.temperature}
                      onChange={handleSliderChange}
                      type="number"
                      fullWidth
                      size="small"
                      label="Temperature"
                      inputProps={{
                        min: 0,
                        max: 2,
                        step: 0.01
                      }}
                    />
                    <Slider
                      {...register('temperature')}
                      value={sliderValues.temperature}
                      name="temperature"
                      onChange={handleSliderChange}
                      min={0}
                      size="small"
                      max={2}
                      step={0.01}
                      sx={{ width: '85%' }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TextField
                      name="frequency"
                      value={sliderValues.frequency}
                      onChange={handleSliderChange}
                      type="number"
                      fullWidth
                      size="small"
                      label="Frequency"
                      inputProps={{
                        min: 0,
                        max: 2,
                        step: 0.01
                      }}
                    />
                    <Slider
                      {...register('frequency')}
                      value={sliderValues.frequency}
                      name="frequency"
                      onChange={handleSliderChange}
                      min={0}
                      size="small"
                      max={2}
                      step={0.01}
                      sx={{ width: '85%' }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TextField
                      name="presence"
                      value={sliderValues.presence}
                      onChange={handleSliderChange}
                      type="number"
                      fullWidth
                      size="small"
                      label="Presence"
                      inputProps={{
                        min: 0,
                        max: 2,
                        step: 0.01
                      }}
                    />
                    <Slider
                      {...register('presence')}
                      value={sliderValues.presence}
                      name="presence"
                      onChange={handleSliderChange}
                      min={0}
                      size="small"
                      max={2}
                      step={0.01}
                      sx={{ width: '85%' }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TextField
                      name="maxCompletionTokens"
                      value={sliderValues.maxCompletionTokens}
                      onChange={handleSliderChange}
                      type="number"
                      fullWidth
                      size="small"
                      label="Max Tokens"
                      inputProps={{
                        min: 200,
                        max: 4000,
                        step: 50
                      }}
                    />
                    <Slider
                      {...register('maxCompletionTokens')}
                      value={sliderValues.maxCompletionTokens}
                      name="maxCompletionTokens"
                      onChange={handleSliderChange}
                      min={200}
                      size="small"
                      max={4000}
                      step={50}
                      sx={{ width: '85%' }}
                    />
                  </Box>

                  {/* <FormControl size="small" error={Boolean(errors.maxCompletionTokens)}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                      <FormLabel id="maxTokens-label" sx={{ textAlign: 'left' }}>
                        Max Tokens
                      </FormLabel>
                    </Box>
                    
                  </FormControl> */}
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
