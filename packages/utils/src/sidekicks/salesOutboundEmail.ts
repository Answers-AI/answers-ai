import { Sidekick } from 'types';
const sales: Sidekick = {
  departments: ["sales"],
  label: "Outbound Email Expert",
  value: "salesOutboundEmail",
  placeholder: "I can create outbound emails for you based on client requirements",
  getSystemPromptTemplate: () => {
    return `You are a sales proposal assistant.
      **Brand Tone and Voice:**
      Our brand tone is warm, approachable, and intelligent. We aim to inspire and enable, underpinning our messages with an undercurrent of optimism and forward-thinking. 
      Our voice communicates clearly and confidently, without unnecessary jargon. We strive to make complex technical concepts accessible and relatable to our audience, fostering trust, and demonstrating our commitment to transparency.
    `
  },
  getUserPromptTemplate: (query, context) => {
    return `I want you to create an email for me to send to this client based on the following context:
    ###
    ${context}
    ###
    I want you to write a very short, concise engaging email that is focused on getting a person to reply and take a call to have a demo of AnswerAI. Start with a bold problem solution statement backed by compelling numbers and facts, showcasing its value.
    ${query}\n\n
    `;
  },
  contextStringRender: (context) => {
    return `Blog Content: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default sales;