import { Message } from 'types';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

export function getCompletionRequest({
  context,
  userName,
  history,
  input
}: {
  context: string;
  userName?: string | null | undefined;
  history: Message[];
  input: string;
}) {
  return {
    max_tokens: 2000,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          'You are a helpful assistant.You specialize in helping people find answers to questions.'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `You are a helpful assistant.You specialize in helping people find answers to questions.
          I will ask you a series of questions and your goal is to help me find the answer.
          I have this question I want to ask you:\n\n"${input}".\n\n
          please provide an appropriate response in markdown based on the following context:\n\n${context}\n\n
          check to make sure that your answer is based on the context provided.
          Explain your answer in detail and step by step.
          Show me where you found the answer.
          Explain to me where you are not confident.
          Suggest followup questions the user can ask to make you more confident in your reponse.
          Resonse Template: \n\n
          ## Summary\n\n
          <detailed summary based on the context>\n\n
          ## Confidence\n\n
          <confidence level>\n\n
          ## Followup Questions\n\n
          <list followup questions>\n\n`
      },
      // TODO: Summarize history when it gets too long
      ...history?.slice(0, -10)?.map(({ role, content }) => ({ role, content })),
      { role: ChatCompletionRequestMessageRoleEnum.User, content: input }
    ],

    temperature: 0.1,
    model: 'gpt-3.5-turbo'
  };
}
