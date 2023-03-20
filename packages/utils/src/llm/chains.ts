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
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content:
              'You are an AI with access to the following platforms: Jira, Slack, Github, OpenAPI.'
          },
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const timeout = (ms: number) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
export const summarizeAI = async ({
  input,
  prompt,
  chunkSize = 1000
}: {
  input: string;
  prompt?: string;
  chunkSize?: number;
}): Promise<string> => {
  console.log('[summarizeAI]', { prompt, chunkSize });
  if (!input) return input;
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize });
  const inputDocs = await textSplitter.createDocuments([input]);

  if (inputDocs.length > 1) {
    const summariesPromises = inputDocs?.map(async (doc, idx) => {
      let summary = doc.pageContent ?? '';
      console.log('[summarizeAI] Chunk', { idx });
      await sleep(100 * idx);
      const res = await openai.createCompletion({
        max_tokens: 2000,
        prompt: `${prompt} <INPUT>${doc.pageContent}<INPUT> Summary:`,
        temperature: 0.1,
        model: 'text-davinci-003'
      });
      if (!res?.data?.choices?.[0]?.text) {
        summary = res?.data?.choices?.[0]?.text!;
      }
      // return summarizeChain.call({
      //   input: doc.pageContent,
      //   prompt: prompt
      // }).then((s) => s.text);
      return summary;
    });
    const summaries = (await Promise.race([
      Promise.all(summariesPromises)
      // timeout(15000)
    ])) as string[];
    return summarizeAI({
      input: summaries?.join('\n'),
      prompt,
      chunkSize
    });
  }
  console.log('[summarizeAI] Final');
  return input;
};
