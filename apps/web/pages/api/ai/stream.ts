import { OpenAIStream } from 'utils/dist/OpenAIStream';
import cors from '../../../src/corsEdge';

export const config = {
  runtime: 'edge'
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return cors(
      req,
      new Response(JSON.stringify({ message: 'Hello World!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );
  }
  const args = (await req.json()) as {
    prompt?: string;
    answers?: string;
    filters?: any;
  };

  try {
    const { prompt, pineconeData, context } = await fetch(
      `${
        process.env.VERCEL_URL?.includes('localhost')
          ? `http://${process.env.VERCEL_URL}`
          : `https://${process.env.VERCEL_URL}`
      }/api/ai/prompt`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      }
    ).then((res) => res.json());

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1
    };

    const stream = await OpenAIStream(payload, { pineconeData, context });
    return cors(req, new Response(stream));
  } catch (error) {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: args.prompt }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1
    };
    const stream = await OpenAIStream(payload);
    return new Response(stream);
  }
};

export default handler;
