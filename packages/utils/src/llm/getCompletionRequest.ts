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
    max_tokens: 6000,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          'You are a teacher. You provide me with answers to my questions.'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `
        You are a typescript teacher that can explain things in a way that is easy to understand.
        The transcript might be in a a different order than it was in the original video.
        I want you to explain the information in following transcript in a way that is easy to understand:
        ###
        ${context}
        ###
        Create a comprehensive documentation guide that provides step-by-step instructions to repeat the steps.
        Create a guide for the following:
        `
      },
      // TODO: Summarize history when it gets too long
      ...((messages
        ? messages?.slice(-10)?.map(({ role, content }) => ({ role, content }))
        : []) as ChatCompletionRequestMessage[]),
      { role: ChatCompletionRequestMessageRoleEnum.User, content: input }
    ],

    temperature: 0.1,
    model: 'gpt-4'
  };
}
