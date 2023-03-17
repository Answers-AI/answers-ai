'use client';
import React from 'react';
import { Avatar, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { JsonViewer } from '@textea/json-viewer';
// import { deepOrange, deepPurple } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Message, User } from 'types';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  'border': `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  'backgroundColor':
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  'flexDirection': 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

interface MessageCardProps extends Partial<Message> {
  error?: object;
  prompt?: string;
  extra?: object;
  pineconeData?: object;
  filteredData?: object;
  unfilteredData?: object;
  context?: string;
  summary?: string;
  completionData?: object;
  filters?: object;
}

export const MessageCard = ({
  content,
  role,
  user,
  error,
  prompt,
  extra,
  pineconeData,
  filteredData,
  unfilteredData,
  context,
  summary,
  completionData,
  filters,
  ...other
}: MessageCardProps) => (
  <Card sx={{ display: 'flex', padding: 2, width: '100%' }}>
    <Avatar sx={{ bgcolor: role == 'user' ? 'primary.main' : 'secondary.main' }}>
      {role == 'assistant' ? 'AI' : user?.name?.charAt(0)}
    </Avatar>
    <CardContent sx={{ py: 0, px: 2, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {content ? (
        <>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
              paddingBottom: 2,
              code: { color: 'white', backgroundColor: 'black', padding: 2 }
            }}
            variant="subtitle1"
            color="text.secondary"
            component="div">
            {content?.trim()}
          </Typography>
          {prompt ? (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Prompt</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {prompt && !error ? (
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {prompt}
                  </Typography>
                ) : null}
              </AccordionDetails>
            </Accordion>
          ) : null}
          {context ? (
            // Use the @mui accordion component to wrap the context and response
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Context</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="overline">Summary</Typography>
                <Typography
                  sx={{ whiteSpace: 'pre-line' }}
                  variant="body1"
                  color="text.secondary"
                  component="div">
                  {summary}
                </Typography>
                <Typography variant="overline">Context</Typography>
                <Typography
                  sx={{ whiteSpace: 'pre-line' }}
                  variant="body1"
                  color="text.secondary"
                  component="div">
                  {context}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {pineconeData ? (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Pinecone Data</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <JsonViewer
                  rootName="pineconeData"
                  value={{
                    filters,
                    pineconeData
                  }}
                  theme={'dark'}
                  // defaultInspectDepth={0}
                  collapseStringsAfterLength={100}
                />
              </AccordionDetails>
            </Accordion>
          ) : null}
          {completionData ? (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Completion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <JsonViewer
                  rootName=""
                  value={completionData}
                  theme={'dark'}
                  // defaultInspectDepth={0}
                  collapseStringsAfterLength={100}
                />
              </AccordionDetails>
            </Accordion>
          ) : null}

          {Object.keys(other)?.length ? (
            // Use the @mui accordion component to wrap the extra and response
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">extra</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <JsonViewer
                  rootName=""
                  value={other}
                  theme={'dark'}
                  // defaultInspectDepth={0}
                  collapseStringsAfterLength={100}
                />
              </AccordionDetails>
            </Accordion>
          ) : null}
        </>
      ) : null}
      {error ? (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography variant="overline">Error</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <JsonViewer
              rootName="response"
              value={error}
              theme={'dark'}
              collapseStringsAfterLength={100}
            />
          </AccordionDetails>
        </Accordion>
      ) : null}
    </CardContent>
  </Card>
);
