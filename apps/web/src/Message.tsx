'use client';
import React from 'react';
import { Avatar, Card, CardContent, styled } from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
// import { deepOrange, deepPurple } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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
export const Message = ({
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
  completionData,
  filters,
  ...other
}: any) => (
  <Card sx={{ display: 'flex', padding: 2 }}>
    <Avatar sx={{ bgcolor: role == 'user' ? 'primary.main' : 'secondary.main' }}>
      {role == 'assistant' ? 'AI' : user?.name?.charAt(0)}
    </Avatar>
    <CardContent sx={{ py: 0, px: 2, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {error ? (
        <>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ooops! Could not complete your request! Try again with a different prompt.
          </Typography>
          <JsonViewer
            rootName="response"
            value={error}
            theme={'dark'}
            collapseStringsAfterLength={100}
          />
        </>
      ) : null}
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
            {content}
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
          {filteredData || unfilteredData ? (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Final prompt</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <JsonViewer
                  rootName="pineconeData"
                  value={{
                    filters,
                    filteredData: filteredData,
                    unfilteredData: unfilteredData
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
    </CardContent>
  </Card>
);
