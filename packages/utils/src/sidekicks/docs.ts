import { Sidekick } from 'types';
const docs: Sidekick = {
  label: "Docs Creation Expert",
  value: "docs",
  placeholder: "I can create documentation for you",
  getUserPromptTemplate: (query, context) => {
    return `You are a code documentation assistant.
      You specialize in building NextJS applications with OpenAI.
      ${query}\n\n
      the context for the documentation are these typescript files:\n\n{{context}}\n\n
      please provide an appropriate response in markdown.
      think step by step. Ask me questions to clarify what you need. Let me know how confident you are in your answer.`;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default docs;