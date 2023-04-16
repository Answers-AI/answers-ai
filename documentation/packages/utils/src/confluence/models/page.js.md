Filepath: packages/utils/src/confluence/models/page.js
Overview: Summary:
This file defines a class called ConfluencePage that extends another class called ConfluenceObject. It also defines a function called createContext. The class constructor takes a page object as a parameter, tidies it up, and sets some properties on the ConfluencePage object. The static tidy function takes a page object as a parameter, extracts some properties from it, and returns a new object with those properties and some additional properties. The createContext function takes an id and a metadata object as parameters, creates a string based on those parameters, and returns the string.

Import statements:
The file imports the ConfluenceObject class from './confluenceObject'.

Script Summary:
The file defines a ConfluencePage class that extends the ConfluenceObject class. It also defines a static tidy function and a createContext function. The ConfluencePage constructor takes a page object as a parameter, tidies it up, and sets some properties on the ConfluencePage object. The static tidy function takes a page object as a parameter, extracts some properties from it, and returns a new object with those properties and some additional properties. The createContext function takes an id and a metadata object as parameters, creates a string based on those parameters, and returns the string. The file exports the ConfluencePage class.

Internal Functions:
- createContext: takes an id and a metadata object as parameters, creates a string based on those parameters, and returns the string.

External Functions:
None.

Interaction Summary:
This file defines a class that extends another class, so it could potentially interact with other classes that extend the same base class. It also defines a function that could be used by other parts of the application to create a context string.

Developer Questions:
- What is the ConfluenceObject class and how does it relate to the ConfluencePage class?
- What is the structure of the page object that the ConfluencePage constructor and tidy function expect?
- What is the structure of the object that the createContext function expects as the metadata parameter?
- What is the purpose of the createContext function and where is it used in the application?

