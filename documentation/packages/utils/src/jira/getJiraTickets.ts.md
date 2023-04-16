Filepath: packages/utils/src/jira/getJiraTickets.ts
Overview: Summary:
This file contains a function called "getJiraTickets" which retrieves Jira tickets from a Jira server using a JQL query. It uses the JiraClient class from another file to make API calls to the Jira server.

Import statements:
- JiraIssue: a type definition for a Jira issue
- JiraClient: a class for making API calls to a Jira server

Script Summary:
The "getJiraTickets" function takes in a JiraClient object, a JQL query string, and optional parameters for pagination. It first retrieves a small batch of tickets to get the total count of tickets matching the JQL query. It then retrieves all tickets in batches using the maxResults and startAt parameters until all tickets have been retrieved.

Internal Functions:
None

External Functions:
- getJiraTickets: retrieves Jira tickets from a Jira server using a JQL query. Returns a Promise that resolves to an array of JiraIssue objects.

Interaction Summary:
This file interacts with the Jira server through the JiraClient class to retrieve Jira tickets. It may be used by other parts of the application that need to retrieve Jira tickets based on a JQL query.

Developer Questions:
- What is the expected format of the JQL query string?
- What is the expected format of the JiraIssue object?
- How does pagination work in this function?
- What is the expected behavior if there are errors retrieving Jira tickets?

