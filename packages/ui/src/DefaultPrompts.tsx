'use client';
import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandLess';
import { Prompt } from 'types';
import PromptCard from './PromptCard';
import { useAnswers } from './AnswersContext';

interface DefaultPromptsProps {
  expanded?: boolean;
  handleChange: (evt: any, expanded: boolean) => void;
  onPromptSelected: (prompt: string) => void;
}
export const DefaultPrompts = ({
  expanded,
  handleChange,
  onPromptSelected
}: DefaultPromptsProps) => {
  const { prompts, setInputValue } = useAnswers();
  const handlePromptClick = (prompt: string) => {
    onPromptSelected(prompt);
  };

  return prompts?.length ? (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        '&, .MuiAccordion-root ': {
          'width': '100%',
          'overflow': 'hidden',
          'm': 0,
          'background': 'none',
          'boxShadow': 'none',
          '&.Mui-expanded': {
            margin: 0
          },
          '.MuiAccordionSummary-root': {
            'px': 0,
            'minHeight': 0,
            '&.Mui-expanded': { minHeight: 0 },
            'justifyContent': 'flex-start',
            'gap': 2
          },
          '.MuiAccordionSummary-content': {
            'm': 0,
            'flexGrow': 'initial',
            '&.Mui-expanded': { m: 0 }
          },
          '.MuiAccordionDetails-root': { p: 0, maxHeight: '30vh', overflow: 'auto' }
        }
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="filters-content"
        id="filters-header">
        <Typography variant="overline">Recommended prompts</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{}}>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { md: 'repeat(auto-fit, minmax(320px, 1fr))', sm: '1fr' }
            }}>
            {prompts?.map((prompt) => (
              <PromptCard
                key={prompt.id}
                {...prompt}
                onClick={() => handlePromptClick(prompt?.content)}
              />
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  ) : null;
};
