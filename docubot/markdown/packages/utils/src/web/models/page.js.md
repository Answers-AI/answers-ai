Summary:
This file defines a WebPage class that extends a WebObject class. It also includes a tidy function and a createContext function.

Import statements:
The file imports the WebObject class from './webObject'.

Script Summary:
The WebPage class constructor takes a webPage object and creates a tidiedPage object using the tidy function. It then calls the super constructor with the tidiedPage object and sets some properties on the object. The tidy function takes a webPage object and extracts the url and html properties. It then creates an attrs object with the objectType, url, and content properties. The content property is created by calling the webToMarkdown function from the WebObject class. The tidy function returns an object with a text property that is created by calling the createContext function with the attrs object. The createContext function takes an id and a metadata object and creates a string that includes the id and all the metadata properties.

Internal Functions:
- tidy: takes a webPage object and returns a tidied object with a text property
- createContext: takes an id and a metadata object and returns a string

External Functions:
- WebPage: a class that extends WebObject

Interaction Summary:
This file interacts with the WebObject class and potentially with other classes that extend the WebObject class. It may also interact with third-party libraries if the webToMarkdown function from the WebObject class uses a third-party library.

Developer Questions:
- What other classes extend the WebObject class?
- What third-party libraries does the webToMarkdown function use?
- What other properties can be included in the metadata object passed to the createContext function?