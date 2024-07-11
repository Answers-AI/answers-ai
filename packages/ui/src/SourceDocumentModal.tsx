'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { Rating } from 'db/generated/prisma-client';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useAnswers } from './AnswersContext';

import { MessageFeedback, User, Document } from 'types';
import { FormControlLabel, Checkbox } from '@mui/material';

interface IFormInput extends Partial<MessageFeedback> {}

interface ModalProps {
  documents: Document[];
  onClose?: () => void;
}

const SourceDocumentModal: React.FC<ModalProps> = ({ documents, onClose }) => {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (onClose) onClose();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Paper
          sx={{
            width: '100%',
            maxWidth: 800,
            background: 'none',
            backgroundColor: 'background.paper',
            margin: 'auto',
            outline: 'none',

            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
          <Box
            sx={{
              position: 'sticky',
              background: 'none',
              backgroundColor: 'background.paper',
              top: 0,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2
            }}>
            <Typography variant="h5" component="h3">
              Document Details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            {documents.map((doc, index) => (
              <Box
                key={index}
                sx={{ border: '1px solid', borderColor: 'grey.300', p: 2, borderRadius: 1 }}>
                <Typography variant="body2" component="p">
                  <strong>Source:</strong> {doc.metadata.source}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>PDF Version:</strong> {doc.metadata.pdf?.version}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Title:</strong> {doc.metadata.pdf?.info?.Title}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Creator:</strong> {doc.metadata.pdf?.info?.Creator}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Producer:</strong> {doc.metadata.pdf?.info?.Producer}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Creation Date:</strong> {doc.metadata.pdf?.info?.CreationDate}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Modification Date:</strong> {doc.metadata.pdf?.info?.ModDate}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Total Pages:</strong> {doc.metadata.pdf?.totalPages}
                </Typography>
                <Typography variant="body2" component="p">
                  <strong>Page Number:</strong> {doc.metadata.loc?.pageNumber}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mt: 2 }}>
                  <strong>Page Content:</strong> {doc.pageContent}
                </Typography>
              </Box>
            ))}
          </Box>

          {loading && (
            <LinearProgress
              variant="query"
              sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
            />
          )}
        </Paper>
      </Box>
    </Modal>
  );
};

export default SourceDocumentModal;
