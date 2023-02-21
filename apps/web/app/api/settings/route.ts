// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getJiraProjects, JiraProject } from 'utils/dist/jira';
import { deepmerge } from 'utils/dist/deepmerge';
// import cors from '../../../src/cors';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getAppSettings } from 'getAppSettings';

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const appSettings = await getAppSettings();
  return NextResponse.json(appSettings);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  });
  const newSettings = await request.json();

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
  console.log('projectsSettingsByKey', projectsSettingsByKey);
  const appSettings = deepmerge({}, user?.appSettings, {
    jira: {
      projects: jiraProjects.map((project) => ({
        ...project,
        ...projectsSettingsByKey?.[project.key]
      }))
    }
  });
  console.log('appSettings', appSettings?.jira?.projects);

  await prisma.user.update({
    where: { email: session?.user?.email },
    data: { appSettings }
  });

  return NextResponse.json(user);
}
