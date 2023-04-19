Summary:
This file defines a class called WebPage that extends another class called WebObject. It also exports the WebPage class. The class has a constructor that takes a webPage object and sets some properties on the object. It also has a static method called tidy that takes a webPage object and returns a tidied version of it.

Import statements:
The file imports a class called WebObject from another file in the same directory.

Script Summary:
The file defines a class called WebPage that extends another class called WebObject. The class has a constructor that takes a webPage object and sets some properties on the object. It also has a static method called tidy that takes a webPage object and returns a tidied version of it.

Internal Functions:
- createContext: a function that takes an id and metadata object and returns a string that describes the metadata. It concatenates the id with each key-value pair in the metadata object that has a truthy value.

External Functions:
None.

Interaction Summary:
This file is part of a larger application that likely uses the WebPage class to represent web pages. The application may use the WebObject class as well. Other parts of the application may create instances of the WebPage class and pass them around to other parts of the application.

Developer Questions:
- What is the WebObject class and how is it used?
- What other classes or functions depend on the WebPage class?
- What is the purpose of the createContext function and where is it used?