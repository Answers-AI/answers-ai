import { Sidekick } from 'types';
const sidekick: Sidekick = {
  departments: ['engineering'],
  label: 'QA Assistant',
  value: 'engineeringQA',
  temperature: 0,
  maxCompletionTokens: 3000,
  placeholder: 'I can help you write tests for your code and check for bugs',
  getSystemPromptTemplate: () => {
    return `You are writing API docs for a new feature.`;
  },
  getUserPromptTemplate: (query, context) => {
    return `
    Write a comprehensive Cypress test for the following React component, ensuring that potential bugs are identified and providing suggestions for areas of improvement in the code to enhance overall quality.
    ###
    ${query}
    ###
    The following to context as reference:
    ###
    ${context}
    ###
    Cypress test:\n\n
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.code}\n\n`;
  }
};

export default sidekick;
