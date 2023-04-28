Summary:
This file defines a class called WebPage that extends the WebObject class. It contains a constructor that takes a webPage object as a parameter and sets various properties of the WebPage object. It also contains a static method called tidy that takes a webPage object as a parameter and returns a tidied version of it. The file exports the WebPage class.

Import statements:
The file imports the WebObject class from './webObject'.

Script Summary:
The file defines a WebPage class that extends the WebObject class. It contains a constructor that sets various properties of the WebPage object, including its objectType, uid, and url. It also contains a static method called tidy that tidies a webPage object by extracting its url and html properties and returning a new object with a text property that is created by calling the createContext function.

Internal Functions:
- createContext: This function takes an id and metadata object as parameters and returns a string that concatenates the id with the metadata properties. It filters out any metadata properties that are falsy and joins the remaining properties with commas.

External Functions:
The file exports the WebPage class.

Interaction Summary:
The WebPage class extends the WebObject class, so it inherits all of its properties and methods. It also interacts with the createContext function to create a tidied version of a webPage object.

Developer Questions:
- What is the WebObject class and what properties and methods does it have?
- What is the purpose of the tidy method and how is it used?
- What is the createContext function and how is it used?

Known Issues and TODOs:
None.