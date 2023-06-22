import { Message, Sidekick, User } from 'types';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { countTokens } from '../utilities/countTokens';

export async function getCompletionRequest({
  context,
  user,
  messages,
  input,
  sidekick = {
    departments: ['general'],
    value: 'default',
    getSystemPromptTemplate: () => '',
    getUserPromptTemplate: () => '',
    label: 'Default',
    placeholder: 'Default Sidekick',
    contextStringRender: () => '',
    temperature: 0.1,
    frequency: 0,
    presence: 0,
    maxCompletionTokens: 500,
    defaultModel: 'gpt-3.5-turbo'
  },
  gptModel
}: {
  context: string;
  user?: User;
  messages?: Message[];
  input: string;
  sidekick?: Sidekick;
  gptModel?: string;
}) {
  const systemPrompt = sidekick.getSystemPromptTemplate
    ? sidekick.getSystemPromptTemplate(user)
    : '';
  const userPrompt = sidekick.getUserPromptTemplate
    ? sidekick.getUserPromptTemplate(input, context)
    : input;

  const temperature = sidekick.temperature || 0.1;
  const frequency = sidekick.frequency || 0;
  const presence = sidekick.presence || 0;
  const sidekickModel = sidekick.defaultModel || gptModel || 'gpt-3.5-turbo';
  const maxCompletionTokens = sidekick.maxCompletionTokens || 500;


  const systemPromptTokens = await countTokens(systemPrompt);
  const userPromptTokens = await countTokens(userPrompt);

  const maxTokens = getMaxTokensByModel(maxCompletionTokens, gptModel);
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
    max_tokens: maxCompletionTokens,
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
    frequency_penalty: frequency,
    presence_penalty: presence,
    temperature: temperature,
    model: sidekickModel
  };
}

const getMaxTokensByModel = (maxCompletionTokens: number, gptModel?: string) => {
  switch (gptModel) {
    case 'gpt-3.5-turbo':
      return 4000 - maxCompletionTokens;
    case 'gpt-4':
      return 8192 - maxCompletionTokens;
    case 'gpt-3.5-turbo-16k':
      return 16000 - maxCompletionTokens;
    default:
      return 4000 - maxCompletionTokens;
  }
};
