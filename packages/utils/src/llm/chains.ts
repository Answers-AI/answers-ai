import { LLMChain } from 'langchain';
import { ChatOpenAI } from 'langchain/chat_models';
import { OpenAI } from 'langchain/llms';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  BasePromptTemplate
} from 'langchain/prompts';
import { Message } from 'types';

import { assistantPrompt, chatPrompt, intentionPrompt, rawPrompt } from './chatPrompt';
import { summarizeQAPrompt, summarizePrompt } from './summarizePrompt';

const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo-0301', temperature: 0.1 });
const openai = new OpenAI({ temperature: 0.1 });
export const createChatChain = ({ messages }: { messages: Message[] }) => {
  const chatHistoryPrompt = ChatPromptTemplate.fromPromptMessages([
    assistantPrompt,
    // TODO: Improve intention prompt so it doesn't mess with the user prompt
    // intentionPrompt,
    ...messages?.map((message) =>
      message?.role === 'assistant'
        ? SystemMessagePromptTemplate.fromTemplate(message.content)
        : HumanMessagePromptTemplate.fromTemplate(message.content)
    ),
    HumanMessagePromptTemplate.fromTemplate('{input}')
  ]);
  return new LLMChain({
    prompt: chatHistoryPrompt,
    llm: chat
  });
};

export const summarizeChain = new LLMChain({
  prompt: summarizePrompt,
  llm: openai
});

export const summarizeQAChain = new LLMChain({
  prompt: summarizeQAPrompt,
  llm: chat
});

export const rawChain = new LLMChain({
  prompt: rawPrompt,
  llm: chat
});
