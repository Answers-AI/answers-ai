'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { Organization, AppSettings, ContextField } from 'types';
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    handleSubmit,
    control,
    setValue,
    register,
    reset,
    formState: { errors }
  } = useForm<OrgInput>({
    defaultValues: {
      ...organization,
      contextFields: organization?.contextFields || []
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'contextFields'
  });

  useEffect(() => {
    if (fields.length > 0) {
      setEditIndex(fields.length - 1);
    }
  }, [fields]);

  const handleSaveField = (index: number) => {
    const updatedField = {
      fieldId: fields[index].fieldId,
      fieldType: fields[index].fieldType,
      fieldTextValue: fields[index].fieldTextValue,
      helpText: fields[index].helpText
    };

    update(index, updatedField);
    setEditIndex(null);
  };

  const handleAddNewField = () => {
    append({ fieldId: '', fieldType: '', fieldTextValue: '', helpText: '' });
  };

  const onSubmit = async (data: OrgInput) => {
    setLoading(true);
    try {
      await axios.patch(`/api/organizations`, { ...data });
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Box p={8}>
      <Typography variant="h2" component="h1">
        Organization
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
          <Grid item sm={12}>
            <TextField
              {...register('name', { required: true })}
              rows={2}
              label="Organization Name"
              error={Boolean(errors.name)}
              size="small"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item sm={12} sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={handleAddNewField}>
              Add New Field
            </Button>
          </Grid>
          <Grid item sm={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Help Text</TableCell>
                    <TableCell>Field Text Value</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.fieldId}>
                      <TableCell sx={{ width: '20%' }}>
                        {editIndex === index ? (
                          <TextField
                            {...register(`contextFields.${index}.fieldId`, {
                              required: true
                            })}
                            onChange={(e) => {
                              const updatedFields = [...fields];
                              updatedFields[index].fieldId = e.target.value;
                              setValue(`contextFields.${index}.fieldId`, e.target.value);
                            }}
                            multiline
                            rows={3}
                            fullWidth
                            size="small"
                            error={Boolean(errors.contextFields?.[index]?.fieldId)}
                          />
                        ) : (
                          field.fieldId
                        )}
                      </TableCell>
                      <TableCell sx={{ width: '30%' }}>
                        {editIndex === index ? (
                          <TextField
                            {...register(`contextFields.${index}.helpText`, {
                              required: true
                            })}
                            onChange={(e) => {
                              const updatedFields = [...fields];
                              updatedFields[index].helpText = e.target.value;
                              setValue(`contextFields.${index}.helpText`, e.target.value);
                            }}
                            multiline
                            rows={3}
                            fullWidth
                            size="small"
                            error={Boolean(errors.contextFields?.[index]?.helpText)}
                          />
                        ) : (
                          field.helpText
                        )}
                      </TableCell>
                      <TableCell sx={{ width: '40%' }}>
                        {editIndex === index ? (
                          <TextField
                            {...register(`contextFields.${index}.fieldTextValue`, {
                              required: true
                            })}
                            onChange={(e) => {
                              const updatedFields = [...fields];
                              updatedFields[index].fieldTextValue = e.target.value;
                              setValue(`contextFields.${index}.fieldTextValue`, e.target.value);
                            }}
                            multiline
                            rows={3}
                            fullWidth
                            size="small"
                            error={Boolean(errors.contextFields?.[index]?.fieldTextValue)}
                          />
                        ) : (
                          field.fieldTextValue
                        )}
                      </TableCell>
                      <TableCell sx={{ width: '10%' }}>
                        {editIndex === index ? (
                          <>
                            <IconButton onClick={() => handleSaveField(index)}>
                              <SaveIcon />
                            </IconButton>
                            <IconButton onClick={() => setEditIndex(null)}>
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton onClick={() => setEditIndex(index)}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={12} sx={{ textAlign: 'right' }}>
            <Button variant="outlined" onClick={handleAddNewField}>
              Add New Field
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained" type="submit">
          Save Organization
        </Button>
      </Box>
    </Box>
  );
};

export default OrganizationForm;
