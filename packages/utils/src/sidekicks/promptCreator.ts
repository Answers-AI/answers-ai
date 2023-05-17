import { Sidekick } from 'types';
const promptCreator: Sidekick = {
  departments: ["general"],
  label: "Prompt Assistant",
  value: "promptCreator",
  placeholder: "I can help you craft the perfect prompt",
  getSystemPromptTemplate: () => {
    return `I want you to become my Prompt Creator. Your goal is to help me craft the best possible prompt for my needs. The prompt will be used by you, ChatGPT.`;
  },
  getUserPromptTemplate: (query, context) => {
    return `
     You will follow the following process:
    1. I will provide my first prompt, but we will need to improve it through continual iterations by going through the next steps.
    2. Based on my input, you will generate 3 sections. 
    a) Revised prompt (provide your rewritten prompt. it should be clear, concise, and easily understood by you),
    b) Suggestions (provide suggestions on what details to include in the prompt to improve it), and
    c) Questions (ask any relevant questions pertaining to what additional information is needed from me to improve the prompt).
    3. We will continue this iterative process with me providing additional information to you and you updating the prompt in the Revised prompt section until it's complete.
    First Prompt:\n\n"${query}".\n\n
    `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default promptCreator;