Filepath: packages/utils/src/web/models/page.js
Overview: Summary:
This file defines a WebPage class that extends a WebObject class. It also exports the WebPage class. The class constructor takes a webPage object as a parameter, tidies it using a static tidy method, and sets properties of the WebPage object. The tidy method extracts the url and html properties from the webPage object, creates an attrs object with objectType, url, and content properties, and returns a text object with the attrs object passed to a createContext function. The createContext function creates a string with the id and metadata properties of the webPage object.

Import statements:
The file imports a WebObject class from './webObject'.

Script Summary:
The file defines a WebPage class that extends a WebObject class. It exports the WebPage class. The class constructor takes a webPage object as a parameter, tidies it using a static tidy method, and sets properties of the WebPage object. The tidy method extracts the url and html properties from the webPage object, creates an attrs object with objectType, url, and content properties, and returns a text object with the attrs object passed to a createContext function. The createContext function creates a string with the id and metadata properties of the webPage object.

Internal Functions:
- createContext: takes an id and metadata object as parameters and returns a string with the id and metadata properties of the webPage object.

External Functions:
- WebPage: a class that extends a WebObject class. It takes a webPage object as a parameter, tidies it using a static tidy method, and sets properties of the WebPage object.

Interaction Summary:
This file defines a WebPage class that extends a WebObject class. It exports the WebPage class, which could be used by other parts of the application to create WebPage objects. The WebPage class constructor takes a webPage object as a parameter, which could be passed from other parts of the application. The tidy method extracts the url and html properties from the webPage object, which could be set by other parts of the application. The createContext function creates a string with the id and metadata properties of the webPage object, which could be used by other parts of the application to display information about the WebPage object.

Developer Questions:
- What is the WebObject class and how does it relate to the WebPage class?
- What properties does the webPage object passed to the WebPage constructor need to have?
- What is the createContext function used for and how is it used in the WebPage class?
- How is the WebPage class used in other parts of the application?

