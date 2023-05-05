import { AppSettings } from 'types';

export const SYSTEM_SETTINGS: AppSettings = {
  services: [
    {
      id: 'confluence',
      providerId: 'atlassian',
      name: 'confluence',

      imageURL: '/static/images/logo-confluence.svg'
    },
    {
      id: 'contentful',
      name: 'contentful',

      imageURL: '/static/images/logo-contentful.svg'
    },
    {
      id: 'drive',
      providerId: 'google',
      name: 'drive',
      imageURL: '/static/images/logo-google-drive.svg'
    },
    {
      id: 'github',
      providerId: 'github',
      name: 'github',
      imageURL: '/static/images/logo-github.svg'
    },
    {
      id: 'jira',
      providerId: 'atlassian',
      name: 'jira',
      imageURL: '/static/images/logo-jira.svg'
    },
    { id: 'notion', name: 'notion', imageURL: '/static/images/logo-notion.svg' },
    { id: 'slack', providerId: 'slack', name: 'slack', imageURL: '/static/images/logo-slack.svg' },

    { id: 'web', name: 'web', imageURL: '/static/images/logo-web.svg', enabled: true },
    { id: 'airtable', name: 'airtable', imageURL: '/static/images/airtable.png', enabled: false },
    { id: 'docubot', name: 'docubot', imageURL: '/static/images/docubot.png', enabled: false }
  ]
};
