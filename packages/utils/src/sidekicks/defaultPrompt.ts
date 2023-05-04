import { Sidekick } from 'types';
const defaultPrompt: Sidekick = {
  label: 'Default Assistant',
  value: 'defaultPrompt',
  placeholder: 'I can help with general questions',
  getSystemPromptTemplate: () => {
    return `You are a helpful and friendly assistant.You specialize in helping people ask better questions`;
  },
  getUserPromptTemplate: (query, context) => {
    return `
    Use following context to help with the users request:\n\n
    ###
    ${context}
    ###
    User Request:\n\n"${query}".\n\n
    `;
  },
  contextStringRender: (context) => {
    return `source: ${context?.filePath || context?.url}\n${context.text}\n\n`;
  }
};

export default defaultPrompt;
