Filepath: packages/utils/src/auth/buildSettings.ts
Overview: Summary:
This file contains a function called buildSettings that merges user, organization, and system settings to create a new settings object. It also loads Jira projects, Slack channels, and Confluence spaces on every update and merges them with the existing settings.

Import statements:
- deepmerge: a function for merging objects deeply
- JiraProject: a type for Jira projects
- SlackClient: a class for interacting with the Slack API
- User, AppSettings, Organization, ConfluenceSpaceSetting, SlackChannelSetting: types used in the function
- getUserClients: a function for getting Jira, Confluence, and Slack clients for a user
- SYSTEM_SETTINGS: a constant object containing default system settings

Script Summary:
The buildSettings function takes a user and an optional organization as parameters. It calls getUserClients to get Jira, Confluence, and Slack clients for the user. It then merges the user's appSettings, the organization's appSettings, and the SYSTEM_SETTINGS object using deepmerge. If a Jira client is available, it loads all Jira projects and merges them with the existing settings. If a Slack client is available, it loads all Slack channels and merges them with the existing settings. If a Confluence client is available, it loads all Confluence spaces and merges them with the existing settings. Finally, it creates new objects for web URLs and domains and merges them with the existing settings.

Internal Functions:
- None

External Functions:
- getUserClients(user: User): Promise<{ jiraClient: any; confluenceClient: any; slackClient: SlackClient }>
  - Description: gets Jira, Confluence, and Slack clients for a user
  - Parameters: user (User) - the user to get clients for
  - Returns: a Promise that resolves to an object containing Jira, Confluence, and Slack clients

Interaction Summary:
This file interacts with other files in the application by importing types and functions. It also interacts with the getUserClients function to get Jira, Confluence, and Slack clients for a user. It interacts with the SlackClient class to load Slack channels. It may interact with third-party APIs for Jira, Confluence, and Slack.

Developer Questions:
- What are the possible values for the SYSTEM_SETTINGS object?
- What happens if a user does not have any appSettings?
- What happens if an organization does not have any appSettings?
- How are permissions verified for a user and organization?
- What happens if a Jira, Confluence, or Slack API call fails?
- How are web URLs and domains used in the application?

