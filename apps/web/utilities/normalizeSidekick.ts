import toSentenceCase from '@utils/utilities/toSentenceCase';
import { renderTemplate } from '@utils/utilities/renderTemplate';
import { Sidekick, SidekickListItem, User } from 'types';

export const normalizeSidekickListItem = (sidekick: Sidekick, user?: User): SidekickListItem => {
  switch (true) {
    case sidekick.isGlobal:
      sidekick.sharedWith = 'global';
      break;

    case sidekick.isSharedWithOrg:
      sidekick.sharedWith = 'org';
      break;

    case sidekick.isSystem:
      sidekick.sharedWith = 'system';
      break;

    default:
      sidekick.sharedWith = 'private';
      break;
  }

  const hasFavorited = sidekick?.favoritedBy?.some((u) => u.id === user?.id) ?? false;

  const sidekickListItem: SidekickListItem = {
    placeholder: sidekick.placeholder || '',
    tagString: (sidekick.tags || []).map((t) => toSentenceCase(t)).join(', '),
    tags: (sidekick.tags || []).map((t) => toSentenceCase(t)),
    id: sidekick.id || '',
    aiModel: sidekick.aiModel || '',
    label: sidekick.label || '',
    sharedWith: sidekick.sharedWith,
    isFavorite: hasFavorited
  };

  return sidekickListItem;
};

export const normalizeSidekickList = (sidekicks: Sidekick[], user?: User): SidekickListItem[] => {
  const normalizedSidekicks: SidekickListItem[] = sidekicks.map((sidekick) =>
    normalizeSidekickListItem(sidekick, user)
  );

  return normalizedSidekicks;
};

//TODO: Update if we don't want to return all fields
export const normalizeSidekickItem = (sidekick: Sidekick): Sidekick => {
  return sidekick;
};

//TODO: Update if we don't want to return all fields
export const normalizeSidekickForUpdate = (sidekick: Sidekick): Sidekick => {
  const { temperature, frequency, presence, maxCompletionTokens, sharedWith, ...data } = sidekick;

  const isSystem = sharedWith === 'system';
  const isGlobal = !isSystem && sharedWith === 'global';
  const isSharedWithOrg = !isSystem && sharedWith === 'org';

  const normalizedSidekick: Sidekick = {
    ...data,
    temperature: Number(temperature),
    frequency: Number(frequency),
    presence: Number(presence),
    maxCompletionTokens: Number(maxCompletionTokens),
    isSystem,
    isGlobal,
    isSharedWithOrg
  };

  // Validate handlebars template
  try {
    const prompt = renderTemplate(normalizedSidekick.systemPromptTemplate, {});
  } catch (err) {
    console.log(err);
    throw new Error('InvalidSystemPromptTemplate');
  }
  try {
    const prompt = renderTemplate(normalizedSidekick.userPromptTemplate, {});
  } catch (err) {
    console.log(err);
    throw new Error('InvalidUserPromptTemplate');
  }
  try {
    const prompt = renderTemplate(normalizedSidekick.contextStringRender, {});
  } catch (err) {
    console.log(err);
    throw new Error('InvalidContextRenderTemplate');
  }

  return normalizedSidekick;
};
