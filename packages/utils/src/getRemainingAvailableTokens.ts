import { Organization, Sidekick, User } from 'types';
import { renderTemplate } from './utilities/renderTemplate';
import getOrganizationContextFields from './utilities/getOrganizationContextFields';
import getUserContextFields from './utilities/getUserContextFields';
import { countTokens } from './utilities/countTokens';
import getMaxTokensByModel from './utilities/getMaxTokensByModel';

//Calculates the remaining available tokens for a given input and optional context.
export interface GetRemainingAvailableTokensProps {
  sidekick?: Sidekick;
  input: string;
  context?: any;
  organization?: Organization;
  user?: User;
  model?: string;
}

export const getRemainingAvailableTokens = async ({
  sidekick,
  input,
  context = '',
  organization,
  user,
  model
}: GetRemainingAvailableTokensProps) => {
  // Get organization's custom contact fields
  const organizationContext: Record<string, any> = getOrganizationContextFields(organization);

  // Get user's custom context fields
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
  const sidekickModel = model || sidekick?.aiModel || 'gpt-3.5-turbo';
  const maxCompletionTokens = sidekick?.maxCompletionTokens || 500;

  const maxTokens = getMaxTokensByModel(sidekickModel) - maxCompletionTokens;

  const systemPromptTokens = await countTokens(systemPrompt);
  const userPromptTokens = await countTokens(userPrompt);
  const remainingTokens = maxTokens - (systemPromptTokens + userPromptTokens);

  return remainingTokens > 0 ? remainingTokens : 0;
};
