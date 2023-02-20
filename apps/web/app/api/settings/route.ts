// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { AppSettings } from 'types';
import { getJiraProjects } from 'utils/dist/jira';
// import cors from '../../../src/cors';

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

let appSettings: AppSettings;

export async function GET(request: Request) {
  if (!appSettings) {
    appSettings = DEFAULT_SETTINGS;
    const projects = await getJiraProjects();
    appSettings.jira.projects = projects.map((project) => ({ key: project.key, enabled: false }));
  }
  return NextResponse.json(appSettings);
}
export async function POST(request: Request) {
  appSettings = { ...appSettings, ...(await request.json()) };
  return NextResponse.json(appSettings);
}
