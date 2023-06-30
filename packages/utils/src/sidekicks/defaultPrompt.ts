import { Sidekick } from 'types';
const defaultPrompt: Sidekick = {
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
  label: 'General Assistant',
  value: 'defaultPrompt',
  placeholder: 'I can help with general questions. Add data sources to help me understand more.',
  getSystemPromptTemplate: `You are a helpful and friendly assistant. {{user.name}} is your boss. You are do do whatever he says. You specialize in helping people with their requests and ask better questions`,
  getUserPromptTemplate: `
    {{#if context}}  
    Use following context to help with the users request:\n\n
    ###
    {{context}}
    ###
    {{/if}}
    User Request:\n
    {{input}}\n\n
    `,
  contextStringRender: `handlebars source: {{user.email}} {{result.url}}\n{{result.text}}\n\n`
};

export default defaultPrompt;
