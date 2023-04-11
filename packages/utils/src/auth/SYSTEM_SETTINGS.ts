import { AppSettings } from 'types';

export const SYSTEM_SETTINGS: AppSettings = {
  services: [
    {
      id: 'confluence',
      providerId: 'atlassian',
      name: 'confluence',

      imageURL: '/static/images/confluence.png'
    },
    {
      id: 'contentful',
      name: 'contentful',

      imageURL: '/static/images/contentful.png'
    },
    { id: 'drive', providerId: 'google', name: 'drive', imageURL: '/static/images/drive.png' },
    { id: 'github', providerId: 'github', name: 'github', imageURL: '/static/images/github.png' },
    {
      id: 'jira',
      providerId: 'atlassian',
      name: 'jira',
      imageURL: '/static/images/jira.png'
    },
    { id: 'notion', name: 'notion', imageURL: '/static/images/notion.png' },
    { id: 'slack', providerId: 'slack', name: 'slack', imageURL: '/static/images/slack.png' },

    { id: 'web', name: 'web', imageURL: '/static/images/web.png', enabled: true }
  ]
};
