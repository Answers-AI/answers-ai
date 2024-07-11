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
import ReactMarkdown from 'react-markdown';

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
  const getDocumentLabel = (doc: Document) => {
    if (doc.metadata?.source == 'blob' && doc.metadata?.pdf) {
      return `${doc.metadata?.pdf?.info?.Title}`;
    }
    return (
      doc.title ??
      doc.url ??
      doc.metadata?.title ??
      doc.metadata?.url ??
      (doc.metadata?.filePath && doc.metadata?.repo
        ? `${doc.metadata?.repo}/${doc.metadata?.filePath}`
        : null) ??
      doc.metadata?.source
    );
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Paper
        sx={{
          width: '100%',

          background: 'none',
          backgroundColor: 'background.paper',
          margin: 'auto',
          outline: 'none',

          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%',
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
            {getDocumentLabel(documents[0])}
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
              {doc.metadata.source && (
                <Typography variant="body2" component="p">
                  <strong>Source:</strong> {doc.metadata.source}
                </Typography>
              )}
              {doc.metadata.url && (
                <Typography variant="body2" component="p">
                  <strong>Link:</strong>{' '}
                  <a href={doc.metadata.url} target="_blank">
                    {doc.metadata.url}
                  </a>
                </Typography>
              )}
              {doc.metadata.pdf?.totalPages && (
                <Typography variant="body2" component="p">
                  <strong>Total Pages:</strong> {doc.metadata.pdf?.totalPages}
                </Typography>
              )}
              {doc.metadata.loc?.pageNumber && (
                <Typography variant="body2" component="p">
                  <strong>Page Number:</strong> {doc.metadata.loc?.pageNumber}
                </Typography>
              )}
              {doc.pageContent && (
                <Typography variant="body2" component="div" sx={{ mt: 2, overflow: 'hidden' }}>
                  <strong>Page Content:</strong>
                  <ReactMarkdown>{doc.pageContent}</ReactMarkdown>
                </Typography>
              )}
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
  );
};

export default SourceDocumentModal;
