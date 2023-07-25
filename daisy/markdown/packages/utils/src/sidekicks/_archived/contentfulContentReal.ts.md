Script Purpose and Role:
The purpose of this script is to define and export a sidekick object that represents a contentful entry. This sidekick object contains various properties and methods related to contentful entries, such as departments, label, value, placeholder, and prompt templates. The script's role within the broader software application is to provide a reusable and configurable sidekick object that can be used in different parts of the application to assist users in publishing content in Contentful.

Script Structure:
The script starts with import statements, followed by the definition of the sidekick object using TypeScript syntax. The sidekick object has properties and methods defined within it. Finally, the sidekick object is exported as the default export of the script.

Import Statements:
The script imports the Sidekick type from the 'types' module. The Sidekick type is used to define the type of the sidekick object.

Classes and Functions:
There are no classes defined in this script. However, there are several functions defined as properties of the sidekick object:

1. getSystemPromptTemplate: This function takes no parameters and returns a string. It generates and returns a system prompt template for the sidekick object.

2. getUserPromptTemplate: This function takes two parameters, query and context, and returns a string. It generates and returns a user prompt template for the sidekick object. The query parameter represents the changes to be made to a blog post, and the context parameter represents the context in which the prompt is being generated.

3. contextStringRender: This function takes one parameter, context, and returns a string. It generates and returns a context string for the sidekick object. The context parameter represents the context in which the string is being rendered.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
The script defines a single variable named sidekick, which is of type Sidekick. The sidekick object has several properties, such as departments, label, value, placeholder, and prompt templates. These properties are used to configure and customize the behavior of the sidekick object.

Potential Bugs or Issues:
There are no apparent bugs or issues in this script.

Summary:
This script defines and exports a sidekick object that represents a contentful entry. The sidekick object has properties and methods related to contentful entries, such as departments, label, value, placeholder, and prompt templates. The script's role within the broader software application is to provide a reusable and configurable sidekick object that can be used in different parts of the application to assist users in publishing content in Contentful. The script does not contain any loops or conditional statements. The variable usage is straightforward, with a single variable named sidekick. There are no apparent bugs or issues in the script.