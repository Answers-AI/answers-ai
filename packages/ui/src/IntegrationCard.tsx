import React, { Component, ElementType } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
  IconButton,
  CardHeader,
  Avatar,
  Paper
} from '@mui/material';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreVert from '@mui/icons-material/MoreVert';
import MenuButton from './MenuButton';

import { useAnswers } from './AnswersContext';
import { Delete } from '@mui/icons-material';
import { AppService } from 'types';
import { useFlags } from 'flagsmith/react';
import IntegrationSetting from './IntegrationSetting';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface IntegrationCardProps extends AppService {
  onClick?: () => void;
  expanded: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  id,
  name,
  expanded,
  description,
  imageURL,
  onClick,
  enabled
}) => {
  // const [expanded, setExpanded] = React.useState(false);
  const flags = useFlags(['delete_prompt']);
  const { deletePrompt, updatePrompt } = useAnswers();
  const [lastInteraction, setLastInteraction] = React.useState<string>('');
  // const onClick = () => {
  //   setExpanded(!expanded);
  // };
  const handleLike = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setLastInteraction('like');
    if (id)
      await updatePrompt({
        id: id
        // likes: (likes ?? 0) + 1
      });
  };
  const handleDislike = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setLastInteraction('dislike');
    if (id)
      await updatePrompt({
        id
        // dislikes: (dislikes ?? 0) + 1
      });
  };
  const Wrapper: ElementType = expanded ? Box : CardActionArea;
  return (
    <>
      <Card
        component={motion.div}
        layoutId={id}
        sx={{
          flex: 1,
          display: 'flex',
          // transition: '.3s',
          position: 'relative',
          alignItems: 'space-between',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
        <Box
          sx={{
            width: '100%',
            flex: '1',
            display: 'flex'
          }}>
          <Wrapper
            component="div"
            sx={{
              width: '100%',
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              ...(flags?.delete_prompt?.enabled && {
                paddingRight: 4
              })
              // paddingBottom: 4
            }}
            disabled={expanded}
            onClick={onClick}>
            <CardContent
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <Image src={imageURL} alt={`${name} logo`} width={40} height={40} />
                  </Avatar>
                }
                sx={{ 'p': 0, 'width': '100%', '.MuiCardHeader-action': { m: 0 } }}
                action={
                  <Button variant="contained" color="secondary" disabled={enabled}>
                    {enabled ? 'Connected' : 'Connect'}
                  </Button>
                }
              />
              {name ? (
                <Typography
                  variant="body1"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical'
                  }}>
                  <strong>{name}</strong>
                </Typography>
              ) : null}

              <Typography
                variant="body1"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textTransform: 'capitalize',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical'
                }}>
                {description ?? `Complete the integration with ${name}`}
              </Typography>
              {expanded ? (
                <Box
                  component={motion.div}
                  sx={{
                    // transition: '.25s',
                    overflow: 'hidden',
                    transitionDelay: '1s',

                    ...(expanded ? { maxHeight: 400 } : { maxHeight: 0 })
                  }}>
                  <Typography variant="overline">Settings</Typography>
                  <IntegrationSetting app={name} />
                </Box>
              ) : null}
            </CardContent>
          </Wrapper>
        </Box>

        {/* <CardActions
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          position: 'absolute',
          left: 0,
          bottom: 0
        }}>
        <Box>
          <IconButton
            color={lastInteraction === 'like' ? 'secondary' : 'default'}
            sx={{}}
            size="small"
            onClick={handleLike}>
            <ThumbUpIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            color={lastInteraction === 'dislike' ? 'secondary' : 'default'}
            onClick={handleDislike}>
            <ThumbDownIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </CardActions> */}
      </Card>
    </>
  );
};

export default IntegrationCard;
