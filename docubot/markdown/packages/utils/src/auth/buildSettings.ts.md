Summary:
This file exports a function called `buildSettings` which takes a `User` object and an optional `Organization` object as parameters. It then uses these objects to retrieve clients for Jira, Confluence, and Slack, and uses these clients to load settings for each service. It also merges these settings with system settings and returns the resulting object.

Import statements:
- `deepmerge` from `../deepmerge`: A third-party library used to merge objects deeply.
- `JiraProject` from `types`: A type definition for a Jira project.
- `SlackClient` from `../slack/client`: A custom class for interacting with the Slack API.
- Various types from `types`: Type definitions for various objects used in the function.
- `getUserClients` from `./getUserClients`: A custom function for retrieving clients for Jira, Confluence, and Slack.
- `SYSTEM_SETTINGS` from `./SYSTEM_SETTINGS`: A set of system settings.

Script Summary:
The `buildSettings` function takes a `User` object and an optional `Organization` object as parameters. It retrieves clients for Jira, Confluence, and Slack using the `getUserClients` function, and then uses these clients to load settings for each service. It also merges these settings with system settings using the `deepmerge` library, and returns the resulting object.

Internal Functions:
None.

External Functions:
- `buildSettings(user: User, org?: Organization) => Promise<Partial<AppSettings>>`: The main function exported by the file. It takes a `User` object and an optional `Organization` object as parameters, and returns a promise that resolves to a partial `AppSettings` object.

Interaction Summary:
This file interacts with the rest of the application by providing a function that can be used to load settings for various services. It relies on the `getUserClients` function to retrieve clients for Jira, Confluence, and Slack, and it merges the resulting settings with system settings. It does not have any direct interactions with other components.

Developer Questions:
- What is the `deepmerge` library, and how does it work?
- What is the `getUserClients` function, and how does it retrieve clients for Jira, Confluence, and Slack?
- What are the various types defined in `types`, and how are they used in this file?
- What are the system settings defined in `SYSTEM_SETTINGS`, and how are they merged with service settings?

Known Issues and TODOs:
- There are several commented-out sections of code that need to be either removed or uncommented and tested.
- There is a TODO to move a check for user email into a middleware.
- There is a TODO to handle errors when loading web settings.