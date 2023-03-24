import { deepmerge } from '../deepmerge';
import { getJiraProjects, JiraProject } from '../jira';
import SlackClient from '../slack/client';
import { confluenceClient } from '../confluence/client';
import {
  AppSettings,
  Organization,
  SlackChannelSetting,
  ConfluenceSpaceSetting,
  ConfluenceSpace
} from 'types';
import { User } from 'db/generated/prisma-client';
import { prisma } from 'db/dist';

export const SYSTEM_SETTINGS = {
  services: [
    { name: 'jira', enabled: true, imageURL: '/static/images/jira.png' },
    { name: 'slack', enabled: true, imageURL: '/static/images/slack.png' },
    { name: 'confluence', enabled: true, imageURL: '/static/images/confluence.png' },
    { name: 'web', enabled: true, imageURL: '/static/images/web.png' },
    { name: 'notion', enabled: false, imageURL: '/static/images/notion.png' },
    { name: 'github', enabled: false, imageURL: '/static/images/github.png' },
    { name: 'drive', enabled: false, imageURL: '/static/images/drive.png' },
    { name: 'contentful', enabled: false, imageURL: '/static/images/contentful.png' }
  ]
};

export const NO_ORG_SETTINGS = {
  services: [
    { name: 'web', enabled: true, imageURL: '/static/images/web.png' },
    { name: 'jira', enabled: false, imageURL: '/static/images/jira.png' },
    { name: 'slack', enabled: false, imageURL: '/static/images/slack.png' },
    { name: 'confluence', enabled: false, imageURL: '/static/images/confluence.png' },
    { name: 'notion', enabled: false, imageURL: '/static/images/notion.png' },
    { name: 'github', enabled: false, imageURL: '/static/images/github.png' },
    { name: 'drive', enabled: false, imageURL: '/static/images/drive.png' },
    { name: 'contentful', enabled: false, imageURL: '/static/images/contentful.png' }
  ]
};

export async function syncAppSettings(user: User) {
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware

  // TODO: Verify user ownership or permisson scope
  if (user) {
    // TODO: Enable user app settings
    let organization;
    // if (!user.organizationId) {
    //   organization = await prisma.organization.create({
    //     data:{users: { connect: { id: user.id } }}
    //   });
    // } else {
    if (user.organizationId) {
      organization = await prisma.organization.findUnique({
        where: { id: user.organizationId }
      });
    }
    // }
    if (organization) {
      return updateOrgSettings(user, organization as Organization);
    } else {
      return updateUserSettings(user);
    }
  }
  return SYSTEM_SETTINGS;
}

const updateUserSettings = async (user: User) => {
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware
  // TODO: Verify user ownership or permisson scope
  if (user) {
    const appSettings = await buildSettings(user);

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        appSettings: appSettings as any // TODO: Improve this type casting
      }
    });
  }
};

const updateOrgSettings = async (user: User, org: Organization) => {
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware
  // TODO: Verify user ownership or permisson scope
  // TODO: Verify role to update org settings
  if (user && org) {
    const appSettings = await buildSettings(user, org);
    await prisma.organization.update({
      where: { id: org.id },
      data: {
        appSettings: appSettings as any // TODO: Improve this type casting
      }
    });
  }
};

const buildSettings = async (user: User, org?: Organization) => {
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware
  const userSettings = user?.appSettings as AppSettings;
  const orgSettings = org?.appSettings as AppSettings;
  // TODO: Verify user ownership or permisson scope
  if (!org) {
    console.log('UserWithoutOrg', user);
    return NO_ORG_SETTINGS;
  }
  // Load all possible jiraprojects on every update
  let newSettings: Partial<AppSettings> = deepmerge({}, orgSettings, userSettings);
  try {
    const jiraProjects = await getJiraProjects().then((projects) =>
      projects.map((project) => ({ name: project?.name, key: project?.key }))
    );
    const projectsSettingsByKey =
      (newSettings as any)?.jira?.projects?.reduce((acc: any, project: JiraProject) => {
        acc[project.key] = project;
        return acc;
      }, {}) || {};
    newSettings.jira = {
      ...(newSettings as any)?.jira,
      projects: jiraProjects.map((project) => ({
        ...project,
        ...projectsSettingsByKey[project.key]
      }))
    };
  } catch (error) {
    console.log('JiraSettingsError', error);
  }
  try {
    const slackClient = new SlackClient(process.env.SLACK_TOKEN);
    // Load all possible slack channels on every update
    const channels = await slackClient.getChannels();
    const channelsSettingsById =
      (newSettings as any)?.slack?.channels?.reduce((acc: any, channel: SlackChannelSetting) => {
        acc[channel.id] = channel;
        return acc;
      }, {}) || {};
    newSettings.slack = {
      ...(newSettings as any)?.slack,
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
      (newSettings as any)?.confluence?.spaces?.reduce(
        (acc: any, space: ConfluenceSpaceSetting) => {
          acc[space.key] = space;
          return acc;
        },
        {}
      ) || {};

    newSettings.confluence = {
      ...(newSettings as any)?.confluence,
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
      (newSettings as any)?.web?.urls?.reduce((acc: any, url: string) => {
        acc[url] = { url };
        return acc;
      }, {}) || {};

    const domainSettings =
      (newSettings as any)?.web?.domains?.reduce((acc: any, domain: string) => {
        acc[domain] = { domain };
        return acc;
      }, {}) || {};

    newSettings.web = {
      ...(newSettings as any)?.web,
      urls: urlSettings,
      domains: domainSettings
    };
  } catch (error) {
    console.log('urlSettingsError', error);
  }
  console.log('NewSettings');
  console.log(newSettings);
  return newSettings;
};
