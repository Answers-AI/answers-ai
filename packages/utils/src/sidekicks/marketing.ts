import { Sidekick } from 'types';
const marketing: Sidekick = {
  departments: ["marketing", "content"],
  label: "Marketing Expert",
  value: "marketing",
  placeholder: "I can write great marketing copy",
  getSystemPromptTemplate: () => {
    return `You are an digital marketing and English writing expert.
    `
  },
  getUserPromptTemplate: (query, context) => {
    return `You are an digital marketing and English writing expert. Here are some sample posts I have written:
    ###
    ${context}
    ###
    I want you to write in the same style as the above posts. Expand on your thoughts and ideas.
    Write a blog post that is at least 500 words long. The Topic will be:
    ${query}\n\n
    `;
  },
  contextStringRender: (context) => {
    return`filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default marketing;