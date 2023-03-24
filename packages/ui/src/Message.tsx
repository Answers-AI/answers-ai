'use client';
import React from 'react';
import { Avatar, Box, Card, CardActions, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { JsonViewer } from '@textea/json-viewer';
// import { deepOrange, deepPurple } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Message, User } from 'types';
import { useFlags } from 'flagsmith/react';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  'border': `none`,
  // 'border': `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '.MuiAccordionDetails-root': {
    padding: theme.spacing(2),
    background: 'rgba(24,24,24)'
  }
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  'backgroundColor': 'transparent',
  'padding': theme.spacing(0, 2),
  // 'backgroundColor':
  //   theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',

  'flexDirection': 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0)
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
}: MessageCardProps) => {
  const { developer_mode } = useFlags(['developer_mode']); // only causes re-render if specified flag values / traits change

  const handleLike = () => {};
  return (
    <Card
      sx={{
        borderRadius: 0,
        position: 'relative'
      }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          padding: 2,
          width: '100%'
        }}>
        <Avatar sx={{ bgcolor: role == 'user' ? 'secondary.main' : 'primary.main' }}>
          {role == 'assistant' ? 'AI' : user?.name?.charAt(0)}
        </Avatar>
        <CardContent
          sx={{
            position: 'relative',
            py: 0,
            px: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
          {content ? (
            <>
              <Typography
                sx={{
                  whiteSpace: 'pre-line',
                  code: { color: 'white', backgroundColor: 'black', padding: 2 }
                }}
                variant="subtitle1"
                color="text.secondary"
                component="div">
                {content?.trim()}
              </Typography>
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

        <CardActions
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0
          }}>
          <IconButton color="secondary" sx={{}} size="small" onClick={handleLike}>
            <ThumbUpIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton size="small" color="secondary" onClick={handleLike}>
            <ThumbDownIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </CardActions>
      </Box>
      {developer_mode?.enabled ? (
        <Box>
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
        </Box>
      ) : null}
    </Card>
  );
};
