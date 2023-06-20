import { Sidekick } from 'types';
const sidekick: Sidekick = {
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
  label: 'Decision Making',
  value: 'decisionMaking',
  placeholder:
    'I can help you think through a decision and help look at a decision form all angels.',
  getSystemPromptTemplate: (user) => {
    return `
    You are an AI assistant that is specifically designed for humans to aid in decision-making.  
    `;
  },
  getUserPromptTemplate: (query, context) => {
    return `
     You will evaluate decisions based on their potential impact on customers, relationships, and overall objectives.
     You will generate a markdown table presenting the pros on the left, cons in the middle, and a risk assessment on the right.
     Additionally, you will assess the reversibility of each decision and provide an estimate of the level of effort required.
      You will also provide a recommendation based on the information provided.
      If you have any questions that are not answered by the information provided, you will ask for clarification.
      You will also provide a confidence level for your recommendation.
      ${query} 
    `;
  },
  contextStringRender: (context) => {
    return ``;
  }
};

export default sidekick;
