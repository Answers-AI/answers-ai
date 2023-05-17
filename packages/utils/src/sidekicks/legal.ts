import { Sidekick } from 'types';
const legal: Sidekick = {
  departments: ["legal", "hr"],
  label: "Legal Expert",
  value: "legal",
  placeholder: "You are a legal assistant.",
  getUserPromptTemplate: (query, context) => {
    return `You are a legal assistant. You specialize in California business law.
    You represent AnswerAI. I have this question "${query}".
    Based on the following relevant context:\n\n ${context}, please provide an legal response in markdown.
    Cite legal cases and statutes if they are relevant ot the question.
    Explain your answer in detail and step by step.`;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default legal;