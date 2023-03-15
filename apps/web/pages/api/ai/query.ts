import { generatePrompt } from '../../../src/generatePrompt';
import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

type Data = {
  prompt: string;
  response?: any;
  error?: any;
};

import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from 'db/dist';
import { inngest } from '../../../src/ingestClient';
import { Message } from 'types';
import { OpenAIChat } from 'langchain/llms';
import { ChatVectorDBQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { pinecone } from 'pineconeQuery';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const session = await getServerSession(req, res, authOptions);
  // TODO: Extract into createCompletion

  if (!session?.user?.email) {
    res.status(401);
    return;
  }

  let completionData;
  let completionMessages: ChatCompletionRequestMessage[];
  // GEt last item from messages
  const messages: { role: ChatCompletionRequestMessageRoleEnum; content: string }[] =
    req.body.messages;

  let chatId = req.body.chatId;

  // TODO: Validate the user is in the chat or is allowed to send messages
  let chat;
  if (!chatId) {
    chat = await prisma.chat.create({
      data: {
        users: {
          connect: {
            email: session.user.email
          }
        },
        filters: req.body.filters || {}
        // prompt: {
        //   connect: {
        //     content: req.body.prompt
        //   }
        // }
      }
    });
  } else {
    chat = await prisma.chat.findUnique({
      where: { id: chatId }
    });
  }

  if (!chat) throw new Error('Chat not found');

  const prompt = req.body.prompt;
  const filters = req.body.filters || {};

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'answers/message.sent',
    user: session.user,
    data: { role: 'user', chat, content: prompt, filters, messages }
  });

  // const {
  //   prompt: finalPrompt,
  //   pineconeData,
  //   context,
  //   summary
  // } = await generatePrompt({ chat, prompt, messages, filters }, session?.user);

  try {
    try {
      console.time('OpenAI->createCompletion');
      completionMessages = [
        ...messages?.map(({ role, content }) => ({ role, content })),
        { role: 'user', content: prompt }
      ];
      // console.log('OpenAI->createCompletion', { completionMessages });
      // TODO: Move this to app settings or feature flag
      // const { data } = await openai.createChatCompletion({
      //   model: 'gpt-3.5-turbo',
      //   messages: completionMessages,
      //   max_tokens: 700,
      //   temperature: 0,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0
      // });

      /* Initialize the LLM to use to answer the question */
      const model = new OpenAIChat({
        modelName: 'gpt-3.5-turbo',
        prefixMessages: completionMessages || [
          { role: 'user', content: 'My name is ' + session.user.name },
          { role: 'assistant', content: 'Hi there' }
        ]
      });

      await pinecone.init({
        environment: process.env.PINECONE_ENVIRONMENT,
        apiKey: process.env.PINECONE_API_KEY
      });
      const index = pinecone.Index(process.env.PINECONE_INDEX);
      const vectorStore = await PineconeStore.fromExistingIndex(
        index,
        new OpenAIEmbeddings(),
        'text',
        process.env.PINECONE_INDEX_NAMESPACE
      );
      const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore, {
        returnSourceDocuments: true
      });

      /* Create the chain */
      /* Ask it a question */
      const res = await chain.call({
        question: prompt,
        chat_history: ''
        // chat_history: completionMessages?.map(({ content }) => content).join(' ')
      });
      completionData = res;

      console.timeEnd('OpenAI->createCompletion');
    } catch (error: any) {
      console.log('OPENAI-ERROR', error);

      res.status(500).json({
        prompt: prompt,
        error: error?.response?.data,
        // context,
        // pineconeData,
        filters
      } as any);
      return;
    }
    // Get the recommended changes from the API response\
    const answer = { content: completionData.text };

    if (prompt && answer) {
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'answers/prompt.answered',
        user: session.user,
        data: { chat, messages, prompt, answer }
      });
    }
    res.status(200).json({
      chat,
      prompt,
      role: 'assistant',
      content: answer?.content,
      // context,
      // summary,
      // pineconeData,
      completionData,
      filters
    } as any);
  } catch (error: any) {
    console.log('Error', error);
    // Check if the error is a response error
    if (error.response) {
      // Get the error message and status code from the response
      const { message, status, data } = error.response;

      res.status(500).json({ prompt, error: data } as any);
    } else {
      res.status(500).json({ prompt, error });
    }
  }
};

export default handler;
