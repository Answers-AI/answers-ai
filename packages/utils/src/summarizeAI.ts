import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { randomUUID } from 'crypto';
import { openai } from '../openai/client';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const timeout = (ms: number) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
export const summarizeAI = async ({
  input,
  prompt,
  chunkSize = 7000, // 7000 is the max for openai
  id
}: {
  input: string;
  prompt?: string;
  chunkSize?: number;
  max_recurse?: number;
  id?: string;
}): Promise<string> => {
  if (!id) {
    id = randomUUID();
  }
  if (!input) return input;
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize });
  const inputDocs = await textSplitter.createDocuments([input]);
  if (inputDocs.length > 1) {
    console.time(`[summarizeAI] ${id} - ${inputDocs.length} chunks}`);

    const summariesPromises = inputDocs?.map(async (doc, idx) => {
      let summary = doc.pageContent ?? '';
      await sleep(100 * idx);
      const res = await openai.createCompletion({
        max_tokens: 1000,
        prompt: `${prompt} <INPUT>${doc.pageContent}<INPUT> Summary:`,
        temperature: 0.1,
        model: 'text-davinci-003'
      });

      if (res?.data?.choices?.[0]?.text) {
        summary = res?.data?.choices?.[0]?.text!;
      }
      return summary;
    });
    const summaries = await Promise.all(summariesPromises);
    const summaryText = summaries?.join('<SEP>');
    const summaryDocs = await textSplitter.createDocuments([summaryText]);
    if (summaryDocs.length === 1) {
      const finalRes = await openai.createCompletion({
        max_tokens: 1000,
        prompt: `${prompt} <INPUT>${summaryText}<INPUT> Summary:`,
        temperature: 0.1,
        model: 'text-davinci-003'
      });
      console.timeEnd(`[summarizeAI] ${id} - ${inputDocs.length} chunks}`);
      return finalRes?.data?.choices?.[0]?.text!;
    } else {
      return summarizeAI({
        input: summaryText,
        prompt,
        chunkSize,
        id
      });
    }
  }
  return input;
};
