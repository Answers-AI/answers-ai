Summary:
This file exports a class called ConfluencePage which extends another class called ConfluenceObject. It also defines a function called createContext. The ConfluencePage class has a constructor that takes a page object as an argument, tidies it up using the tidy function, and then passes it to the constructor of the ConfluenceObject class. The tidy function extracts relevant information from the page object and returns a new object with the extracted information and some additional properties. The createContext function takes an id and metadata object as arguments and returns a string that represents the context of the object.

Import statements:
The file imports ConfluenceObject from './confluenceObject'. It is not clear what this module does or where it comes from.

Script Summary:
This file defines a class called ConfluencePage and a function called createContext. The ConfluencePage class extends another class called ConfluenceObject and has a constructor that takes a page object as an argument. The constructor tidies up the page object using the tidy function and then passes it to the constructor of the ConfluenceObject class. The tidy function extracts relevant information from the page object and returns a new object with the extracted information and some additional properties. The createContext function takes an id and metadata object as arguments and returns a string that represents the context of the object.

Internal Functions:
- tidy(page): This function takes a page object as an argument and returns a new object with the following properties:
  - objectType: A string that represents the type of object (always 'Confluence Page').
  - title: A string that represents the title of the page in lowercase (or null if the original title was null).
  - text: A string that represents the body of the page in markdown format (converted from Confluence format using the confluenceToMarkdown function).
  - text: The text property is then replaced with the result of calling the createContext function with the id and attrs properties as arguments.

- createContext(id, metadata): This function takes an id and metadata object as arguments and returns a string that represents the context of the object. The string is constructed by concatenating the id with a list of key-value pairs from the metadata object. Each key-value pair is separated by a comma and a space.

External Functions:
None.

Interaction Summary:
This file exports a class that extends another class, so it is likely that instances of this class will be created and used elsewhere in the application. It is not clear what other parts of the application might interact with this file.

Developer Questions:
- What is the ConfluenceObject class and how is it used?
- What is the confluenceToMarkdown function and where is it defined?
- What other parts of the application might interact with this file?

Known Issues and TODOs:
None.