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
    ////console.time(`[summarizeAI] ${id} - ${inputDocs.length} chunks}`);

    const summariesPromises = inputDocs?.map(async (doc, idx) => {
      let summary = doc.pageContent ?? '';
      await sleep(100 * idx);
      // const promptWrapper = `${prompt} <INPUT>${doc.pageContent}<INPUT> Summary:`;
      const promptWrapper = `Use the following portion of a long document to see if any of the text is relevant to answer the question. \nReturn any relevant text verbatim.\n${doc.pageContent}\nQuestion: ${prompt}\nRelevant text, if any:`;
      const res = await openai.createCompletion({
        max_tokens: 2000,
        prompt: promptWrapper,
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
      // const finalPrompt = `${prompt} <INPUT>${summaryText}<INPUT> Summary:`;
      const finalPrompt = `Given the following extracted parts of a long document and a question, create a final answer with references (\"SOURCES\"). \nIf you don't know the answer, just say that you don't know. Don't try to make up an answer.\nALWAYS return a \"SOURCES\" part in your answer.\n\nSOURCES:\n\nQUESTION: {prompt}\n=========\n{summaryText}\n=========\nFINAL ANSWER:`;

      const finalRes = await openai.createCompletion({
        max_tokens: 1000,
        prompt: finalPrompt,
        temperature: 0.1,
        model: 'text-davinci-003'
      });
      //console.timeEnd(`[summarizeAI] ${id} - ${inputDocs.length} chunks}`);
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
