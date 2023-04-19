Summary:
This file contains a JiraComment class that extends a JiraObject class. It includes a static tidy function that formats a comment object and a createContext function that creates a string with metadata about the comment. The JiraComment constructor calls the tidy function and sets the object type and UID for the comment.

Import statements:
The file imports a JiraObject class from './jiraObject'.

Script Summary:
The JiraComment class extends the JiraObject class and includes a static tidy function that formats a comment object and a createContext function that creates a string with metadata about the comment. The JiraComment constructor calls the tidy function and sets the object type and UID for the comment.

Internal Functions:
- tidy(comment): This static function takes a comment object and formats it by deleting certain fields, adding new fields, and converting the body from Jira ADF format to markdown. It returns an object with the formatted fields and a text field created by calling the createContext function.
- createContext(metadata): This function takes a metadata object and creates a string with information about the comment author, body, created date, and updated date. It returns the string.

External Functions:
- JiraComment(comment): This constructor takes a comment object, calls the tidy function to format it, and sets the object type and UID for the comment.

Interaction Summary:
This file interacts with other Jira-related files in the application, such as the JiraObject class. It may also interact with a third-party library or API for converting Jira ADF format to markdown.

Developer Questions:
- What fields are deleted in the tidy function, and why?
- What is the Jira ADF format, and how is it converted to markdown?
- What other Jira-related files does this file interact with?
- What third-party library or API is used for converting Jira ADF format to markdown?