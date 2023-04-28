Summary:
This file contains a class called JiraIssue which extends another class called JiraObject. It also contains a function called createContext. The JiraIssue class has a constructor and a static method called tidy.

Import statements:
This file imports JiraObject from './jiraObject'.

Script Summary:
This file exports a class called JiraIssue which extends JiraObject. It also exports a function called createContext.

Internal Functions:
- tidy(issue): This is a static method of the JiraIssue class. It takes an issue object as a parameter, extracts relevant information from it, and returns an object with the extracted information. The returned object also has a 'text' property which is created by calling the createContext function with the issue key and the extracted information as parameters.

- createContext(id, metadata): This function takes an id and a metadata object as parameters. It creates a string by concatenating the id and the metadata object's key-value pairs. It then returns the concatenated string.

External Functions:
This file exports a class called JiraIssue and a function called createContext.

Interaction Summary:
This file does not interact with any other files or third-party libraries directly. However, the JiraIssue class extends the JiraObject class, which may interact with other parts of the application.

Developer Questions:
- What is the JiraObject class and what methods does it have?
- What is the purpose of the createContext function?
- What is the structure of the issue object that is passed to the tidy method?

Known Issues and TODOs:
There are no known issues or TODOs for this file.