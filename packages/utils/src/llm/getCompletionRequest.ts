import { Message, Sidekick, User } from 'types';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { countTokens } from '../utilities/countTokens';

export async function getCompletionRequest({
  context,
  user,
  messages,
  input,
  sidekick = {
    value: 'default',
    getSystemPromptTemplate: () => '',
    getUserPromptTemplate: () => '',
    label: 'Default',
    placeholder: 'Default Sidekick',
    contextStringRender: () => ''
  },
  gptModel
}: {
  context: string;
  user: User;
  messages?: Message[];
  input: string;
  sidekick?: Sidekick;
  gptModel: string;
}) {
  const systemPrompt = sidekick.getSystemPromptTemplate(user);
  const userPrompt = sidekick.getUserPromptTemplate(input, context);

  const systemPromptTokens = await countTokens(systemPrompt);
  const userPromptTokens = await countTokens(userPrompt);
  const contextTokens = await countTokens(context);

  const maxTokens = getMaxTokensByModel(gptModel);
  let filteredMessages: Message[] = [];
  let currentTokenCount = systemPromptTokens + userPromptTokens;

  if (messages) {
    for (const message of messages) {
      const contentTokens = await countTokens(message.content);
      if (currentTokenCount + contentTokens <= maxTokens) {
        filteredMessages.push(message);
        currentTokenCount += contentTokens;
      } else {
        break;
      }
    }
  }

  return {
    max_tokens: 500,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemPrompt
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: userPrompt
      },
      // TODO: Summarize history when it gets too long
      ...filteredMessages.map(({ role, content }) => ({ role, content })),
      { role: ChatCompletionRequestMessageRoleEnum.User, content: input }
    ],

    temperature: 0.1,
    model: gptModel || 'gpt-3.5-turbo'
  };
}

const getMaxTokensByModel = (gptModel: string) => {
  switch (gptModel) {
    case 'gpt-3.5-turbo':
      return 4000;
    case 'gpt-4':
      return 8192;
    default:
      return 4096;
  }
};
