Summary:
This file contains the JiraIssue class, which extends the JiraObject class and provides a tidy method to format Jira issues. It also includes a createContext function to create a string representation of the issue and its metadata.

Import statements:
- JiraObject: a class to represent Jira objects

Script Summary:
- JiraIssue class: extends JiraObject and provides a tidy method to format Jira issues
- tidy method: formats Jira issues by extracting relevant fields and returning them as an object
- createContext function: creates a string representation of the issue and its metadata

Internal Functions:
- tidy: formats Jira issues by extracting relevant fields and returning them as an object
  - Parameters: issue (object) - the Jira issue to format
  - Returns: an object with formatted Jira issue fields
- createContext: creates a string representation of the issue and its metadata
  - Parameters: id (string) - the Jira issue key, metadata (object) - the Jira issue metadata
  - Returns: a string representation of the issue and its metadata

External Functions:
- JiraIssue: a class to represent Jira issues
  - Constructor Parameters: issue (object) - the Jira issue to represent
  - Properties: object (object) - the Jira issue object with formatted fields, vectors (array) - an array of vectors associated with the issue
  - Methods: none

Interaction Summary:
This file interacts with the JiraObject class and potentially with other Jira-related files in the application. It may also interact with a third-party Jira API to retrieve and format Jira issues.

Developer Questions:
- What other Jira-related files does this file interact with?
- What is the purpose of the JiraObject class?
- How does the createContext function work?
- What third-party Jira API does this file potentially interact with?