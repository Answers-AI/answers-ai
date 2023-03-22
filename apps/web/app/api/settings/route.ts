// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getJiraProjects, JiraProject } from '@utils/jira';
import { deepmerge } from '@utils/deepmerge';
// import cors from '@ui/cors';
import { prisma } from 'db/dist';

import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { getAppSettings } from '@ui/getAppSettings';

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
  const appSettings = deepmerge({}, user?.appSettings, newSettings, {
    jira: {
      projects: jiraProjects.map((project) => ({
        ...project,
        ...projectsSettingsByKey?.[project.key]
      }))
    }
  });
  await prisma.user.update({
    where: { email: session?.user?.email },
    data: { appSettings }
  });

  return NextResponse.json(user);
}
