import toSentenceCase from '@utils/utilities/toSentenceCase';
import { Sidekick, SidekickListItem } from 'types';

export const normalizeSidekickListItem = (sidekick: Sidekick): SidekickListItem => {
  const sidekickListItem: SidekickListItem = {
    placeholder: sidekick.placeholder || '',
    tags: (sidekick.tags || []).map((t) => toSentenceCase(t)).join(', '),
    id: sidekick.id || '',
    label: sidekick.label || '',
    sharedWith: sidekick.isGlobal ? 'global' : sidekick.isSharedWithOrg ? 'org' : 'private',
    isFavorite: true
  };

  return sidekickListItem;
};

export const normalizeSidekickList = (sidekicks: Sidekick[]): SidekickListItem[] => {
  const normalizedSidekicks: SidekickListItem[] = sidekicks.map((sidekick) =>
    normalizeSidekickListItem(sidekick)
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

  const normalizedSidekick: Sidekick = {
    ...data,
    temperature: Number(temperature),
    frequency: Number(frequency),
    presence: Number(presence),
    maxCompletionTokens: Number(maxCompletionTokens),
    isGlobal: sharedWith === 'global',
    isSharedWithOrg: sharedWith === 'org'
  };

  return normalizedSidekick;
};
