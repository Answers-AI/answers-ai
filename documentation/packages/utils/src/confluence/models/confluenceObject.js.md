Filepath: packages/utils/src/confluence/models/confluenceObject.js
Overview: Summary:
This file defines a class called ConfluenceObject that extends another class called AnswersObject. It also contains a static method called confluenceHtmlToMarkdown that converts Confluence HTML to Markdown.

Import statements:
The file imports AnswersObject from '../../core/models/answersObject'.

Script Summary:
The ConfluenceObject class extends the AnswersObject class and defines a static method called confluenceHtmlToMarkdown that converts Confluence HTML to Markdown.

Internal Functions:
- constructor(object): This is the constructor for the ConfluenceObject class. It takes an object as a parameter and calls the constructor of the AnswersObject class with that object.
- confluenceHtmlToMarkdown(node): This is a static method of the ConfluenceObject class. It takes a node as a parameter and converts it from Confluence HTML to Markdown. It returns a string.

External Functions:
None.

Interaction Summary:
This file defines a class that is used to represent Confluence objects in the application. The confluenceHtmlToMarkdown method is used to convert Confluence HTML to Markdown, which is used in various parts of the application.

Developer Questions:
- What is the AnswersObject class and how is it used in the application?
- What other parts of the application use the confluenceHtmlToMarkdown method?
- Are there any third-party libraries or APIs used in this file?

