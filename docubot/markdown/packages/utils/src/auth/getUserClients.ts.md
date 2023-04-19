Summary:
This file exports a function called `getUserClients` which takes a user object as input and returns an object containing instances of `ConfluenceClient`, `JiraClient`, and `SlackApiClient` based on the user's account information.

Import statements:
- `prisma` from `db/dist`: Prisma client for database operations
- `ConfluenceClient` from `../confluence/client`: Custom client for Confluence API
- `JiraClient` from `../jira/client`: Custom client for Jira API
- `SlackApiClient` from `../slack/client`: Custom client for Slack API

Script Summary:
The `getUserClients` function first queries the database for all accounts associated with the given user. It then creates an object `accountsByProvider` which maps each account to its provider. It then creates an empty object `clients` of type `UserClients` which will store the instances of the three API clients. It then checks if the user has an access token for each provider and if so, creates an instance of the corresponding API client and adds it to the `clients` object. Finally, it returns the `clients` object.

Internal Functions:
- None

External Functions:
- `getUserClients(user: { id: string }): Promise<UserClients>`: Takes a user object with an `id` property and returns a Promise that resolves to an object of type `UserClients` containing instances of `ConfluenceClient`, `JiraClient`, and `SlackApiClient` based on the user's account information.

Interaction Summary:
This file interacts with the Prisma client for database operations and with three custom API clients for Confluence, Jira, and Slack. It uses the account information from the database to create instances of the API clients.

Developer Questions:
- What is the structure of the `accounts` array returned by the `prisma.account.findMany` function?
- What is the structure of the `accountsByProvider` object created by the `reduce` function?
- What is the `@ts-expect-error` comment for?
- Why is the `if` statement for `accountsByProvider?.atlassian?.access_token` repeated for both `confluenceClient` and `jiraClient`?