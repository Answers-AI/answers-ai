# Answers AI

## Summary
This is the official Answers AI monorepo that uses pnpm as a package manager. It includes various packages and apps, such as a Next.js app for the frontend and serverless functions, a library for shared applications with utilities to sync and query data to the Answers AI database, and configurations for TypeScript, ESLint, and Prettier. Redis is used as a cache layer for OpenAI, Jira, and general purpose key-value storage, while PostgreSQL is the database of choice, configured with Prisma.

## Apps and Packages
- `web`: a Next.js app holding the frontend and serverless functions for the Answers AI website
- `utils`: a library shared applications with utilities to sync and query data to the Answers AI database
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Utilities
- TypeScript for static type checking
- ESLint for code linting
- Prettier for code formatting

## Build
To build all apps and packages, run the following command:
```
pnpm run build
```

## Develop
To develop all apps and packages, run the following command:
```
pnpm run dev
```

## Redis
Redis is used as a cache layer for OpenAi, Jira and general purpose key-value storage, in development this will run with Docker and Production uses a hosted database. The database is configured through `REDIS_URL`.
[Example usage](packages/utils/src/redisLoader.ts)

## Prisma
The database of choice is PostgreSQL, in development this will run with Docker and Production uses a hosted database. The database is configured with Prisma, the database is configured through `DATABASE_URL`.

### Develop
To create develop migrations use
```
pnpm run db:migrate dev
```

### Deployment
Update your `.env` file to have the correct `DATABASE_URL` and run
```
pnpm run db:migrate deploy
```

## Inngest
The project uses Inngest, a JavaScript-based open-source event-driven platform. It allows us to create functions that are triggered in response to events and can be used to execute tasks based on the event's data.

### Running the dev Inngest server
The dev server is ran automatically when using turbo! To run it manually, run the following command:
```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```
This will start the Inngest local server and will synchronize events on the specified URL. Open the Inngest dashboard to see the available functions and events.

### Working with events
When running the web locally go to http://localhost:3000/events to see the status and send events.

## Remote Caching
Turborepo can use a technique known as Remote Caching to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines. By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can create one, then enter the following commands:
```
pnpm dlx turbo login
```
This will authenticate the Turborepo CLI with your Vercel account. Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:
```
pnpm dlx turbo link
```

## Useful Links
Learn more about the power of Turborepo:
- Tasks
- Caching
- Remote Caching
- Filtering
- Configuration Options
- CLI Usage

## Setting up a new service data source
Go to apps/web/app/api/sync, create a new folder for the service you are adding, and create a route.ts file. Review other route.ts files for direction if needed. Make sure the inngest event "name" property has a unique root name (e.g. "jira/app.sync"). Go to packages/types/src/index.ts and add your service to the AppSettings object. Go to packages/utils/src/ingest and create a new file for your service (e.g. jira.ts).

### Related Files
If the documentation refers to any other files, list them here.

### List of questions that could be answered about this document that could make it more useful
- What is the purpose of this monorepo?
- What packages and apps are included in this monorepo?
- What utilities are already set up in this monorepo?
- How do you build and develop all apps and packages?
- What is Redis used for in this monorepo?
- What is the database of choice in this monorepo?
- How is the database configured in this monorepo?
- What is Inngest and how is it used in this monorepo?
- How can you run the dev Inngest server?
- How can you work with events in this monorepo?
- What is Remote Caching and how can you enable it in this monorepo?
- How can you set up a new service data source in this monorepo?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How can I build and develop all apps and packages in this monorepo?
- How can I configure Redis and the database in this monorepo?
- How can I use Inngest to create functions that are triggered in response to events?
- How can I enable Remote Caching in this monorepo?
- How can I set up a new service data source in this monorepo?