Filepath: packages/utils/src/jira/models/thread.js
Overview: Summary:
This file contains the JiraThread class which extends the JiraObject class. It has a constructor, a static tidy() method, and a getVectors() method. It also has an external createContext() function. The file exports the JiraThread class.

Import statements:
The file imports the JiraObject class from './jiraObject'.

Script Summary:
The JiraThread class is used to represent a Jira comments thread. It has a constructor that takes a thread object, tidies it up using the tidy() method, and passes it to the parent JiraObject constructor. The tidy() method formats the thread object and returns a new object with the desired properties. The getVectors() method chunks the comments into groups of 10 and returns an array of vectors. The createContext() function creates a context string for the thread.

Internal Functions:
- constructor(thread)
  - Parameters: thread (object) - the thread object to be tidied and passed to the parent constructor
  - Returns: nothing
  - Description: constructs a new JiraThread object by tidying up the thread object and passing it to the parent constructor

- static tidy(thread)
  - Parameters: thread (object) - the thread object to be tidied
  - Returns: an object with the following properties:
    - id (string) - the thread id in lowercase
    - issueKey (string) - the issue key in lowercase
    - project (string) - the project key in lowercase
    - text (string) - the thread text or a context string created using the createContext() function
  - Description: tidies up the thread object by formatting its properties and returns a new object with the desired properties

- getVectors()
  - Parameters: none
  - Returns: an array of vectors, where each vector is an object with the following properties:
    - id (string) - the thread id
    - text (string) - the thread text or a context string created using the createContext() function
  - Description: chunks the comments into groups of 10 and returns an array of vectors

External Functions:
- createContext(metadata, jiraAdfToMarkdown)
  - Parameters: 
    - metadata (object) - the metadata object containing the comments array and the issueKey property
    - jiraAdfToMarkdown (function) - a function that converts Jira ADF to Markdown
  - Returns: a context string for the thread
  - Description: creates a context string for the thread by iterating over the comments array and formatting each comment

Interaction Summary:
This file interacts with the JiraObject class, which it extends. It also uses the createContext() function, which is an external function. The file exports the JiraThread class, which can be used by other parts of the application to represent Jira comments threads.

Developer Questions:
- What is the JiraObject class and how does it relate to the JiraThread class?
- What is the createContext() function and how is it used?
- What is the purpose of the getVectors() method and how is it used?
- How are the comments chunked in the getVectors() method?
- What is the format of the thread object passed to the constructor?
- What is the format of the object returned by the tidy() method?
- What is the purpose of the project property in the object returned by the tidy() method?
- What is the purpose of the uid property in the object passed to the parent constructor?
- What is the purpose of the id property in the vectors returned by the getVectors() method?

