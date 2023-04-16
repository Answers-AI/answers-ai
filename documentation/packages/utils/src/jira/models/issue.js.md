Filepath: packages/utils/src/jira/models/issue.js
Overview: Summary:
This file defines a JiraIssue class that extends the JiraObject class. It also defines a static tidy method that takes an issue object and returns a tidied version of it. The tidied issue object is then passed to the JiraObject constructor. The createContext function is also defined in this file and is used to create a text description of the issue object.

Import statements:
The file imports the JiraObject class from './jiraObject'.

Script Summary:
The JiraIssue class extends the JiraObject class and defines a constructor that tidies the issue object and sets some properties on the JiraObject instance. The static tidy method takes an issue object and returns a tidied version of it. The createContext function is used to create a text description of the issue object.

Internal Functions:
- tidy(issue): This static method takes an issue object and returns a tidied version of it. It extracts relevant fields from the issue object and returns an object with those fields.
- createContext(id, metadata): This function takes an id and a metadata object and returns a text description of the metadata object.

External Functions:
- JiraIssue(issue): This is the constructor for the JiraIssue class. It takes an issue object and creates a new JiraIssue instance.

Interaction Summary:
This file defines a class that is used to represent Jira issues in the application. It extends the JiraObject class and is used to create JiraObject instances. The tidied issue object is passed to the JiraObject constructor, which sets some properties on the JiraObject instance. The createContext function is used to create a text description of the issue object.

Developer Questions:
- What other classes extend the JiraObject class?
- What other properties can be set on the JiraObject instance?
- What other methods are defined on the JiraObject class?
- What other methods are defined on the JiraIssue class?
- What is the purpose of the createContext function?
- What is the format of the text description created by the createContext function?
- What other files interact with this file?

