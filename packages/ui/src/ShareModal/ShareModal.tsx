'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Autocomplete,
  Button,
  TextField,
  Modal,
  Box,
  LinearProgress,
  Typography,
  Paper,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { useAnswers } from '@ui/AnswersContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from 'types';
import { useRouter } from 'next/navigation';

interface IFormInput {
  chatId: string;
  email: string[];
  users: User[];
}

interface ModalProps {
  title?: string;
  source?: string;
  onSave?: (args?: any) => void;
  onClose?: () => void;
}

const ShareModal: React.FC<ModalProps> = ({ title, onSave, onClose, source = 'file' }) => {
  const router = useRouter();
  const { chat, setChat } = useAnswers();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, dirtyFields, isDirty, isSubmitSuccessful },
    setError,
    clearErrors,
    reset
  } = useForm<IFormInput>({
    defaultValues: {
      chatId: chat?.id
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (onClose) onClose();
    setOpen(false);
  };

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      await axios.patch('/api/chats/share', {
        ...data,
        email: [...(chat?.users?.map((user: User) => user.email) ?? []), ...data.email]
      });

      router.refresh();
    } catch (err: any) {
      setError('email', { message: err.message ?? 'There was an error, please try again.' });
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async (email: string) => {
    setLoading(true);
    try {
      await axios.patch('/api/chats/share', {
        chatId: chat?.id!,
        email: chat?.users
          ?.filter((user: User) => user.email !== email)
          ?.map((user: User) => user.email)
      });

      router.refresh();
    } catch (err: any) {
      setError('email', { message: err.message ?? 'There was an error, please try again.' });
    } finally {
      setLoading(false);
    }
  };
  console.log('Chat', chat);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          width: '100%',
          maxWidth: 500,
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
          <Box>
            <Typography variant="h5" component="h3">
              Share this chat
            </Typography>
            <Typography>Invite teammates to collaborate together</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Autocomplete
              options={[]}
              multiple
              freeSolo
              fullWidth
              placeholder="Email, comma separated"
              onChange={(event, value) => {
                console.log('Change');
                if (value.some((email: string) => !/\S+@\S+\.\S+/.test(email))) {
                  setError('email', { message: 'Enter valid emails' });
                } else {
                  clearErrors('email');
                }
                setValue('email', value);
              }}
              renderInput={(params) => (
                <TextField
                  // {...register('email', {})}
                  {...params}
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Button
              variant="contained"
              // disabled={!isDirty && !isSubmitSuccessful}
              type="submit"
              sx={{ maxHeight: 50 }}>
              Invite
            </Button>
          </Box>
          <Box>
            <List dense>
              {chat?.users?.map((user) => (
                <ListItem
                  disablePadding
                  secondaryAction={
                    chat.ownerId !== user.id ? (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(user.email!)}>
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <Typography variant="overline">owner</Typography>
                    )
                  }>
                  <ListItemAvatar>
                    <Avatar src={user?.image!} />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} secondary={user?.email} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        {loading ? (
          <LinearProgress
            variant="query"
            sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
          />
        ) : null}
      </Paper>
    </Modal>
  );
};

export default ShareModal;
