// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getJiraProjects, JiraProject } from 'utils/dist/jira';
import { deepmerge } from 'utils/dist/deepmerge';
// import cors from '../../../src/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_SETTINGS = {
  services: [
    { name: 'jira', enabled: true },
    { name: 'slack', enabled: true },
    { name: 'notion', enabled: false },
    { name: 'github', enabled: false },
    { name: 'drive', enabled: false },
    { name: 'contentful', enabled: false }
  ],
  jira: {}
};

export async function GET(request: Request) {
  // TODO: Move this into a middleware
  let user;
  // TODO: Verify user ownership or permisson scope
  user = await prisma.user.findUnique({
    where: {
      username: 'maxtechera-2'
    }
  });

  if (!user) {
    // TODO - Improve creating a user by default
    user = await prisma.user.create({
      data: {
        username: 'maxtechera-2',
        email: 'maxi.techera-2g@gmail.com',
        appSettings: DEFAULT_SETTINGS
      }
    });
    const jiraProjects = await getJiraProjects().then((projects) =>
      projects.map((project) => ({ name: project?.name, key: project?.key }))
    );
    const projectsSettingsByKey = user?.appSettings?.jira?.projects?.reduce(
      (acc: any, project: JiraProject) => {
        acc[project.key] = { ...project, enabled: false };
        return acc;
      },
      {}
    );

    const appSettings = deepmerge(
      { ...DEFAULT_SETTINGS, ...user?.appSettings },
      {
        jira: {
          projects: jiraProjects.map((project) => ({
            ...projectsSettingsByKey?.[project.key],
            ...project
          }))
        }
      }
    );
    return NextResponse.json(appSettings);
  }
  return NextResponse.json(user?.appSettings);
}
export async function POST(request: Request) {
  const newSettings = await request.json();

  let user;

  // TODO: Verify user ownership or permisson scope
  user = await prisma.user.findUnique({
    where: {
      username: 'maxtechera-2'
    }
  });

  // Add all possible jiraprojects on every update
  const jiraProjects = await getJiraProjects().then((projects) =>
    projects.map((project) => ({ name: project?.name, key: project?.key }))
  );

  // Keep the existing settings for the projects
  const projectsSettingsByKey = newSettings?.jira?.projects?.reduce(
    (acc: any, project: JiraProject) => {
      acc[project.key] = { ...project };
      return acc;
    },
    {}
  );
  // console.log('projectsSettingsByKey', projectsSettingsByKey);
  const appSettings = deepmerge(DEFAULT_SETTINGS, {
    jira: {
      projects: jiraProjects.map((project) => ({
        ...project,
        ...projectsSettingsByKey?.[project.key]
      }))
    }
  });

  if (!user) {
  } else {
    await prisma.user.update({
      where: { username: 'maxtechera-2' },
      data: { appSettings }
    });
  }
  return NextResponse.json(appSettings);
}
