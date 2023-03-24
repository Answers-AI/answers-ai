import { deepmerge } from '../deepmerge';
import { getJiraProjects, JiraProject } from '../jira';
import SlackClient from '../slack/client';
import { confluenceClient } from '../confluence/client';
import { AppSettings, SlackChannelSetting, ConfluenceSpaceSetting, ConfluenceSpace } from 'types';
import { User } from 'db/generated/prisma-client';

const slackClient = new SlackClient(process.env.SLACK_TOKEN);

const DEFAULT_SETTINGS = {
  services: [
    { name: 'jira', enabled: true, imageURL: '/static/images/jira.png' },
    { name: 'slack', enabled: true, imageURL: '/static/images/slack.png' },
    { name: 'notion', enabled: false, imageURL: '/static/images/notion.png' },
    { name: 'github', enabled: false, imageURL: '/static/images/github.png' },
    { name: 'drive', enabled: false, imageURL: '/static/images/drive.png' },
    { name: 'contentful', enabled: false, imageURL: '/static/images/contentful.png' },
    { name: 'confluence', enabled: true, imageURL: '/static/images/confluence.png' }
  ],
  jira: {}
};

export async function syncAppSettings(user: User) {
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware

  // TODO: Verify user ownership or permisson scope
  if (user) {
    // Load all possible jiraprojects on every update
    let newSettings: Partial<AppSettings> = {};
    try {
      const jiraProjects = await getJiraProjects().then((projects) =>
        projects.map((project) => ({ name: project?.name, key: project?.key }))
      );
      const projectsSettingsByKey =
        (user?.appSettings as any)?.jira?.projects?.reduce((acc: any, project: JiraProject) => {
          acc[project.key] = project;
          return acc;
        }, {}) || {};
      newSettings.jira = {
        ...(user?.appSettings as any)?.jira,
        projects: jiraProjects.map((project) => ({
          ...project,
          ...projectsSettingsByKey[project.key]
        }))
      };
    } catch (error) {
      console.log('JiraSettingsError', error);
    }
    try {
      // Load all possible slack channels on every update
      const channels = await slackClient.getChannels();
      const channelsSettingsById =
        (user?.appSettings as any)?.slack?.channels?.reduce(
          (acc: any, channel: SlackChannelSetting) => {
            acc[channel.id] = channel;
            return acc;
          },
          {}
        ) || {};
      newSettings.slack = {
        ...(user?.appSettings as any)?.slack,
        channels: channels.map((channel) => ({
          ...channel,
          ...channelsSettingsById[channel.id]
        }))
      };
    } catch (error) {
      console.log('SlackSettingsError', error);
    }

    try {
      // Load all possible Confluence spaces on every update
      const { results: spaces }: { results: ConfluenceSpace[] } =
        await confluenceClient.fetchConfluenceData('/spaces', { cache: false });

      const spacesById =
        (user?.appSettings as any)?.confluence?.spaces?.reduce(
          (acc: any, space: ConfluenceSpaceSetting) => {
            acc[space.key] = space;
            return acc;
          },
          {}
        ) || {};

      newSettings.confluence = {
        ...(user?.appSettings as any)?.confluence,
        spaces: spaces.map((space) => ({
          ...space,
          ...spacesById[space.key]
        }))
      };
    } catch (error) {
      console.log('ConfluenceSettingsError', error);
    }

    try {
      const urlSettings =
        (user?.appSettings as any)?.web?.urls?.reduce((acc: any, url: string) => {
          acc[url] = { url };
          return acc;
        }, {}) || {};

      const domainSettings =
        (user?.appSettings as any)?.web?.domains?.reduce((acc: any, domain: string) => {
          acc[domain] = { domain };
          return acc;
        }, {}) || {};

      newSettings.web = {
        ...(user?.appSettings as any)?.web,
        urls: urlSettings,
        domains: domainSettings
      };
    } catch (error) {
      console.log('urlSettingsError', error);
    }

    const appSettings = deepmerge(DEFAULT_SETTINGS, user?.appSettings, newSettings, {
      services: DEFAULT_SETTINGS.services
    });
    return JSON.parse(JSON.stringify(appSettings));
  }
  return DEFAULT_SETTINGS;
}
