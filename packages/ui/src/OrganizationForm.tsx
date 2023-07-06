'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Grid from '@mui/material/Grid';
import { AnswersProvider } from './AnswersContext';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { Organization, AppSettings } from 'types';

interface ContextField {
  id: string;
  helpText: string;
  fieldType: string;
  fieldTextValue: string;
}

interface OrgInput
  extends Omit<
    Organization,
    | 'createdAt'
    | 'updatedAt'
    | 'users'
    | 'usersSelected'
    | 'documentPermissions'
    | 'appSettings'
    | 'image'
    | 'isFavoriteByDefault'
  > {
  contextFields: ContextField[];
}

const OrganizationForm = ({
  appSettings,
  organization
}: {
  appSettings: AppSettings;
  organization?: Organization;
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<OrgInput>({
    defaultValues: {
      contextFields: organization?.contextFields || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contextFields'
  });

  const [showNewField, setShowNewField] = useState(false);

  const handleSaveNewField = () => {
    append({ id: '', fieldType: '', fieldTextValue: '', helpText: '' });
    setShowNewField(false);
  };

  const onSubmit = (data: OrgInput) => {
    console.log(data);
    // Here you can handle the submission of your form
  };

  return (
    <AnswersProvider appSettings={appSettings}>
      <Box p={8}>
        <Typography variant="h2" component="h1">
          Organization
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
            <Grid item sm={12}>
              <TextField
                {...register('name')}
                rows={2}
                label="Organization Name"
                error={Boolean(errors.name)}
                size="small"
                required
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item sm={12}>
              {!showNewField && (
                <Grid item sm={12}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      append({ id: '', fieldType: '', fieldTextValue: '', helpText: '' });
                      setShowNewField(true);
                    }}>
                    Add New Context Field
                  </Button>
                </Grid>
              )}
              {showNewField &&
                fields.map((item, index) => (
                  <Grid item sm={12} key={item.id}>
                    <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                      <Grid item sm={12} md={6}>
                        <Controller
                          control={control}
                          name={`contextFields.${index}.id`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="ID"
                              multiline
                              rows={2}
                              size="small"
                              error={Boolean(errors?.contextFields?.[index]?.id)}
                              required
                              sx={{ width: '100%' }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item sm={12} md={6} key={item.id}>
                        <Controller
                          control={control}
                          name={`contextFields.${index}.helpText`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Help Text"
                              multiline
                              rows={2}
                              size="small"
                              error={Boolean(errors?.contextFields?.[index]?.helpText)}
                              sx={{ width: '100%' }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item sm={12} key={item.id}>
                        <Controller
                          control={control}
                          name={`contextFields.${index}.fieldType`}
                          render={({ field }) => (
                            <Select {...field} label="Field Type" sx={{ display: 'none' }}>
                              <MenuItem value="number">Number</MenuItem>
                              <MenuItem value="singleLine">Single Line Text</MenuItem>
                              <MenuItem value="multiLine" selected>
                                Multi Line Text
                              </MenuItem>
                            </Select>
                          )}
                        />

                        <Controller
                          control={control}
                          name={`contextFields.${index}.fieldTextValue`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Field Text Value"
                              multiline
                              rows={3}
                              size="small"
                              error={Boolean(errors?.contextFields?.[index]?.fieldTextValue)}
                              required
                              sx={{ width: '100%' }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item sm={12} key={item.id}>
                        <Button variant="outlined" onClick={() => setShowNewField(true)}>
                          Save Field
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Grid item sm={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Help Text</TableCell>
                      {/* <TableCell>Field Type</TableCell> */}
                      <TableCell>Field Text Value</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>{field.id}</TableCell>
                        <TableCell>{field.helpText}</TableCell>
                        {/* <TableCell>{field.fieldType}</TableCell> */}
                        <TableCell>{field.fieldTextValue}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => editField(index)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AnswersProvider>
  );
};

export default OrganizationForm;
