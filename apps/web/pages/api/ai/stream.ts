import { OpenAIStream } from 'utils/dist/OpenAIStream';
// import { generatePrompt } from '../../../src/generatePrompt';

export const config = {
  runtime: 'edge'
};

const handler = async (req: Request): Promise<Response> => {
  const args = (await req.json()) as {
    prompt?: string;
    answers?: string;
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
    console.log('args', args, { prompt });

    const payload = {
      model: 'text-davinci-003',
      prompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1
    };

    // const stream = await OpenAIStream(payload, {
    //   pineconeData,
    //   context
    // });

    const stream = await OpenAIStream(payload, { pineconeData, context });
    return new Response(stream);
  } catch (error) {
    const payload = {
      model: 'text-davinci-003',
      prompt: args?.prompt,
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
  // const { prompt } = await generatePrompt(args);
  // const { prompt } = args;
};

export default handler;
