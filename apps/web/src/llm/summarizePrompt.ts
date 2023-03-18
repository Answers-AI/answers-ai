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

STORY DETAILS:`)
]);
