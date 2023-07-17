'use client';
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import { useAnswers } from '../AnswersContext';
import AutocompleteSelect from '../AutocompleteSelect';

import { Document } from 'types';

const SourcesDocument: React.FC<{}> = ({}) => {
  const source = 'document';
  const { filters, updateFilter } = useAnswers();
  const { data, mutate } = useSWR<{
    sources: Document[];
  }>(`/api/sources/${source}`, (url) => fetch(url).then((res) => res.json()));

  const { sources } = data || {};

  const [showDocumentInput, setShowDocumentInput] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const [documents, setDocuments] = useState<FileList | null>();

  function handleDocuments(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const newDocs = (e.target as HTMLInputElement).files;
    setDocuments(newDocs);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!documents?.length) {
      return;
    }

    for (const index in documents) {
      const document = documents[index];

      if (!(document instanceof File)) {
        continue;
      }
      const documentName = document.name;

      let signedUrl;
      try {
        setStatusMessage(`Verifying "${documentName}"`);
        const presignedUrlResponse = await axios.post('/api/aws/presigned-url', { documentName });
        if (presignedUrlResponse.data.status === 'error') {
          throw new Error(presignedUrlResponse.data.message);
        }
        signedUrl = presignedUrlResponse.data.signedUrl;
      } catch (err: any) {
        setStatusMessage(`Error presigning "${documentName}": ${err.message}`);
        console.error(err);
        break;
      }

      try {
        setStatusMessage(`Uploading "${documentName}"`);
        const uploadDocumentResponse = await axios.put(signedUrl, document, {
          headers: { 'Content-Type': document.type }
        });

        if (uploadDocumentResponse.data.status === 'error') {
          throw new Error(uploadDocumentResponse.data.message);
        }
      } catch (err: any) {
        setStatusMessage(`Error uploading "${documentName}": ${err.message}`);
        console.error(err);
        break;
      }

      try {
        setStatusMessage(`Indexing "${documentName}"`);
        const syncResponse = await axios.post(`/api/sync/document`, { documentName });
        if (syncResponse.data.status === 'error') {
          throw new Error(syncResponse.data.message);
        }
        setStatusMessage(`${documentName} successfully indexed.`);
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      } catch (err: any) {
        setStatusMessage(`Error indexing "${documentName}": ${err.message}`);
        console.error(err);
        break;
      }

      try {
        const newDocuments = [
          ...(filters?.datasources?.document?.url ?? []),
          { title: documentName, url: slugify(documentName) } as Document
        ];

        updateFilter({
          datasources: { document: { url: newDocuments } }
        });
      } catch (err: any) {
        setStatusMessage(`Error updating filteers: ${err.message}`);
        console.error(err);
      }
    }
  }

  const slugify = (text?: string) =>
    text
      ?.toLowerCase()
      ?.replace(/ /g, '-')
      ?.replace(/[^\w-]+/g, '');

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Typography variant="body2" color="error">
          {statusMessage}
        </Typography>
        <Typography variant="overline">Choose Document</Typography>
        <AutocompleteSelect
          value={filters?.datasources?.document?.url ?? []}
          onChange={(value) => updateFilter({ datasources: { document: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          options={sources ?? []}
        />
        {showDocumentInput && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="overline">Upload New Document</Typography>
            <Box
              component={`form`}
              sx={{ px: 1 }}
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data">
              <Input
                onChange={handleDocuments}
                type="file"
                fullWidth
                inputProps={{ multiple: true, accept: '.pdf,.doc,.docx' }}
              />

              <Button variant="contained" size="small" type="submit">
                Upload Document
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SourcesDocument;
