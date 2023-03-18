import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate
} from 'langchain/prompts';

export const summarizePrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    'You are a text summarizer. You wont miss any important details to understand the context of the story.'
  ),

  HumanMessagePromptTemplate.fromTemplate(`
Write a summary of what we learn about the story from the following chat log.

{input}

STORY DETAILS:

This was your previous work (but I haven't seen any of it! I only see what you return as final answer):
{agent_scratchpad}`)
]);
