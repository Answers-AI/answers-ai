Summary:
This file defines the ConfluencePage class, which extends the ConfluenceObject class. It also includes a static tidy() method and a createContext() function.

Import statements:
The file imports the ConfluenceObject class from './confluenceObject'.

Script Summary:
The ConfluencePage class is defined, which takes a page object as a parameter and creates a tidiedPage object using the static tidy() method. The ConfluenceObject constructor is called with the tidiedPage object as a parameter, and the object's objectType and uid properties are set. The static tidy() method takes a page object as a parameter and returns a tidied object with the objectType, title, and text properties. The text property is created using the createContext() function, which takes the page's id and metadata as parameters and returns a string.

Internal Functions:
- tidy(page): This static method takes a page object as a parameter and returns a tidied object with the objectType, title, and text properties. The text property is created using the createContext() function.
- createContext(id, metadata): This function takes the page's id and metadata as parameters and returns a string that includes the id and metadata properties.

External Functions:
None.

Interaction Summary:
This file defines the ConfluencePage class, which is used to represent Confluence pages in the application. It extends the ConfluenceObject class, which is also used to represent Confluence objects. The file could potentially interact with other parts of the application that deal with Confluence objects, such as the ConfluenceSpace class.

Developer Questions:
- What other classes or files interact with the ConfluencePage class?
- What is the ConfluenceObject class used for?
- What is the format of the page object that is passed to the ConfluencePage constructor?
- What is the format of the tidied object that is returned by the tidy() method?
- What is the purpose of the createContext() function?