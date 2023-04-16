Filepath: packages/utils/src/auth/syncAppSettings.ts
Overview: Summary:
This file contains functions related to syncing application settings for a user or organization. It imports types, a database connection, and other functions related to building and updating settings.

Import statements:
- types: Contains type definitions for User and Organization.
- db/dist: Contains the database connection.
- buildSettings: A function that builds application settings based on user and organization data.
- SYSTEM_SETTINGS: A constant containing default system settings.

Script Summary:
The syncAppSettings function takes in a userId and organizationId (optional) and returns updated application settings for the user or organization. It first checks if a userId is provided, and if not, it returns the default SYSTEM_SETTINGS. If a userId is provided, it retrieves the user data from the database and checks if an organizationId is provided. If an organizationId is provided, it retrieves the organization data from the database and updates the organization's appSettings. If an organizationId is not provided, it creates a new organization and connects the user to it, then updates the user's appSettings.

Internal Functions:
- updateUserSettings: Updates the user's appSettings in the database based on their data.
- updateOrgSettings: Updates the organization's appSettings in the database based on the user and organization data.

External Functions:
- syncAppSettings: The main function that updates application settings for a user or organization.

Interaction Summary:
This file interacts with the database to retrieve and update user and organization data. It also interacts with the buildSettings function to generate updated application settings.

Developer Questions:
- What other files or components interact with this file?
- What are the specific permissions and ownership checks that need to be implemented?
- How can this function be optimized for performance?
- What happens if the database connection fails or is unavailable?

