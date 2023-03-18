import { LLMChain } from 'langchain';
import { ChatOpenAI } from 'langchain/chat_models';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate
} from 'langchain/prompts';
import { Message } from 'types';

import { chatPrompt } from './chatPrompt';

const chat = new ChatOpenAI({});

export const createChatChain = ({ messages }: { messages: Message[] }) => {
  const chatHistoryPrompt = ChatPromptTemplate.fromPromptMessages([
    new SystemMessagePromptTemplate(chatPrompt),
    ...messages?.map((message) =>
      message?.role === 'assistant'
        ? SystemMessagePromptTemplate.fromTemplate(message.content)
        : HumanMessagePromptTemplate.fromTemplate(message.content)
    )
  ]);
  return new LLMChain({
    prompt: chatHistoryPrompt,
    llm: chat
  });
};
