Summary:
This file exports a single function `buildSettings` that takes in a `User` object and an optional `Organization` object and returns a `Promise` that resolves to a `Partial<AppSettings>` object. The function merges the `appSettings` of the `User`, `Organization`, and a `SYSTEM_SETTINGS` object using the `deepmerge` function from the `../deepmerge` module. It then makes API calls to various third-party services (Jira, Confluence, Slack) to fetch additional settings and merges them into the `Partial<AppSettings>` object. Finally, it adds some hardcoded settings for Airtable and Docubot.

Import statements:
- `deepmerge` from `../deepmerge`: a function that recursively merges two objects
- `JiraProject` from `types`: a type definition for a Jira project
- `SlackClient` from `../slack/client`: a class that provides methods for interacting with the Slack API
- `User`, `AppSettings`, `Organization`, `ConfluenceSpaceSetting`, `SlackChannelSetting` from `types`: type definitions for various objects used in the application
- `getUserClients` from `./getUserClients`: a function that returns an object containing instances of `JiraClient`, `ConfluenceClient`, and `SlackClient` for a given `User`
- `SYSTEM_SETTINGS` from `./SYSTEM_SETTINGS`: an object containing default settings for the application

Script Summary:
The `buildSettings` function takes in a `User` object and an optional `Organization` object and returns a `Promise` that resolves to a `Partial<AppSettings>` object. It first calls the `getUserClients` function to get instances of `JiraClient`, `ConfluenceClient`, and `SlackClient` for the given `User`. It then merges the `appSettings` of the `User`, `Organization`, and `SYSTEM_SETTINGS` objects using the `deepmerge` function. It then makes API calls to Jira, Confluence, and Slack to fetch additional settings and merges them into the `Partial<AppSettings>` object. Finally, it adds some hardcoded settings for Airtable and Docubot.

Internal Functions:
- None

External Functions:
- `buildSettings(user: User, org?: Organization): Promise<Partial<AppSettings>>`
  - Parameters:
    - `user`: a `User` object representing the current user
    - `org` (optional): an `Organization` object representing the current organization
  - Returns: a `Promise` that resolves to a `Partial<AppSettings>` object

Interaction Summary:
This file interacts with other modules in the application in the following ways:
- It imports various types and functions from other modules
- It imports the `deepmerge` function from `../deepmerge` to merge objects
- It imports the `getUserClients` function from `./getUserClients` to get instances of `JiraClient`, `ConfluenceClient`, and `SlackClient` for the given `User`
- It imports the `SYSTEM_SETTINGS` object from `./SYSTEM_SETTINGS` to provide default settings for the application
- It interacts with the Jira, Confluence, and Slack APIs to fetch additional settings

Developer Questions:
Developers working with this component may have the following questions when debugging:
- What is the structure of the `AppSettings` object?
- What is the `deepmerge` function and how does it work?
- What is the `getUserClients` function and how does it work?
- What APIs does this file interact with and what endpoints does it call?
- What is the structure of the `SYSTEM_SETTINGS` object?
- What are the hardcoded settings for Airtable and Docubot?

Known Issues and TODOs:
- There are no known issues or bugs with this component
- TODO: Move the check for `session?.user?.email` into a middleware
- TODO: Verify user ownership or permission scope for organizations
- TODO: Handle errors more gracefully (currently just logging to console)