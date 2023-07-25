Script Purpose and Role:
The purpose of this script is to define and export a Sidekick object that represents a specific type of sidekick in a software application. The Sidekick object contains various properties and methods related to creating a PRFAQ (Press Release and Frequently Asked Questions) for a new feature or product. This script plays a role in defining the behavior and characteristics of the PRFAQ Creator sidekick within the broader software application.

Script Structure:
The script starts with import statements, followed by the definition of the sidekick object using the Sidekick interface. The sidekick object has properties such as departments, label, value, placeholder, temperature, and maxCompletionTokens. It also has methods like getSystemPromptTemplate, getUserPromptTemplate, and contextStringRender. Finally, the sidekick object is exported as the default export of the script.

Import Statements:
The script imports the Sidekick interface from the 'types' module. The 'types' module likely contains various type definitions used throughout the application. The Sidekick interface is used to define the structure and types of the sidekick object.

Classes and Functions:
There are no classes defined in this script. However, there are several functions defined as properties of the sidekick object:

1. getSystemPromptTemplate(): This function returns a string that represents a system prompt template for creating a PRFAQ. It provides instructions and guidance on how to create a PRFAQ for a new feature or product.

2. getUserPromptTemplate(query, context): This function takes two parameters, query and context, and returns a string that represents a user prompt template for creating a PRFAQ. The query parameter represents the feature idea for which the PRFAQ is being created, and the context parameter provides additional context to help the user write the PRFAQ.

3. contextStringRender(context): This function takes a context parameter and returns a string that represents the rendered context. The rendered context includes the file path and text of the context.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
The script defines a single variable named sidekick, which is of type Sidekick. The sidekick variable is an object that represents the PRFAQ Creator sidekick. It has properties such as departments, label, value, placeholder, temperature, and maxCompletionTokens. These properties store various information related to the sidekick. The sidekick variable is exported as the default export of the script.

Potential Bugs or Issues:
There are no apparent bugs or issues in this script.

Summary:
This script defines and exports a sidekick object that represents the PRFAQ Creator sidekick in a software application. The sidekick object has properties and methods related to creating a PRFAQ for a new feature or product. The script does not contain any classes, but it defines several functions as properties of the sidekick object. The script imports the Sidekick interface from the 'types' module. There are no loops or conditional statements in the script, and the variable usage is limited to a single variable named sidekick. No bugs or issues were identified in the script.