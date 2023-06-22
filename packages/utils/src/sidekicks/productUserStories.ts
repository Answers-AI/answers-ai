import { Sidekick } from 'types';
const sales: Sidekick = {
  departments: ['engineering', 'product management'],
  label: 'User Acceptance Criteria and User Stories',
  value: 'productUserStories',
  temperature: 1,
  frequency: 0,
  presence: 0,
  maxCompletionTokens: 1000,
  placeholder: 'I will write user stories and acceptance criteria for you',
  getSystemPromptTemplate: () => {
    return `You are a web solutions architect that builds software. You specialize in marketing websites, knowledge bases, learning management systems, and SaaS technology. You help assist in creating and reviewing user stories and acceptance criteria for the development team. `;
  },
  getUserPromptTemplate: (query, context) => {
    return `
    These are users requirements. 
    ${query}
    I want you to create or edit user stories and acceptance criteria for the development team.
    Create a summary for the end user of the feature and how they will test it
    Create a summary of the project to the engineer
    Create a detailed list of user stories
    Create a detailed list of user acceptance criteria
    Create a detailed list of automated tests
    Estimate the amount of time it will take an engineer to complete the task on a scale of 0-3 (0 is a half a day, 1 is a full day, 2 is a half a week, and 4 is a full week) 
    Tasks that are expected to take longer than a week suggest a way to break the project into a more manageable sizes. 
    \n\n
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  }
};

export default sales;
