import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import cors from '@ui/cors';
import { fetchContext } from '@utils/pinecone/fetchContext';

type Data = {
  data?: string;
  error?: any;
};

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  //   const prompt = `You have been tasked with updating the README file for a JavaScript project. The README file contains various sections that correspond to different files within the project. You have been provided with the contents of one of these files, which is located at the path specified by ${
  //     req.body.file_path
  //   }.Your objective is to update the relevant section of the README file based on the contents of the specified file. If there is no section in the README file that corresponds to the specified file path, you should create a new section. In cases where there are sections in the README file that overlap between files, you can reference them once at the top of the file as a shared section.The target audience for the README file is senior level JavaScript developers, so it's essential to provide detailed information that focuses on the purpose and usage of the code. The ultimate goal is to create comprehensive documentation that will enable other developers to understand the code and use it effectively in their own projects.\nCONTENTS:\n\`\`\`
  //   ${req.body.file_contents}
  //   \`\`\`\nREADME:\n${req.body.readme_contents || req.body.file_path}`;

  const prompt = `You have been tasked with creating a README markdown file for the javascript at the path ${req.body.file_path}. The target audience for the README file is senior level JavaScript developers, so it's essential to provide detailed information that focuses on the purpose of the code and anything that may seem unique to the project. The ultimate goal is to create comprehensive documentation that will enable other developers to understand the code and use it effectively in their own projects.  The output should be as concise as possible.\nCONTENTS:\n\`\`\`
  ${req.body.file_contents}
  \`\`\`\n`;

  const { data } = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2000,
    temperature: 0.1,
    frequency_penalty: 0,
    presence_penalty: 0
  }); // Get the recommended changes from the API response\
  let filtersResponse = data.choices[0].text;

  const { pineconeData, context } = await fetchContext({ prompt, messages: [], filters: {} });
  res.status(200).json({ data: filtersResponse });
};

export default handler;
