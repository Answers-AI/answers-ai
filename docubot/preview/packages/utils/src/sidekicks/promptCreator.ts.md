Document how the code in the following file is working
"""
import { Sidekick } from 'types';
const promptCreator: Sidekick = {
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
"""
Provide a detailed breakdown of how it interacts with the larger application. 
If this script interacts with a third party, briefly describe what the third party is. 
List out any questions developers may have while working on this codebase that relate to this file.
List out any known issues or bugs with the component and any todo items that need to be addressed.
Template:
Summary:
<brief overview of the file and all its major components>

Import statements:
<describe the imports and dependencies>

Script Summary:
<Summary of file>

Internal Functions:
<list of functions with descriptions, parameters and what is retunred>

External Functions:
<list of functions with descriptions, parameters and what is retunred>

Interaction Summary:
<a summary of how the file could interact with the rest of the application>

Developer Questions:
<a list of questions Developers working with this component may have the following questions when debugging>

Known Issues and TODOs:
<a list of known issues and TODOs for this file>
