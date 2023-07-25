Summary:
This code defines a class called `ConfluencePage` that extends another class called `ConfluenceObject`. The purpose of this script is to represent a Confluence page and provide methods to manipulate and interact with it. The script includes a static method called `tidy` that cleans up the page data and formats it for use in the class. There is also a helper function called `createContext` that generates a string representation of the page's metadata. The script exports the `ConfluencePage` class as the default export.

Import statements:
- `ConfluenceObject`: This import statement imports the `ConfluenceObject` class from a file called `confluenceObject.js`. This class is used as the base class for the `ConfluencePage` class.

Script Summary:
The script defines a class called `ConfluencePage` that extends the `ConfluenceObject` class. The class has a constructor that takes a `page` object as a parameter. The constructor calls the `tidy` method to clean up the page data and then calls the parent class's constructor with the tidied page data. It also sets the `objectType` and `uid` properties of the `object` property.

The script also defines a static method called `tidy` that takes a `page` object as a parameter. This method extracts the `id`, `title`, and `body` properties from the `page` object. It then creates an `attrs` object with the `objectType` set to 'Confluence Page', the `title` converted to lowercase, and the `text` property set to the result of calling the `confluenceToMarkdown` method with the `body` as a parameter. The method then returns a new object that combines the `attrs` object with the `text` property set to the result of calling the `createContext` function with the `id` and `attrs` as parameters.

The script also defines a helper function called `createContext` that takes an `id` and `metadata` object as parameters. The function creates a string representation of the metadata by concatenating the `id` with the keys and values of the `metadata` object. It filters out any keys with falsy values and maps each key-value pair to a string in the format of "{key} is {value}". The function then joins the strings with commas and returns the resulting string.

External Functions:
- None

Internal Functions:
- `createContext`: This function takes an `id` and `metadata` object as parameters. It creates a string representation of the metadata by concatenating the `id` with the keys and values of the `metadata` object. It filters out any keys with falsy values and maps each key-value pair to a string in the format of "{key} is {value}". The function then joins the strings with commas and returns the resulting string.

Interaction Summary:
The `ConfluencePage` class can be used to represent and manipulate Confluence pages within a broader software application. It provides methods to clean up and format page data, as well as generate a string representation of the page's metadata. Other parts of the application can create instances of the `ConfluencePage` class and use its methods to work with Confluence pages.

Developer Questions:
- How can I create an instance of the `ConfluencePage` class?
- What methods are available on the `ConfluencePage` class?
- How can I access the metadata of a `ConfluencePage` instance?
- How can I modify the `ConfluencePage` class to add new functionality?