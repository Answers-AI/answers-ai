import { Message, Sidekick, User, Organization } from 'types';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { countTokens } from '../utilities/countTokens';
import { renderTemplate } from '../utilities/renderTemplate';
import getMaxTokensByModel from '../utilities/getMaxTokensByModel';
import getUserContextFields from '../utilities/getUserContextFields';
import getOrganizationContextFields from '../utilities/getOrganizationContextFields';

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
  // Get organization's custom contact fields
  const organizationContext: Record<string, any> = getOrganizationContextFields(organization);

  // Get user's custom contect fields
  const userContext: Record<string, any> = getUserContextFields(user);

  const systemPrompt = sidekick?.systemPromptTemplate
    ? renderTemplate(sidekick.systemPromptTemplate, {
        input,
        context,
        user: userContext,
        organization: organizationContext
      })
    : '';

  const userPrompt = sidekick?.userPromptTemplate
    ? renderTemplate(sidekick.userPromptTemplate, {
        userInput: input,
        context,
        user: userContext,
        organization: organizationContext
      })
    : input;

  const temperature = sidekick?.temperature || 0.1;
  const frequency = sidekick?.frequency || 0;
  const presence = sidekick?.presence || 0;
  const sidekickModel = gptModel || sidekick?.aiModel || 'gpt-3.5-turbo';
  const maxCompletionTokens = sidekick?.maxCompletionTokens || 500;

  const systemPromptTokens = await countTokens(systemPrompt);
  const userPromptTokens = await countTokens(userPrompt);

  const maxTokens = getMaxTokensByModel(sidekickModel) - maxCompletionTokens;

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
