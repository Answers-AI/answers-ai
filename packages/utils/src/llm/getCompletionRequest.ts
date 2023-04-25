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
    max_tokens: 2000,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          'You are a talkative AI assistant that helps people. You provide many details and are very informative.'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `Reply based on the context provided. If you don't know the answers say you don't know and can't find. If the context is not enought to answer, ask the user more questions that would help you build the context. If you think you're absolutely right, say so. <CONTEXT>${context}<CONTEXT>`
      },

      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: userName ? 'My name is ' + userName : ''
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
