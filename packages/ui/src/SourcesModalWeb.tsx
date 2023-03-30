import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  Container,
  FormGroup,
  FormControlLabel,
  Button,
  Switch
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export interface SourceUrl {
  id: string;
  domain: string;
  url: string;
}

const SourcesModalWeb = ({
  handleAddUrl,
  handleAddDomain,
  isOpen
}: {
  handleAddUrl?: any;
  handleAddDomain?: any;
  isOpen: boolean;
}) => {
  const [open, setOpen] = useState(isOpen);
  const [data, setData] = useState<SourceUrl[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [entireDomain, setEntireDomain] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('useEffect', open);
    if (open) {
      const getUrls = async () => {
        console.log('Getting data from list endpoint...');
        try {
          const webUrls = await axios.post(`/api/ai/getFullUrlList`).catch((error) => {
            throw new Error(error);
          });

          if (webUrls?.data && webUrls?.data?.length > 0) {
            setData(webUrls.data);
          } else {
            setData([]);
          }
        } catch (error) {
          console.log(error);
          setData([]);
        }
      };
      getUrls();
    }
  }, [open]);

  const groupByDomain = (data: SourceUrl[]) => {
    const groups: { [key: string]: SourceUrl[] } = {};

    data.forEach((group) => {
      const { domain } = group;
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(group);
    });

    return groups;
  };

  const groups = groupByDomain(data);

  const indexUrl = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newUrl.trim() === '') {
      alert('Please enter a url');
      return;
    }
    if (entireDomain) {
      console.log(`Adding domain: "${newUrl}"...`);
      const domainResponse = await handleAddDomain([newUrl]);
      console.log({ domainResponse });
    } else {
      console.log(`Adding url: "${newUrl}"...`);
      const urlRespn = await handleAddUrl([newUrl]);
      console.log({ urlRespn: urlRespn });
    }
    setNewUrl('');
    setEntireDomain(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container
        maxWidth="md"
        sx={{
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'scroll',
          minHeight: '80vh',
          maxHeight: '80vh'
        }}>
        <Box
          onSubmit={indexUrl}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
          <TextField
            sx={{ ml: 1, flex: 1 }}
            placeholder="Add URL to Index"
            required
            value={newUrl}
            variant="outlined"
            onChange={(event) => setNewUrl(event.target.value)}
            inputProps={{ 'aria-label': 'add a domain textbox' }}
          />
          <FormControlLabel
            control={
              <Switch
                sx={{ ml: 1, flex: 1 }}
                checked={entireDomain}
                onChange={(event) => setEntireDomain(event.target.checked)}
              />
            }
            label="Entire Domain?"
          />
          <Button type="submit" size="large" sx={{ p: '10px' }} aria-label="add domain">
            +
          </Button>
        </Box>

        {Object.keys(groups).map((domain) => (
          <Accordion key={domain}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FormControlLabel control={<Checkbox size="medium" />} label={domain} />
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {!!groups[domain].length &&
                  groups[domain].map((url) => (
                    <FormControlLabel
                      key={url.id}
                      control={<Checkbox size="small" />}
                      label={url.url}
                      sx={{ pl: 4 }}
                    />
                  ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Modal>
  );
};

export default SourcesModalWeb;
