import { getServerSession } from 'next-auth';
import { deepmerge } from 'utils/dist/deepmerge';
import { getJiraProjects, JiraProject } from 'utils/dist/jira';

import { authOptions } from '../pages/api/auth/[...nextauth]';

import { PrismaClient } from 'db/dist';
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

export async function getAppSettings(req?: any, res?: any) {
  const session = await (req && res
    ? getServerSession(req, res, authOptions)
    : getServerSession(authOptions));
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware

  // TODO: Verify user ownership or permisson scope
  let user = session?.user?.email
    ? await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        }
      })
    : null;
  if (!!session?.user?.email && !user) {
    user = await prisma.user.create({
      data: { ...(session.user as any), appSettings: DEFAULT_SETTINGS }
    });
  }
  if (user) {
    const jiraProjects = await getJiraProjects().then((projects) =>
      projects.map((project) => ({ name: project?.name, key: project?.key }))
    );
    const projectsSettingsByKey =
      (user?.appSettings as any)?.jira?.projects?.reduce((acc: any, project: JiraProject) => {
        acc[project.key] = project;
        return acc;
      }, {}) || {};
    const appSettings = deepmerge(
      { ...DEFAULT_SETTINGS, ...(user?.appSettings as any) },
      {
        jira: {
          projects: jiraProjects.map((project) => ({
            ...project,
            ...projectsSettingsByKey[project.key]
          }))
        }
      }
    );
    return appSettings;
  }
  return DEFAULT_SETTINGS;
}
