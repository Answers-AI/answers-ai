Summary:
This file defines a class called WebPage that extends another class called WebObject. It exports the WebPage class as the default export. The WebPage class has a constructor that takes a webPage object as an argument and sets some properties on the object. It also has a static method called tidy that takes a webPage object as an argument and returns a tidied version of the object. The file also defines a function called createContext that takes an id and metadata object as arguments and returns a string.

Import statements:
The file imports the WebObject class from another file called webObject.

Script Summary:
The file defines a WebPage class that extends the WebObject class. The WebPage class has a constructor that takes a webPage object as an argument and sets some properties on the object. It also has a static method called tidy that takes a webPage object as an argument and returns a tidied version of the object. The file also defines a function called createContext that takes an id and metadata object as arguments and returns a string.

Internal Functions:
- createContext: This function takes an id and metadata object as arguments and returns a string. The function concatenates the id with each key-value pair in the metadata object that has a truthy value. It returns the concatenated string.

External Functions:
- None

Interaction Summary:
This file defines a class that extends another class and exports the WebPage class as the default export. It does not interact with any other parts of the application.

Developer Questions:
- What is the WebObject class and how does it relate to the WebPage class?
- What is the purpose of the tidy method and how is it used?
- What is the createContext function used for and where is it used in the codebase?

Known Issues and TODOs:
- None