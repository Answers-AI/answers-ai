Summary:
This file contains the JiraThread class which extends the JiraObject class. It also includes a static tidy function and a createContext function. The JiraThread class has a getVectors function that returns an array of vectors.

Import statements:
The file imports the JiraObject class from './jiraObject'.

Script Summary:
The JiraThread class is defined with a constructor that takes a thread object as a parameter. The constructor calls the static tidy function to clean up the thread object and then calls the constructor of the parent JiraObject class with the tidied thread object. The object's uid property is set to the issueKey of the thread object.

The static tidy function takes a thread object as a parameter and returns a tidied object with lowercase id, issueKey, and project properties. The text property is either set to the text property of the thread object or to the result of calling the createContext function with the thread object and the jiraAdfToMarkdown function.

The getVectors function chunks the comments of the object into arrays of 10 comments per chunk and creates a vector object for each chunk. The vector object has an id property set to the id of the thread object, a text property set to the result of calling the createContext function with the chunk of comments and the jiraAdfToMarkdown function, and no issueKey property.

The createContext function takes a metadata object and a jiraAdfToMarkdown function as parameters and returns a string that concatenates the author, body, updated, self, and issueKey properties of each comment in the metadata object's comments array.

Internal Functions:
- tidy(thread): takes a thread object and returns a tidied object with lowercase id, issueKey, and project properties. The text property is either set to the text property of the thread object or to the result of calling the createContext function with the thread object and the jiraAdfToMarkdown function.
- createContext(metadata, jiraAdfToMarkdown): takes a metadata object and a jiraAdfToMarkdown function as parameters and returns a string that concatenates the author, body, updated, self, and issueKey properties of each comment in the metadata object's comments array.

External Functions:
- JiraThread(thread): constructor that takes a thread object as a parameter and creates a JiraThread object.
- getVectors(): returns an array of vector objects.

Interaction Summary:
This file interacts with the JiraObject class and potentially with the jiraAdfToMarkdown function. It also interacts with the rest of the application by providing a JiraThread object that can be used to represent a Jira comments thread.

Developer Questions:
- What is the JiraObject class and how does it relate to the JiraThread class?
- What is the jiraAdfToMarkdown function and where is it defined?
- How are JiraThread objects used in the rest of the application?
- What is the purpose of the getVectors function and how is it used?