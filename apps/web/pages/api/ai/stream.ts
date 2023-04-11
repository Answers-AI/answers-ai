import { OpenAIStream } from '@utils/OpenAIStream';
import cors from '@ui/corsEdge';
import { AnswersFilters, Message } from 'types';
import { getCompletionRequest } from '@utils/llm/getCompletionRequest';

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
  const { filters, messages, prompt } = (await req.json()) as {
    prompt: string;
    messages: Message[];
    filters: AnswersFilters;
  };
  const handleResponse = (response: any) => {
    // console.log('handleResponse', response);
  };
  try {
    const response = await fetch(
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
        body: JSON.stringify({ filters, messages, prompt })
      }
    ).then((res) => res.json());

    const { pineconeData, context, summary } = response;

    const completionRequest = getCompletionRequest({
      context: summary,
      input: prompt,
      history: messages
    });
    const payload = {
      ...completionRequest,
      // model: 'gpt-3.5-turbo',
      // messages: [{ role: 'user', content: prompt }],
      // temperature: 0.1,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
      // max_tokens: 1000,
      stream: true
      // n: 1
    };

    const stream = await OpenAIStream(
      payload,
      { pineconeData, context, summary, completionRequest },
      handleResponse
    );
    return cors(req, new Response(stream));
  } catch (error) {
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
    const stream = await OpenAIStream(payload, {}, handleResponse);
    return new Response(stream);
  }
};

export default handler;
