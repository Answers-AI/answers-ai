'use client';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { AxiosError } from 'axios';
import { useFlags } from 'flagsmith/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { JsonViewer } from '@textea/json-viewer';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ContentCopy from '@mui/icons-material/ContentCopy';

import { countTokens } from '@utils/utilities/countTokens';

import { useAnswers } from '../AnswersContext';
import { Accordion, AccordionSummary, AccordionDetails } from '../Accordion';
import FeedbackModal from '@ui/FeedbackModal';
import { AppService, Document, Message } from 'types';

interface MessageExtra {
  prompt?: string;
  extra?: object;
  pineconeData?: object;
  filteredData?: object;
  unfilteredData?: object;
  context?: string;
  summary?: string;
  completionData?: object;
  completionRequest?: object;
  filters?: object;
  isWidget?: boolean;
  contextDocuments?: Document[];
}
interface MessageCardProps extends Partial<Message>, MessageExtra {
  error?: AxiosError<MessageExtra>;

  role: string;
}

export const MessageCard = ({
  id,
  feedback,
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
  completionRequest,
  filters,
  likes,
  dislikes,
  isWidget,
  contextDocuments,
  ...other
}: MessageCardProps) => {
  const { developer_mode } = useFlags(['developer_mode']); // only causes re-render if specified flag values / traits change
  const { user: currentUser, sendMessageFeedback, appSettings } = useAnswers();
  const [showFeedback, setShowFeedback] = useState(false);
  const services: { [key: string]: AppService } =
    appSettings?.services?.reduce((acc, service) => ({ ...acc, [service.id]: service }), {}) ?? {};
  const [lastInteraction, setLastInteraction] = React.useState<string>('');
  const hasContent = role === 'assistant' ? content && Object.keys(other)?.length : content;
  if (error) {
    pineconeData = error?.response?.data.pineconeData;
    summary = error?.response?.data.summary;
    context = error?.response?.data.context;
    filters = error?.response?.data.filters;
    prompt = error?.response?.data.prompt;
  }

  const handleLike = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setLastInteraction('thumbsUp');
    if (id) {
      try {
        const feedback = await sendMessageFeedback({
          messageId: id,
          rating: 'thumbsUp'
        });
        setShowFeedback(true);
      } catch (err) {
        setLastInteraction('');
      }
      // Show modal to ask for added feedback
    }
  };

  const handleCopyCodeClick = (codeString: string) => {
    navigator.clipboard.writeText(codeString);
  };

  const handleDislike = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setLastInteraction('thumbsDown');
    if (id) {
      try {
        const feedback = await sendMessageFeedback({
          messageId: id,
          rating: 'thumbsDown'
        });
        setShowFeedback(true);
        // Show modal to ask for added feedback } catch (err) {
      } catch (err) {
        setLastInteraction('');
      }
    }
  };

  return (
    <>
      {showFeedback && id ? (
        <FeedbackModal
          messageId={id}
          rating={lastInteraction as 'thumbsDown' | 'thumbsUp'}
          onClose={() => setShowFeedback(false)}
        />
      ) : null}
      <Card
        data-cy="message"
        data-role={role}
        sx={{
          borderRadius: 0,
          position: 'relative'
        }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            gap: 1,
            // px: isWidget ? 1 : 1,
            // py: isWidget ? 1 : 1,
            width: '100%',
            flexDirection: isWidget ? 'column' : 'row'
          }}>
          <CardContent
            sx={{
              position: 'relative',
              gap: 2,
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
              // p: 0
            }}>
            <Box sx={{ gap: 2, display: 'flex' }}>
              <Avatar
                src={
                  role == 'user'
                    ? user?.image || currentUser?.image!
                    : '/static/images/logos/answerai-logo.png'
                }
                sx={{
                  bgcolor: role == 'user' ? 'secondary.main' : 'primary.main',
                  height: isWidget ? '24px' : '32px',
                  width: isWidget ? '24px' : '32px',
                  ...(role !== 'user' && {
                    padding: 1,
                    background: 'white'
                  })
                }}
                title={role == 'assistant' ? 'AI' : user?.name?.charAt(0)}
              />
              {hasContent && content ? (
                <>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="div"
                    sx={{
                      'overflow': 'hidden',
                      'img': {
                        maxWidth: '100%',
                        margin: 'auto',
                        mt: 2
                      },
                      'p,pre,h1,h2,h3,h4,h5,h6,ul,ol': {
                        ':not(:first-of-type)': {
                          mt: 2
                        }
                      },
                      'ul,ol': {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                      }
                    }}>
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const codeExample = String(children).replace(/\n$/, '');
                          return !inline ? (
                            <Box sx={{ position: 'relative' }}>
                              <SyntaxHighlighter style={duotoneDark as any} PreTag="div" {...props}>
                                {codeExample}
                              </SyntaxHighlighter>
                              <IconButton
                                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                onClick={() => handleCopyCodeClick(codeExample)}>
                                <ContentCopy />
                              </IconButton>
                            </Box>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}>
                      {content}
                    </ReactMarkdown>
                  </Typography>
                </>
              ) : null}
            </Box>

            {contextDocuments?.length ? (
              <>
                <Divider />
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                  <Typography variant="body2">References:</Typography>
                  {contextDocuments?.map((doc) => (
                    <Button
                      key={`references-${doc.id}`}
                      size="small"
                      component={NextLink}
                      variant="outlined"
                      color="inherit"
                      href={doc.url}
                      target="_blank"
                      sx={{
                        'textTransform': 'none',
                        'borderRadius': 20,
                        '&:hover': { textDecoration: 'none' }
                      }}
                      startIcon={
                        <Avatar
                          variant="source"
                          src={services[doc.source]?.imageURL}
                          sx={{ width: 20, height: 20 }}
                        />
                      }>
                      {doc.title ?? doc.url}
                    </Button>
                  ))}
                </Box>
              </>
            ) : null}
          </CardContent>

          {role === 'assistant' ? (
            <CardActions
              sx={{
                zIndex: 1000,
                position: 'absolute',
                bottom: isWidget ? 'auto' : 0,
                top: isWidget ? 0 : '100%',
                right: 8
              }}>
              {lastInteraction ? (
                <IconButton disabled size="small">
                  {lastInteraction == 'thumbsUp' ? (
                    <ThumbUpIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <ThumbDownIcon sx={{ fontSize: 16 }} />
                  )}
                </IconButton>
              ) : (
                <>
                  <IconButton
                    color={lastInteraction === 'like' ? 'secondary' : 'default'}
                    size="small"
                    data-cy="like-button"
                    onClick={handleLike}>
                    <ThumbUpIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color={lastInteraction === 'dislike' ? 'secondary' : 'default'}
                    onClick={handleDislike}>
                    <ThumbDownIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </>
              )}
            </CardActions>
          ) : null}
        </Box>

        {context ? (
          // Use the @mui accordion component to wrap the context and response
          <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography variant="overline">Context ({countTokens(context)} Tokens)</Typography>
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

        {developer_mode?.enabled ? (
          <Box>
            {error ? (
              <>
                <Accordion TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography variant="overline">Error</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <JsonViewer
                      rootName="error"
                      value={error}
                      theme={'dark'}
                      collapseStringsAfterLength={100}
                    />
                  </AccordionDetails>
                </Accordion>
              </>
            ) : null}

            {summary ? (
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography variant="overline">Summary ({summary?.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{ whiteSpace: 'pre-line' }}
                    variant="body1"
                    color="text.secondary"
                    component="div">
                    {summary}
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

            {completionRequest ? (
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography variant="overline">Completion request</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <JsonViewer
                    rootName=""
                    value={completionRequest}
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
                  <Typography variant="overline">Extra</Typography>
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
    </>
  );
};
