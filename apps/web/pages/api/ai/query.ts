import { Configuration, OpenAIApi } from 'openai';

import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';
import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone = new PineconeClient();

type Data = {
  prompt: string;
  response?: any;
  error?: any;
};
const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY // process.env.API_KEY,
  });
  return new OpenAIApi(configuration);
};

// Initialize the OpenAIApi object with the necessary organization and API key
const openai = initializeOpenAI();

const pineconeQuery = async (embeddings: number[]) => {
  console.log('PineconeQuery');
  console.time('PineconeQuery');
  try {
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });

    const result = await pinecone.Index(process.env.PINECONE_INDEX).query({
      vector: embeddings,
      topK: 20,
      includeMetadata: true,
      namespace: 'jira'
    });

    console.timeEnd('PineconeQuery');
    return result.data;
  } catch (error) {
    console.timeEnd('PineconeQuery');
    console.error('PINECONE ERROR');
    throw error;
  }
};

const createContext = (id: string, metadata: Record<string, string>): string => {
  let string = 'ISSUE ID: ' + id + '\n\n';
  for (const key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      string += `${key}: ${metadata[key]}\n\n`;
    }
  }
  return string;
};

// Prompt for the OpenAI API

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  try {
    const args = { ...req.body };
    const prompt: string = args.prompt;

    console.log('args', args);
    const statusCategory: string = args.statusCategory;
    console.log('getting image with prompt', args.prompt);
    try {
      console.log('GETTING PROMPT', prompt);
      // Send a request to the OpenAI API for embeddings based on query
      const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: prompt
      });
      const embeddings = embeddingResponse.data?.data[0]?.embedding;

      const pineconeData = await pineconeQuery(embeddings);

      const context = pineconeData?.matches
        ?.map((item: any) => {
          return createContext(item.id, item.metadata);
        })
        .join('\n\n');
      let completionData;
      try {
        // Chunk the pineconeData into 3000 tokens

        // For each chunk query open AI
        // Take each response and combine them into one context
        // Use the context for the new query
        console.log('openai');
        console.time('OpenAI->createCompletion');
        const { data } = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Answer the following question based on the context provided:\n\nCONTEXT:\n${context}\n\nQuestion:\n${prompt}\n\nAnswer:\n`,
          max_tokens: 700,
          temperature: 0
        });
        completionData = data;

        console.timeEnd('OpenAI->createCompletion');
      } catch (error: any) {
        console.log('OPENAI-ERROR', error?.response?.data);

        res.status(500).json({ prompt: prompt, error: error?.response?.data } as any);
        return;
      }
      const answer = completionData.choices[0].text;

      // Get the recommended changes from the API response

      res.status(200).json({
        prompt,
        answer,
        context,
        pineconeData,
        completionData
      } as any);
    } catch (error: any) {
      console.log('Error', error);
      // Check if the error is a response error
      if (error.response) {
        // Get the error message and status code from the response
        const { message, status, data } = error.response;

        res.status(500).json({ prompt: prompt, error: data } as any);
      } else {
        res.status(500).json({ prompt: prompt, error });
      }
    }
  } catch (error) {
    console.log('ERROR');
    res.status(500).json({ prompt: prompt, response: { error } } as any);
  }
};

export default handler;
