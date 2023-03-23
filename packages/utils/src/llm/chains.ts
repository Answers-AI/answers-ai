import { LLMChain } from 'langchain';
import { ChatOpenAI } from 'langchain/chat_models';
import { OpenAI } from 'langchain/llms';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate
} from 'langchain/prompts';
import { Message } from 'types';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';

import { assistantPrompt, chatPrompt, intentionPrompt, rawPrompt } from './chatPrompt';
import { summarizeQAPrompt, summarizePrompt } from './summarizePrompt';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo-0301', temperature: 0.1 });
const openAIModel = new OpenAI({ temperature: 0.1 });
export const createChatChain = ({ messages }: { messages: Message[] }) => {
  // const chatHistoryPrompt = ChatPromptTemplate.fromPromptMessages([
  //   assistantPrompt,
  //   // TODO: Improve intention prompt so it doesn't mess with the user prompt
  //   // intentionPrompt,
  //   ...messages?.map((message) =>
  //     message?.role === 'assistant'
  //       ? SystemMessagePromptTemplate.fromTemplate(message.content)
  //       : HumanMessagePromptTemplate.fromTemplate(message.content)
  //   ),
  //   HumanMessagePromptTemplate.fromTemplate('{input}')
  // ]);
  // return new LLMChain({
  //   prompt: chatHistoryPrompt,
  //   llm: chat
  // });
  const chain = {
    call: async ({
      context,
      userName,
      input,
      history
    }: {
      context: string;
      userName?: string | null;
      input: string;
      history: Message[];
      agent_scratchpad: string;
    }) => {
      const response = await openai.createChatCompletion({
        max_tokens: 1000,
        messages: [
          // {
          //   role: ChatCompletionRequestMessageRoleEnum.System,
          //   content:
          //     'You are an AI with access to the following platforms: Jira, Slack, Github, OpenAPI.'
          // },
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'This will be your context: ' + context
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'My name is ' + userName
          },
          ...history?.map(({ role, content }) => ({ role, content })),
          { role: ChatCompletionRequestMessageRoleEnum.User, content: input }
        ],

        temperature: 0.1,
        model: 'gpt-3.5-turbo'
      });
      const text = response.data.choices[0].message?.content;
      return { text };
    }
  };
  return chain;
};

export const summarizeChain = new LLMChain({
  prompt: summarizePrompt,
  llm: openAIModel
});

export const summarizeQAChain = new LLMChain({
  prompt: summarizeQAPrompt,
  llm: chat
});

export const rawChain = new LLMChain({
  prompt: rawPrompt,
  llm: chat
});
