// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { AppSettings } from 'types';
// import cors from '../../../src/cors';

let appSettings: AppSettings = {
  services: [
    { name: 'JIRA', enabled: true },
    { name: 'SLACK', enabled: true },
    { name: 'NOTION', enabled: false },
    { name: 'GITHUB', enabled: false }
  ],
  jira: {
    projects: [
      { key: 'DRATA', enabled: true },
      { key: 'PROJECT', enabled: false },
      { key: 'SUPPORT', enabled: false }
    ]
  }
};

export async function GET(request: Request) {
  return NextResponse.json(appSettings);
}
export async function POST(request: Request) {
  appSettings = { ...appSettings, ...(await request.json()) };
  return NextResponse.json(appSettings);
}
