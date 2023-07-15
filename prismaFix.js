const fs = require('fs');
const path = require('path');
const util = require('util');
const http = require('http');

const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
const access = util.promisify(fs.access);

const PATHS = [
  './apps/web/.next/server/app/(Main UI)',
  './apps/web/.next/server/app/(Main UI)/(Chat UI)',
  './apps/web/.next/server/app/(Main UI)/(Chat UI)/@modal',
  './apps/web/.next/server/app/(Main UI)/(Chat UI)/@modal/[...all]',
  './apps/web/.next/server/app/(Main UI)/(Chat UI)/chat',
  './apps/web/.next/server/app/(Main UI)/(Chat UI)/journey',
  './apps/web/.next/server/app/(Main UI)/(Chat UI)/journey/new',
  './apps/web/.next/server/app/(Main UI)/settings/integrations/[[...app]]',
  './apps/web/.next/server/app/(Main UI)/settings/organization',
  './apps/web/.next/server/app/(Main UI)/settings/user',
  './apps/web/.next/server/app/(Main UI)/sidekick-studio',
  './apps/web/.next/server/app/(Main UI)/sidekick-studio/(Sidekick Form UI)',
  './apps/web/.next/server/app/(Main UI)/sidekick-studio/(Sidekick Form UI)/[sidekickId]',
  './apps/web/.next/server/app/(Main UI)/sidekick-studio/(Sidekick Form UI)/new',
  './apps/web/.next/server/app/api',
  './apps/web/.next/server/app/api/aws',
  './apps/web/.next/server/app/api/aws/presigned-url',
  './apps/web/.next/server/app/api/sidekicks',
  './apps/web/.next/server/app/api/sidekicks/list',
  './apps/web/.next/server/app/api/sidekicks/list/favorite',
  './apps/web/.next/server/app/api/sidekicks/list/global',
  './apps/web/.next/server/app/api/sidekicks/list/org',
  './apps/web/.next/server/app/api/sidekicks/list/private',
  './apps/web/.next/server/app/api/sidekicks/new',
  './apps/web/.next/server/app/api/sources',
  './apps/web/.next/server/app/api/sync',
  './apps/web/.next/server/app/api/sync/file',
  './apps/web/.next/server/app/api/sync/web'
];

const MISSING_DARWIN_FILES = [];
const MISSING_PRISMA_FILES = [];
let SOURCE_FILE_DARWIN = null;
let SOURCE_FILE_PRISMASCHEMA = null;

async function processPaths() {
  for (const p of PATHS) {
    try {
      await access(p, fs.constants.F_OK);
    } catch (err) {
      await mkdir(p, { recursive: true });
    }

    const filePath = path.join(p, 'libquery_engine-darwin-arm64.dylib.node');
    try {
      await access(filePath, fs.constants.F_OK);
      if (!SOURCE_FILE_DARWIN) {
        SOURCE_FILE_DARWIN = filePath;
      }
    } catch (err) {
      MISSING_DARWIN_FILES.push(p);
    }
  }

  if (SOURCE_FILE_DARWIN) {
    for (const p of MISSING_DARWIN_FILES) {
      const destPath = path.join(p, 'libquery_engine-darwin-arm64.dylib.node');
      console.log(`Copying ${SOURCE_FILE_DARWIN} to ${destPath}`);
      await copyFile(SOURCE_FILE_DARWIN, destPath);
    }
  }

  for (const p of PATHS) {
    try {
      await access(p, fs.constants.F_OK);
    } catch (err) {
      await mkdir(p, { recursive: true });
    }

    const filePath = path.join(p, 'schema.prisma1');
    try {
      await access(filePath, fs.constants.F_OK);
      if (!SOURCE_FILE_PRISMASCHEMA) {
        SOURCE_FILE_PRISMASCHEMA = filePath;
      }
    } catch (err) {
      MISSING_PRISMA_FILES.push(p);
    }
  }

  if (SOURCE_FILE_PRISMASCHEMA) {
    for (const p of MISSING_PRISMA_FILES) {
      const destPath = path.join(p, 'schema.prisma1');
      console.log(`Copying ${SOURCE_FILE_PRISMASCHEMA} to ${destPath}`);
      await copyFile(SOURCE_FILE_PRISMASCHEMA, destPath);
    }
  }
}

const URLS = [
  'http://localhost:3000',
  'http://localhost:3000/@modal',
  'http://localhost:3000/@modal/[...all]',
  'http://localhost:3000/chat',
  'http://localhost:3000/journey',
  'http://localhost:3000/journey/new',
  'http://localhost:3000/sidekick-studio',
  'http://localhost:3000/sidekick-studio/[sidekickId]',
  'http://localhost:3000/sidekick-studio/new',
  'http://localhost:3000/settings/integrations/[[...app]]',
  'http://localhost:3000/settings/organization',
  'http://localhost:3000/settings/user',
  'http://localhost:3000/api',
  'http://localhost:3000/api/aws',
  'http://localhost:3000/api/aws/presigned-url',
  'http://localhost:3000/api/sidekicks',
  'http://localhost:3000/api/sidekicks/list',
  'http://localhost:3000/api/sidekicks/list/favorite',
  'http://localhost:3000/api/sidekicks/list/global',
  'http://localhost:3000/api/sidekicks/list/org',
  'http://localhost:3000/api/sidekicks/list/private',
  'http://localhost:3000/api/sidekicks/new',
  'http://localhost:3000/api/sources',
  'http://localhost:3000/api/sync',
  'http://localhost:3000/api/sync/file',
  'http://localhost:3000/api/sync/web'
];

function pingPaths(urls) {
  urls.forEach((url) => {
    console.log(`Pinging url: ${url}`);
    http
      .get(url, (resp) => {
        console.log(`Response status code: ${resp.statusCode}`);
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received.
        resp.on('end', () => {
          console.log(`Response for ${url}: ${data}`);
        });
      })
      .on('error', (err) => {
        console.log('Error: ' + err.message);
      });
  });
}

processPaths().catch(console.error);
pingPaths(URLS);
