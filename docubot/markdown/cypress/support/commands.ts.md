Summary:
This file contains a custom Cypress command for logging in a user using a default test user. It interacts with the application by visiting a specific URL and typing in an API key.

Import statements:
None

Script Summary:
This script adds a custom Cypress command called "login" that logs in a user using a default test user. It retrieves an API key from the environment variables, visits a specific URL, and types in the API key.

Internal Functions:
None

External Functions:
- login(): a custom Cypress command that logs in a user using a default test user. It retrieves an API key from the environment variables, visits a specific URL, and types in the API key.

Interaction Summary:
This file interacts with the Cypress testing framework and the application being tested. It uses Cypress commands to visit a specific URL and type in an API key to log in a user.

Developer Questions:
- Where is the API key being stored and how is it being retrieved?
- What happens if the login URL or input field ID changes?

Known Issues and TODOs:
None