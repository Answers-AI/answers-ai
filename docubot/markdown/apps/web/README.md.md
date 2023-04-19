# Filepath: apps/web/README.md

## Getting Started
### Summary
Instructions on how to run the development server and access the API routes.

1. Run the development server:
```bash
yarn dev
```
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
3. Modify `pages/index.js` to edit the page. The page auto-updates as you edit the file.
4. Access [http://localhost:3000/api/hello](http://localhost:3000/api/hello) to use the API routes. This endpoint can be edited in `pages/api/hello.js`.
5. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Event Oriented with Inngest
### Summary
Information on how to use Inngest to process and synchronize events related to Jira and Slack integration.

### Overview
The project uses Inngest, a JavaScript-based open-source event-driven platform to automate the process of synchronizing Jira and Slack data. It allows us to create functions that are triggered in response to events and can be used to execute tasks based on the event's data.

### Main Event Types
The following are the available Inngest functions that can be triggered in response to specific events:

- processSyncSlack: Process the slack/app.sync event
- processJiraUpdated: Process the jira/app.sync event
- processWebPageUpdated: Process the web/page.sync event
- processWebDomainUpdated: Process the web/domain.sync event
- processJiraUpdated: Process the jira/app.sync event
- procesProjectUpdated: Process the PROJECT_UPDATED event
- processUpsertedIssues: Process the jira/issues.upserted event

### Running the dev Inngest server
#### Summary
Instructions on how to run the Inngest server manually.

1. Run the following command to start the dev server:
```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```
2. This will start the Inngest local server and will synchronize events on the specified URL.
3. Open the Inngest dashboard to see the available functions and events.
4. Sync any platform from the UI at http://localhost:3000

### Related Files
None

### List of questions that could be answered about this document that could make it more useful
- What is Inngest?
- What are the available Inngest functions?
- How do I run the Inngest server manually?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How do I use Inngest to synchronize Jira and Slack data?
- What are the available Inngest functions and how do I use them?
- How do I run the Inngest server manually?