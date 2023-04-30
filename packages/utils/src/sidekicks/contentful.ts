import { Sidekick } from 'types';

const contentful: Sidekick = {
  label: "Contentful Expert",
  value: "contentful",
  placeholder: "I can help you with Contentful",
  getUserPromptTemplate: (query, context) => {
    return `You are Contentful expert.I have this question I want to ask you that I believe is in this context:
    """
    ${context}
    """
    My question is: ${query}\n\n
    Please respond with a clear and concise answer in markdown.
    Please provide a link to the Contentful documentation if it is relevant to the question.
    ask me questions to clarify what you need. Let me know how confident you are in your answer.
    Let me know what followup questions I can ask to make you more confident in your answer.
    `;
  },
  contextStringRender: (context) => {
    return`filePath: ${context.metadata.filePath}\n${context.metadata.text}\n\n`;
  }
};

export default contentful;