Filepath: packages/utils/src/jira/models/comment.js
Overview: Summary:
This file defines a JiraComment class that extends JiraObject. It has a constructor that takes in a comment object and tidies it up before passing it to the parent constructor. It also has a static tidy method that takes in a comment object and returns a tidied version of it. The file exports the JiraComment class.

Import statements:
- JiraObject: a class that this file extends from
- createContext: a function that creates a context string for the comment

Script Summary:
This file defines a JiraComment class that extends JiraObject. It has a constructor that takes in a comment object and tidies it up before passing it to the parent constructor. It also has a static tidy method that takes in a comment object and returns a tidied version of it. The file exports the JiraComment class.

Internal Functions:
- tidy(comment): a static method that takes in a comment object and returns a tidied version of it. It removes some unnecessary fields, adds some fields, and converts the body from Jira ADF format to Markdown format. It returns an object with the tidied fields and a text field that contains a context string for the comment.
- createContext(metadata): a function that takes in a metadata object and returns a context string for the comment. The context string contains the author, body, created date, and updated date.

External Functions:
- None

Interaction Summary:
This file defines a JiraComment class that could be used by other parts of the application to represent Jira comments. It extends JiraObject, which could be used to represent other Jira objects. The tidy method could be used to clean up comment objects before passing them to the JiraComment constructor. The createContext function could be used to create context strings for comments.

Developer Questions:
- What other Jira objects does the JiraObject class represent?
- What other methods does the JiraObject class have?
- What other fields could be added to the tidied comment object?
- What other formats could the body field be converted to?
- How is the JiraComment class used in other parts of the application?

