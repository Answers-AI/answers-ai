# Answers AI

This is the official Answers AI monorepo

## What's inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

## Apps and Packages

- [`web`](./packages/web/README.md): a [Next.js](https://nextjs.org/) app holding the frontend and serverless functions for the Answers AI website
- [`utils`](./packages/utils/README.md): a library shared applications with utilities to sync and query data to the Answers AI database
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

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

Redis is used as a cache layer for OpenAi, Jira and general purpose key-value storage, in development this will run with Docker and Production uses a hosted database.

The the database is configured through `REDIS_URL`.

[Example usage](packages/utils/src/redisLoader.ts)

## Prisma

The database of choice is PostgreSQL, in development this will run with Docker and Production uses a hosted database.

The database is configured with [Prisma](https://www.prisma.io/), the database is configured through `DATABASE_URL`.

The database is configured with [Prisma](https://www.prisma.io/), the database is configured through `DATABASE_URL`.

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

The project uses Inngest, a JavaScript-based open-source event-driven platform.

It allows us to create functions that are triggered in response to events and can be used to execute tasks based on the event's data.

### Running the dev Inngest server

The dev server is ran automatically when using turbo!

To run it manually, run the following command:

```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

This will start the Inngest local server and will synchronize events on the specified URL.

Open the Inngest dashboard to see the available functions and events.

### Working with events

When running the web locally go to http://localhost:3000/events to see the status and send events.

## Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```

pnpm dlx turbo login

```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```

pnpm dlx turbo link

```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

```

```
