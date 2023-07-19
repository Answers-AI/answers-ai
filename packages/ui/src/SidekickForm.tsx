'use client';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useFlags } from 'flagsmith/react';

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import { ErrorMessage } from '@hookform/error-message';

import { AnswersProvider } from './AnswersContext';
import HandlebarsEditor from './HandlebarsEditor';
import SnackMessage from './SnackMessage';

import { Sidekick, AppSettings } from 'types';
import { Typography } from '@mui/material';

const editorStyles = {
  'borderRadius': 1.5,
  'textAlign': 'left',
  'margin': 0,
  'borderStyle': 'solid',
  'borderWidth': '1px',
  'minWidth': '0%',
  'paddingRight': 1,
  'paddingLeft': 1.5,
  'py': 2,
  'position': 'relative',
  'borderColor': 'rgba(255, 255, 255, .23)',

  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 1)'
  },

  '& legend': {
    color: '#9e9e9e',
    fontWeight: 400,
    fontSize: '.75rem',
    lineHeight: '1.4375em',
    px: 1,
    position: 'relative',
    display: 'block',
    maxWidth: 'calc(75%)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  '& .handlebars-editor .monaco-editor': {
    '--vscode-editor-background': 'transparent',
    '--vscode-editorGutter-background': 'transparent'
  }
};

interface SidekickInput
  extends Omit<
    Sidekick,
    | 'createdAt'
    | 'updatedAt'
    | 'createdByUser'
    | 'favoritedBy'
    | 'isGlobal'
    | 'isSystem'
    | 'isSharedWithOrg'
    | 'isFavoriteByDefault'
  > { }

const SidekickForm = ({
  appSettings,
  sidekick,
  allTags = [],
  contextFields
}: {
  appSettings: AppSettings;
  sidekick?: Sidekick;
  allTags?: string[];
  contextFields?: any;
}) => {
  const flags = useFlags(['sidekicks_system']);
  const defaultSliderValues = {
    presence: sidekick?.presence ?? 0,
    temperature: sidekick?.temperature ?? 1,
    frequency: sidekick?.frequency ?? 0,
    maxCompletionTokens: sidekick?.maxCompletionTokens ?? 500
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState(defaultSliderValues);
  const [theMessage, setTheMessage] = useState('');
  const [currentTab, setCurrentTab] = useState('System');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    control
  } = useForm<SidekickInput>({
    defaultValues: sidekick
  });

  const handleSliderTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSliderValues((prevSliderValues) => ({
      ...prevSliderValues,
      [name]: Number(value)
    }));
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const { name } = event.target as HTMLInputElement;
    setSliderValues((prevSidekick) => ({
      ...prevSidekick,
      [name]: Array.isArray(value) ? value[0] : value
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  const onSubmit = async (data: SidekickInput) => {
    setLoading(true);
    try {
      const { id, ...rest } = data;

      if ((data?.systemPromptTemplate?.trim() ?? '') === '') {
        setError('systemPromptTemplate', {
          type: 'required',
          message: 'Please enter a non-space character.'
        });

        throw new Error('Invalid Fields');
      }

      if ((data?.userPromptTemplate?.trim() ?? '') === '') {
        setError('userPromptTemplate', {
          type: 'required',
          message: 'Please enter a non-space character.'
        });

        throw new Error('Invalid Fields');
      }

      if (id) {
        setTheMessage('... Updating your Sidekick');
        await axios.patch(`/api/sidekicks/${id}/edit`, { ...rest });
        setTheMessage('Your sidekick was saved successfully.');
      } else {
        setTheMessage('... Creating your Sidekick');
        const { data: sidekick } = await axios.post('/api/sidekicks/new', { ...rest });
        setTheMessage('Your sidekick was saved successfully.');
        router.replace(`/sidekick-studio/${sidekick.id}/edit`);
      }
    } catch (err: any) {
      setTheMessage('');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError('root.serverError', { type: 'custom', message: err.response.data });
      } else if (err.request) {
        // The request was made but no response was received
        setError('root.serverError', {
          type: 'custom',
          message: 'No response received from the server'
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('root.serverError', { type: 'custom', message: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const selectStyles = {
    '& legend': {
      color: '#9e9e9e',

      span: {
        opacity: 1,
        transform: 'translateY(-25%)'
      }
    }
  };

  return (
    <AnswersProvider appSettings={appSettings}>
      <Box p={8} sx={{ position: 'relative' }}>
        <SnackMessage message={theMessage} />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
            <Grid item xs={12}>
              <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                <Grid item sm={8}>
                  <Controller
                    name="label"
                    control={control}
                    defaultValue={sidekick?.label ?? ''}
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        label="Sidekick Name"
                        size="small"
                        sx={{ width: '100%' }}
                        error={!!errors.label}
                        helperText={errors.label && 'Required'}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <Controller
                      name="sharedWith"
                      control={control}
                      defaultValue={sidekick?.sharedWith ?? 'private'}
                      render={({ field }) => (
                        <Select
                          labelId="sharedWith-label"
                          {...field}
                          size="small"
                          defaultValue={sidekick?.sharedWith ?? 'private'}
                          required
                          fullWidth
                          label="Shared With"
                          sx={{ ...selectStyles, pt: 1, pb: 0, width: '100%', mx: 'auto' }}>
                          <MenuItem value="private">Private</MenuItem>
                          <MenuItem value="org">My Org</MenuItem>
                          <MenuItem value="global">Global</MenuItem>
                          {flags?.sidekicks_system?.enabled && (
                            <MenuItem value="system">System</MenuItem>
                          )}
                        </Select>
                      )}
                    />
                    <FormHelperText error={true}>{errors.aiModel?.message}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="tags"
                    rules={{ required: true }}
                    defaultValue={sidekick?.tags || []}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        onChange={(event, item) => {
                          onChange(item);
                        }}
                        freeSolo
                        multiple
                        value={value ?? []}
                        options={allTags}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                              key={option}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Tags"
                            placeholder="Add tags"
                            variant="outlined"
                            error={!!errors.tags}
                            helperText={errors.tags && 'At least one (1) tag required'}
                            required
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
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="placeholder"
                    control={control}
                    defaultValue={sidekick?.placeholder ?? ''}
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={2}
                        label="Help Text"
                        size="small"
                        fullWidth
                        error={!!errors.placeholder}
                        helperText={errors.placeholder && 'Required'}
                      />
                    )}
                  />
                </Grid>
              

                <Grid item xs={12}>
                  <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 4 }}>
                    <Tab label="System Message" value="System" />
                    <Tab label="User Message" value="User" />
                    <Tab label="Context Parser" value="Context" />
                    <Tab label="Advanced" value="Advanced" />
                  </Tabs>
                  <Box role="tabpanel" hidden={currentTab !== 'System'}>
                    <Grid container rowSpacing={4} columnSpacing={4}>
                      <Grid item xs={12} md={8}>
                        <Box component="fieldset" sx={editorStyles}>
                          <legend>System Prompt Template *</legend>
                          <Controller
                            name="systemPromptTemplate"
                            control={control}
                            defaultValue={sidekick?.systemPromptTemplate ?? ''}
                            rules={{ required: true }}
                            render={({ field: { ref, ...field } }) => (
                              <FormControl fullWidth error={!!errors.systemPromptTemplate}>
                                <HandlebarsEditor
                                  key="systemPromptTemplate"
                                  code={sidekick?.systemPromptTemplate ?? ''}
                                  setCode={(value: string) => setValue('systemPromptTemplate', value)}
                                  contextFields={{ ...contextFields, userInput: '', context: '' }}
                                  readOnly={false}
                                />
                                {errors.systemPromptTemplate && (
                                  <FormHelperText error>Required.</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Box>

                      </Grid>
                      <Grid item xs={12} md={4}>
                        {/* <Typography  sx={{ mb: 2 }}>
                          Help Text
                        </Typography> */}

                       
                      </Grid>
                    </Grid>
                  </Box>

                  <Box role="tabpanel" hidden={currentTab !== 'User'}>
                    <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                      <Grid item xs={12} md={8}>
                        <Box component="fieldset" sx={editorStyles}>
                          <legend>User Prompt Template *</legend>
                          <Controller
                            name="userPromptTemplate"
                            control={control}
                            defaultValue={sidekick?.systemPromptTemplate ?? ''}
                            rules={{ required: true }}
                            render={({ field: { ref, ...field } }) => (
                              <FormControl fullWidth error={!!errors.userPromptTemplate}>
                                <HandlebarsEditor
                                  key="userPromptTemplate"
                                  code={sidekick?.userPromptTemplate ?? ''}
                                  setCode={(value: string) => setValue('userPromptTemplate', value)}
                                  readOnly={false}
                                />
                                {errors.userPromptTemplate && (
                                  <FormHelperText error>Required.</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        {/* <Typography  sx={{ mb: 2 }}>
                          Help Text
                        </Typography> */}

                        
                      </Grid>
                    </Grid>
                  </Box>

                  <Box role="tabpanel" hidden={currentTab !== 'Context'}>
                    <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                      <Grid item xs={12} md={8}>

                        <Box component="fieldset" sx={editorStyles}>
                          <legend>Context String Render</legend>
                          <Controller
                            name="contextStringRender"
                            control={control}
                            defaultValue={sidekick?.contextStringRender ?? ''}
                            render={({ field: { ref, ...field } }) => (
                              <FormControl fullWidth error={!!errors.contextStringRender}>
                                <HandlebarsEditor
                                  key="contextStringRender"
                                  code={sidekick?.contextStringRender ?? ''}
                                  setCode={(value: string) => setValue('contextStringRender', value)}
                                  readOnly={false}
                                />
                                {errors.contextStringRender && (
                                  <FormHelperText error>Required.</FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Box>

                      </Grid>
                      <Grid item xs={12} md={4}>
                        {/* <Typography  sx={{ mb: 2 }}>
                          Help Text
                        </Typography> */}

                       
                      </Grid>
                    </Grid>
                  </Box>

                  <Box role="tabpanel" hidden={currentTab !== 'Advanced'}>
                    <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                      <Grid item xs={12} md={6}>
                        <Grid container direction="row" rowSpacing={4} columnSpacing={4}>

                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                              <Controller
                                name="aiModel"
                                control={control}
                                defaultValue={sidekick?.aiModel ?? 'gpt-3.5-turbo'}
                                render={({ field }) => (
                                  <Select
                                    labelId="aiModel-label"
                                    {...field}
                                    size="small"
                                    required
                                    defaultValue={sidekick?.aiModel ?? 'gpt-3.5-turbo'}
                                    fullWidth
                                    label="AI Model"
                                    sx={{ ...selectStyles, pt: 1, pb: 0, width: '100%', mx: 'auto' }}>
                                    <MenuItem value="gpt-3.5-turbo">GPT 3.5</MenuItem>
                                    <MenuItem value="gpt-3.5-turbo-16k">GPT 3.5 16k</MenuItem>
                                    <MenuItem value="gpt-4">GPT 4</MenuItem>
                                  </Select>
                                )}
                              />
                              <FormHelperText error={true}>{errors.aiModel?.message}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
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
                                onChange={handleSliderTextChange}
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

                          <Grid item xs={12} md={6}>
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
                                onChange={handleSliderTextChange}
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

                          <Grid item xs={12} md={6}>
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
                                onChange={handleSliderTextChange}
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

                          <Grid item xs={12}  md={6}>
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
                                onChange={handleSliderTextChange}
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
                          </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {/* <Typography  sx={{ mb: 2 }}>
                            Help Text
                          </Typography> */}

                          
                        </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <ErrorMessage
                    errors={errors}
                    name="multipleErrorInput"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    }
                  />
                  <Button type="submit" variant="contained" sx={{ margin: '0 auto' }}>
                    {sidekick?.id ? 'Save Sidekick' : 'Create Sidekick'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AnswersProvider>
  );
};

export default SidekickForm;
