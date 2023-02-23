import { Configuration, OpenAIApi } from 'openai';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};
export const openai = initializeOpenAI();
import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from 'pineconeQuery';
export const pinecone = new PineconeClient();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generatePrompt = async ({ prompt, answers = [] }: any, user?: any) => {
  // Send a request to the OpenAI API for embeddings based on query

  // const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   throw new Error('Not Authenticated');
  // }

  let savedPrompt = await prisma.prompt.findFirst({
    where: { prompt }
  });
  if (!savedPrompt) {
    savedPrompt = await prisma.prompt.create({
      data: { user: { connect: { email: user?.email } }, prompt, likes: 0, usages: 0 }
    });
  }

  console.log('Saved Prompt', savedPrompt);
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: prompt
  });
  const embeddings = embeddingResponse.data?.data[0]?.embedding;

  let pineconeData;
  try {
    pineconeData = await pineconeQuery(embeddings);
    // const pineconeData = { matches: [] };
  } catch (error: any) {
    console.log('Pinecone Error', error);
  }

  const context = [
    ...answers
      ?.filter((item: any) => !!item?.answer || !!item?.context)
      ?.map((item: any) => `${item?.answer}, ${item?.context}`),
    ...(!pineconeData?.matches
      ? []
      : pineconeData?.matches?.map((item: any) => item?.metadata?.text))
  ].join('\n');

  console.time('OpenAI->createCompletion');
  await prisma.prompt.update({
    where: { id: savedPrompt.id },
    data: { usages: savedPrompt.usages + 1 }
  });
  return {
    savedPrompt,
    prompt: `Answer the following question based on the context provided.
                \n\nCONTEXT:\n${context}\n\n
                Question:\n${prompt}\n\nAnswer:\n`,
    pineconeData,
    context
  };
};
