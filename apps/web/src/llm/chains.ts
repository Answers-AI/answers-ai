import { LLMChain } from 'langchain';
import { ChatOpenAI } from 'langchain/chat_models';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  BasePromptTemplate
} from 'langchain/prompts';
import { Message } from 'types';

import { assistantPrompt, chatPrompt, intentionPrompt, rawPrompt } from './chatPrompt';
import { summarizePrompt } from './summarizePrompt';

const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo-0301', temperature: 0 });

export const createChatChain = ({ messages }: { messages: Message[] }) => {
  const chatHistoryPrompt = ChatPromptTemplate.fromPromptMessages([
    assistantPrompt,
    intentionPrompt,
    ...messages?.map(
      (message) =>
        message?.role === 'assistant'
          ? SystemMessagePromptTemplate.fromTemplate(message.content)
          : HumanMessagePromptTemplate.fromTemplate(message.content),
      HumanMessagePromptTemplate.fromTemplate('{input}')
    )
  ]);
  return new LLMChain({
    prompt: chatHistoryPrompt,
    llm: chat
  });
};

export const summarizeChain = new LLMChain({
  prompt: summarizePrompt,
  llm: chat
});

export const rawChain = new LLMChain({
  prompt: rawPrompt,
  llm: chat
});
