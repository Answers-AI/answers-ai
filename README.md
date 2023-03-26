Answers AI: Monorepo Guide
==========================

Welcome to the official Answers AI monorepo guide! This comprehensive guide covers everything you need to know about setting up, running, and developing the Answers AI project locally on both Mac and Windows systems.

Table of Contents
-----------------

1.  [Overview](#overview)
2.  [Prerequisites](#prerequisites)
3.  [Running the Project Locally](#running-the-project-locally)
4.  [Use Cases](#use-cases)
5.  [FAQ](#faq)

Overview
--------

The Answers AI monorepo uses [pnpm](https://pnpm.io) as its package manager and includes the following packages and apps:

*   `web`: A [Next.js](https://nextjs.org/) app that serves as the frontend and serverless functions for the Answers AI website.
*   `utils`: A shared library of applications that provides utilities for syncing and querying data with the Answers AI database.
*   `eslint-config-custom`: Custom `eslint` configurations that include `eslint-config-next` and `eslint-config-prettier`.
*   `tsconfig`: Shared `tsconfig.json` files used throughout the monorepo.

All packages and apps are written in [TypeScript](https://www.typescriptlang.org/).

Prerequisites
-------------

Before running the project locally, make sure you have the following software installed on your system:

*   [Node.js](https://nodejs.org/)
*   [pnpm](https://pnpm.io/)
*   [Docker](https://www.docker.com/) (for development purposes)

Running the Project Locally
---------------------------

Follow these step-by-step instructions to set up and run the Answers AI project on your local machine.

### Step 1: Clone the Repository

Clone the Answers AI repository to your local machine by running the following command in your terminal (Mac) or Command Prompt (Windows):


```bash
git clone https://github.com/Answers-AI/answers-ai.git
```

### Step 2: Install Dependencies

Navigate to the root directory of the cloned repository and run the following command to install all required dependencies:

```bash
pnpm install
```

> Note: If you have a M1 mac and get an error about canvas you can run this command to fix

```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory of the repository and include the necessary environment variables, such as `DATABASE_URL` and `REDIS_URL`. Use the provided `.env.example` file as a template.

### Step 4: Run the Project

To run the project in development mode, execute the following command in the root directory:


```bash
pnpm run dev
```

This command starts the development server for all apps and packages. To access the web app, open your browser and navigate to `http://localhost:3000`.

Use Cases
---------

The Answers AI project can be used for a variety of purposes, including:

1.  Providing AI-powered answers to user questions.
2.  Integrating with external data sources like OpenAI, Jira, and other APIs.
3.  Analyzing and visualizing data through interactive dashboards and reports.

FAQ
---

**Q: How do I set up a new service data source?**

A: Follow these steps to set up a new service data source:

1.  Navigate to `apps/web/app/api/sync`.
2.  Create a new folder for the service you're adding.
3.  Create a `route.ts` file and use existing `route.ts` files as examples if needed.
4.  Ensure the Inngest event "name" property has a unique root name (e.g., "jira/app.sync").
5.  Go to `packages/types/src/index.ts` and add your service to the `AppSettings` object.
6.  Navigate to `packages/utils/src/ingest` and create a new file for your service (e.g., <code>jira.ts</code>).


**Q: How do I migrate the database for development and deployment?**

A: To migrate the database for development, run the following command in the root directory:

```bash
`pnpm run db:migrate dev`
```

To deploy the database, update the `DATABASE_URL` in your `.env` file with the correct value and run:

```bash
`pnpm run db:migrate deploy`
```

**Q: How do I use the Inngest server during development?**

A: The Inngest server runs automatically when using the `pnpm run dev` command. To run it manually, execute the following command:

```bash
`npx inngest-cli@latest dev -u http://localhost:3000/api/inngest`
```

This will start the Inngest local server and synchronize events on the specified URL. Open the Inngest dashboard to see the available functions and events. To work with events when running the web app locally, go to `http://localhost:3000/events` to see the status and send events.

**Q: How do I enable remote caching with Turborepo?**

A: To enable remote caching, you need a Vercel account. If you don't have one, [create an account](https://vercel.com/signup), then enter the following commands:

```bash
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your Vercel account. Next, link your Turborepo to your remote cache by running the following command from the root of your repository:

```bash
pnpm dlx turbo link
```

For more information about Turborepo, check out their [documentation](https://turbo.build/).