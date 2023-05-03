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
    """
    ${context}
    """
    User Request:\n\n"${query}".\n\n
    If the context is empty, tell the user they can add datasources from the Web, Jira, Docubot, Airtable, or Confleunce.
    Proceed to help the user find the answer to their question  
    Give me your confidence level in your answer. 0-100
    Where there may be incomplete context, explain how that impacts your answer.
    Explain to me where you are not confident.
    Suggest information or data sources the user can ask to make you more confident in your reponse.
    `;
  },
  contextStringRender: (context) => {
    return `source: ${context?.filePath || context?.url}\n${context.text}\n\n`;
  }
};

export default defaultPrompt;
