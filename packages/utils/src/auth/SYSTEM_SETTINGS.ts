import { AppSettings } from 'types';

export const SYSTEM_SETTINGS: AppSettings = {
  services: [
    {
      id: 'jira',
      providerId: 'atlassian',
      name: 'jira',
      imageURL: '/static/images/jira.png'
    },
    { id: 'slack', name: 'slack', imageURL: '/static/images/slack.png' },
    {
      id: 'confluence',
      providerId: 'atlassian',
      name: 'confluence',

      imageURL: '/static/images/confluence.png'
    },
    { id: 'web', name: 'web', imageURL: '/static/images/web.png' },
    { id: 'notion', name: 'notion', imageURL: '/static/images/notion.png' },
    { id: 'github', name: 'github', imageURL: '/static/images/github.png' },
    { id: 'drive', name: 'drive', imageURL: '/static/images/drive.png' },
    {
      id: 'contentful',
      name: 'contentful',

      imageURL: '/static/images/contentful.png'
    }
  ]
};
