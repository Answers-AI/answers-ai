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
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HandlebarsEditor, { MonacoOnInitializePane } from './HandlebarsEditor';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import { ErrorMessage } from '@hookform/error-message';

import { Sidekick, AppSettings } from 'types';
import Typography from '@mui/material/Typography';

interface SidekickInput
  extends Omit<
    Sidekick,
    | 'createdAt'
    | 'updatedAt'
    | 'createdByUser'
    | 'favoritedBy'
    | 'isGlobal'
    | 'isSharedWithOrg'
    | 'isFavoriteByDefault'
  > {}

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
  const defaultSliderValues = {
    presence: 0,
    temperature: 1,
    frequency: 0,
    maxCompletionTokens: 500
  };
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  // const [editorCode, setEditorCode] = useState('false');
  const [loading, setLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState(defaultSliderValues);
  const [code, setCode] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
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

  const onInitializePane: MonacoOnInitializePane = (monacoEditorRef, editorRef, model) => {
    // editorRef.current.focus();
    // monacoEditorRef.current.setModelMarkers(model[0], 'owner', null);
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
        await axios.patch(`/api/sidekicks/${id}`, { ...rest });
      } else {
        const { data: sidekick } = await axios.post('/api/sidekicks', { ...rest });
        router.push(`/sidekick-studio/${sidekick.id}`);
      }
    } catch (err: any) {
      console.log('error', err);
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

  const editorOptions = {
    minimap: {
      enabled: false
    },
    wordWrap: 'on',
    scrollbar: {
      horizontalScrollbarSize: 4,
      verticalScrollbarSize: 4
    },
    padding: '50px',
    scrollBeyondLastLine: false,
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true
  };

  return (
    <AnswersProvider appSettings={appSettings}>
      <Box p={8}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
            <Grid item xs={12} md={9}>
              <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                <Grid item sm={12}>
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
                  <Box
                    component="fieldset"
                    py={2}
                    sx={{
                      'borderRadius': 2,
                      'overflow': 'hidden',
                      '& .handlebars-editor .monaco-editor': {
                        '--vscode-editor-background': 'transparent',
                        '--vscode-editorGutter-background': 'transparent'
                      }
                    }}>
                    <legend>
                      <Typography variant="body2" sx={{ px: 1 }}>
                        System Prompt Template
                      </Typography>
                    </legend>
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
                            contextFields={contextFields}
                            editorOptions={editorOptions}
                            onInitializePane={onInitializePane}
                          />
                          {errors.systemPromptTemplate && (
                            <FormHelperText error>Required.</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    component="fieldset"
                    py={2}
                    sx={{
                      'borderRadius': 2,
                      'overflow': 'hidden',
                      '& .handlebars-editor .monaco-editor': {
                        '--vscode-editor-background': 'transparent',
                        '--vscode-editorGutter-background': 'transparent'
                      }
                    }}>
                    <legend>
                      <Typography variant="body2" sx={{ px: 1 }}>
                        User Prompt Template
                      </Typography>
                    </legend>
                    <HandlebarsEditor
                      key="userPromptTemplate"
                      code={sidekick?.userPromptTemplate ?? ''}
                      setCode={(value: string) => setValue('userPromptTemplate', value)}
                      editorOptions={editorOptions}
                      onInitializePane={onInitializePane}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    component="fieldset"
                    py={2}
                    sx={{
                      'borderRadius': 2,
                      'overflow': 'hidden',
                      '& .handlebars-editor .monaco-editor': {
                        '--vscode-editor-background': 'transparent',
                        '--vscode-editorGutter-background': 'transparent'
                      }
                    }}>
                    <legend>
                      <Typography variant="body2" sx={{ px: 1 }}>
                        Context String Render
                      </Typography>
                    </legend>
                    <HandlebarsEditor
                      key="contextStringRender"
                      code={sidekick?.contextStringRender ?? ''}
                      setCode={(value: string) => setValue('contextStringRender', value)}
                      editorOptions={editorOptions}
                      onInitializePane={onInitializePane}
                    />
                  </Box>
                </Grid>

                <Grid item container direction="row" rowSpacing={4} columnSpacing={4}>
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

            <Grid item xs={12} md={3}>
              <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <FormLabel id="sharedWith-label" sx={{ textAlign: 'center' }}>
                      Shared With
                    </FormLabel>
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
                          sx={{ mt: 4, width: '100%', mx: 'auto' }}>
                          <MenuItem value="private">Private</MenuItem>
                          <MenuItem value="org">My Org</MenuItem>
                          <MenuItem value="global">Global</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText error={true}>{errors.aiModel?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <FormLabel id="aiModel-label" sx={{ textAlign: 'center' }}>
                      AI Model
                    </FormLabel>
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
          </Grid>
        </Box>
      </Box>
    </AnswersProvider>
  );
};

export default SidekickForm;
