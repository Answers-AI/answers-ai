import { Sidekick } from 'types';

const gptraw: Sidekick = {
  departments: ["general"],
  label: "GPT-RAW",
  value: "gptraw",
  placeholder:
    "I wont use any of my memory and will answer your questions using ",
  getUserPromptTemplate: (query) => {
    return query;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default gptraw;
