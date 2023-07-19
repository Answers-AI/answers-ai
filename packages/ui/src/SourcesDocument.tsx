'use client';
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import { useAnswers } from './AnswersContext';
import AutocompleteSelect from './AutocompleteSelect';
import SnackMessage from './SnackMessage';

import { Document } from 'types';

const SourcesDocument: React.FC<{}> = ({}) => {
  const source = 'document';
  const { filters, updateFilter } = useAnswers();
  const { data, mutate } = useSWR<{
    sources: Document[];
  }>(`/api/sources/${source}`, (url) => fetch(url).then((res) => res.json()), {
    dedupingInterval: 20000
  });

  const { sources } = data || {};

  const [showDocumentInput, setShowDocumentInput] = useState(true);
  const [theMessage, setTheMessage] = useState('');

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

    setTheMessage(`Uploading documents`);

    for (const index in documents) {
      const document = documents[index];

      if (!(document instanceof File)) {
        continue;
      }
      const documentName = document.name;

      let signedUrl;
      try {
        setTheMessage(`Verifying "${documentName}"`);
        const presignedUrlResponse = await axios.post('/api/aws/presigned-url', { documentName });
        if (presignedUrlResponse.data.status === 'error') {
          throw new Error(presignedUrlResponse.data.message);
        }
        signedUrl = presignedUrlResponse.data.signedUrl;
      } catch (err: any) {
        setTheMessage(`Error presigning "${documentName}": ${err.message}`);
        console.error(err);
        break;
      }

      try {
        setTheMessage(`Uploading "${documentName}"`);
        const uploadDocumentResponse = await axios.put(signedUrl, document, {
          headers: { 'Content-Type': document.type }
        });

        if (uploadDocumentResponse.data.status === 'error') {
          throw new Error(uploadDocumentResponse.data.message);
        }
      } catch (err: any) {
        setTheMessage(`Error uploading "${documentName}": ${err.message}`);
        console.error(err);
        break;
      }

      try {
        setTheMessage(`Indexing "${documentName}"`);
        const syncResponse = await axios.post(`/api/sync/document`, { documentName });
        if (syncResponse.data.status === 'error') {
          throw new Error(syncResponse.data.message);
        }
        setTheMessage(`${documentName} successfully indexed.`);
        setTimeout(() => {
          setTheMessage('');
        }, 3000);
      } catch (err: any) {
        setTheMessage(`Error indexing "${documentName}": ${err.message}`);
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
        setTheMessage(`Error updating filteers: ${err.message}`);
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
      {theMessage?.trim() !== '' && <SnackMessage message={theMessage} />}
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <AutocompleteSelect
          label={'Choose document'}
          placeholder={`My custom document`}
          value={filters?.datasources?.document?.url ?? []}
          onChange={(value) => updateFilter({ datasources: { document: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          options={sources ?? []}
          onFocus={() => mutate()}
        />

        {showDocumentInput && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="overline">Upload New Document</Typography>
            <Box
              component={`form`}
              sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
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
