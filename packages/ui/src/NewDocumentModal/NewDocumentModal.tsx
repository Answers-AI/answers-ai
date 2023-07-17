import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, TextField, Modal, Box, CircularProgress, Typography, Paper } from '@mui/material';
import { useFlags } from 'flagsmith/react';

interface IFormInput {
  title: string;
  content: string;
  source: string;
  organizationId: string;
}

interface ModalProps {
  title?: string;
  source?: string;
  onSave: (args?: any) => void;
}

const NewDocumentModal: React.FC<ModalProps> = ({ title, onSave, source = 'file' }) => {
  const flags = useFlags(['organization_override']);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormInput>({
    defaultValues: {
      source
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      await axios.post('/api/sync/file', data);
      handleClose();
      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div>
      <Button
        data-cy="new-document-modal-add-button"
        variant="contained"
        color="primary"
        onClick={handleOpen}
        fullWidth>
        {title ?? `Add ${source}`}
      </Button>
      <Modal open={open} onClose={handleClose}>
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
            <Typography variant="h4" component="h2">
              {title ?? `Add ${source} document`}
            </Typography>
            {flags?.organization_override?.enabled ? (
              <TextField
                {...register('organizationId')}
                error={Boolean(errors.organizationId)}
                helperText={errors.organizationId?.message}
                label="Organization Id"
                fullWidth
                margin="normal"
              />
            ) : null}
            <TextField
              {...register('title', { required: 'Title is required' })}
              error={Boolean(errors.title)}
              data-cy="new-document-modal-title-input"
              helperText={errors.title?.message}
              label="Title"
              fullWidth
            />
            <TextField
              {...register('content', { required: 'Content is required' })}
              data-cy="new-document-modal-content-input"
              error={Boolean(errors.content)}
              helperText={errors.content?.message}
              label="Content"
              fullWidth
              multiline
              sx={{
                'flex': 1,
                '.MuiInputBase-root': { flex: 1, alignItems: 'flex-start' },
                '.MuiInputBase-input': {
                  height: '100%!important',
                  overflow: 'auto!important'
                }
              }}
            />
            {loading ? (
              <Box display="flex" justifyContent="center" marginTop="1rem">
                <CircularProgress />
              </Box>
            ) : (
              <Button
                data-cy="new-document-modal-complete-add-button"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Add {source}
              </Button>
            )}
            {error && (
              <Box marginTop="1rem">
                <p>Error: {error}</p>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>
    </div>
  );
};

export default NewDocumentModal;
