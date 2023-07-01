import { Message, Sidekick, User, Organization } from 'types';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { countTokens } from '../utilities/countTokens';
import { renderContext } from '../utilities/renderContext';

export async function getCompletionRequest({
  context,
  user,
  organization,
  messages,
  input,
  sidekick,
  gptModel
}: {
  context: string;
  user?: User;
  organization?: Organization;
  messages?: Message[];
  input: string;
  sidekick?: Sidekick;
  gptModel?: string;
}) {
  const systemPrompt = sidekick?.getSystemPromptTemplate
    ? renderContext(sidekick.getSystemPromptTemplate, { input, context, user })
    : '';
  const userPrompt = sidekick?.getUserPromptTemplate
    ? renderContext(sidekick.getUserPromptTemplate, { input, context })
    : input;

  const temperature = sidekick?.temperature || 0.1;
  const frequency = sidekick?.frequency || 0;
  const presence = sidekick?.presence || 0;
  const sidekickModel = sidekick?.defaultModel || gptModel || 'gpt-3.5-turbo';
  const maxCompletionTokens = sidekick?.maxCompletionTokens || 500;

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

  const fullMessage = [...filteredMessages, { role: 'user', content: userPrompt }];

  return {
    max_tokens: maxCompletionTokens,
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: systemPrompt
      },
      ...fullMessage.map((message) => ({
        role:
          message.role === 'user'
            ? ChatCompletionRequestMessageRoleEnum.User
            : ChatCompletionRequestMessageRoleEnum.Assistant,
        content: message.content
      }))
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
