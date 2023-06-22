import { Sidekick } from 'types';

const gptraw: Sidekick = {
  departments: [
    'marketing',
    'sales',
    'customer support',
    'engineering',
    'product management',
    'legal',
    'hr',
    'education',
    'real estate',
    'administrative',
    'leadership'
  ],
  label: 'ChatGPT',
  value: 'gptraw',
  placeholder: 'I wont use any of my memory and will answer your questions using ',
  getUserPromptTemplate: (query) => {
    return query;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath ?? context.url}\n${context.text}\n\n`;
  }
};

export default gptraw;
