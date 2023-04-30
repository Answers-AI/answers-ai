import { Sidekick } from 'types';
const debugging: Sidekick = {
  label: "Debugging Expert",
  value: "debugging",
  placeholder: "I can debug code for you",
  getUserPromptTemplate: (query, context) => {
    return `You are a code debugging expert assistant.
      You specialize in debugging typescript and javascript applications with OpenAI.
      I am having this issue:\n\n
      ${query}\n\n
      I believe that the bug is in this context:\n\n{{context}}\n\n
      I want you show me where you think the bug is and how you would fix it.
      If the bug is not in the context, explain why.
      Please provide a detailed explanation of your thought process.
      Please provide a detailed step by step explaination of how you would fix the bug.
      Please provide a detailed explanation of why you think the bug is in the context.
      Ask me questions to clarify what you need if the context is not enough.
      Tell me your confidence in fixing this bug with your suggested solution.
      check your work and make sure it does not break current functionality and follows coding best bractices and standards.
      `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default debugging;