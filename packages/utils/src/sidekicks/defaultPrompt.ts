import { Sidekick } from "types";
const defaultPrompt: Sidekick = {
  label: "Default Assistant",
  value: "defaultPrompt",
  placeholder: "I can help with general questions",
  getSystemPromptTemplate: () => {
    return `You are a helpful and friendly assistant.You specialize in helping people find answers to questions.`;
  },
  getUserPromptTemplate: (query, context) => {
    return `
    I want you to use only the following context to help with the users command:\n\n
    """
    ${context}
    """
    User Command:\n\n"${query}".\n\n
    If you are not sure of your answer please let the user know.
    Start every response with a summary of your answer before you go into detail.
    Show me where you found the answer.
    Explain to me where you are not confident.
    Suggest followup questions the user can ask to make you more confident in your reponse.
    please provide an appropriate response in markdown.
    `;
  },
  contextStringRender: (context) => {
    return`source: ${context?.filePath || context?.url}\n${context.text}\n\n`;
  },
};

export default defaultPrompt;