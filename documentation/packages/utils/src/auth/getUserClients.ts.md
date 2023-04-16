Filepath: packages/utils/src/auth/getUserClients.ts
Overview: Summary:
This file exports a function that retrieves user accounts from a database and creates instances of three different client classes based on the accounts found. These client classes are used to interact with third-party APIs for Jira, Confluence, and Slack.

Import statements:
- `prisma` from `db/dist`: A database client used to query user accounts.
- `ConfluenceClient` from `../confluence/client`: A class used to interact with the Confluence API.
- `JiraClient` from `../jira/client`: A class used to interact with the Jira API.
- `SlackApiClient` from `../slack/client`: A class used to interact with the Slack API.

Script Summary:
The `getUserClients` function takes a user object with an `id` property and returns an object with three properties: `jiraClient`, `confluenceClient`, and `slackClient`. It first queries the database for all accounts associated with the user's ID. It then creates instances of the appropriate client classes based on the accounts found and returns them in an object.

Internal Functions:
None.

External Functions:
- `getUserClients(user: { id: string }): Promise<UserClients>`: Takes a user object with an `id` property and returns a promise that resolves to an object with three properties: `jiraClient`, `confluenceClient`, and `slackClient`. Each property is an instance of a client class used to interact with the corresponding third-party API.

Interaction Summary:
This file interacts with a database to retrieve user accounts and with three different client classes to interact with third-party APIs for Jira, Confluence, and Slack. It is likely used in other parts of the application to retrieve and use these client instances for various purposes.

Developer Questions:
- What database is being used and how is it configured?
- How are the `ConfluenceClient`, `JiraClient`, and `SlackApiClient` classes implemented and what methods do they provide?
- How are the client instances returned by this function used in other parts of the application?
- What happens if a user has accounts for multiple providers? How are conflicts resolved?

