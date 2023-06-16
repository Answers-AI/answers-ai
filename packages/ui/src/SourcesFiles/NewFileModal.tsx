import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, TextField, Modal, Box, CircularProgress, Typography, Paper } from '@mui/material';

interface IFormInput {
  title: string;
  content: string;
  organizationId: string;
}

const FileContentModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      await axios.post('/api/sync/file', data);
      handleClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create File Content
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper
          sx={{
            width: '100%',
            maxWidth: 800,
            padding: 2,
            backgroundColor: 'background.paper',
            margin: 'auto',
            marginTop: '10%',
            outline: 'none'
          }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Create File Content
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('organizationId')}
              error={Boolean(errors.organizationId)}
              helperText={errors.organizationId?.message}
              label="Organization Id"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('title', { required: 'Title is required' })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              label="Title"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('content', { required: 'Content is required' })}
              error={Boolean(errors.content)}
              helperText={errors.content?.message}
              label="Content"
              fullWidth
              multiline
              rows={8}
              margin="normal"
            />
            {loading ? (
              <Box display="flex" justifyContent="center" marginTop="1rem">
                <CircularProgress />
              </Box>
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            )}
            {error && (
              <Box marginTop="1rem">
                <p>Error: {error}</p>
              </Box>
            )}
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default FileContentModal;
