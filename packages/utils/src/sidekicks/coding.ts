import { Sidekick } from 'types';

const coding: Sidekick = {
  label: "Coding Expert",
  value: "coding",
  placeholder: "I can create code for you",
  getUserPromptTemplate: (query, context) => {
    return `You are a code assistant.
      You specialize in building typescript and javascript applications with OpenAI.
      ${query}\n\n
      Use these files as context:\n\n{{context}}\n\n
      I want you to replace the comments with the code to complete the function.
      check your work and make sure it does not break current functionality and follows coding best bractices and standards.
      respond with the full code. If multiple files will be created, create one file at a time and ask me if I want to continue before creating the next file.`;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default coding;