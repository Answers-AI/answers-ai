import { Message } from 'types';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

export function getCompletionRequest({
  context,
  userName,
  messages,
  input
}: {
  context: string;
  userName?: string | null | undefined;
  messages?: Message[];
  input: string;
}) {
  return {
    max_tokens: 1000,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          `You are a helpful assistant. Always let the user know your confidence level in your response.
          Always follow up with a list of questions the user could ask that will help you understand their intention better.`
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `
        I want you to use the following context to respond to the users command:
        ###
        ${context}
        ###
        User Command: ${input}\n\n 
        Respond in markdown format.
        `
      },
      // TODO: Summarize history when it gets too long
      ...((messages
        ? messages?.slice(-10)?.map(({ role, content }) => ({ role, content }))
        : []) as ChatCompletionRequestMessage[]),
      { role: ChatCompletionRequestMessageRoleEnum.User, content: input }
    ],

    temperature: 0.1,
    model: 'gpt-3.5-turbo'
  };
}
