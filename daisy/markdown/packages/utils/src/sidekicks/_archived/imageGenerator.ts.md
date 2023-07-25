Script Purpose and Role:
The purpose of this script is to define and export a sidekick object that contains various properties and methods related to generating prompts for a generative AI called "Midjourney". The sidekick object serves as a configuration for the prompt generation process and provides templates for system and user prompts.

Script Structure:
The script starts with an import statement for the Sidekick type from the 'types' module. It then defines a constant variable named "sidekick" which is an object with several properties and methods. Finally, the sidekick object is exported as the default export of the module.

Import Statements:
- { Sidekick } from 'types': This import statement imports the Sidekick type from the 'types' module. The Sidekick type is likely defined in a separate file and contains the type definition for the sidekick object.

Classes and Functions:
- None

Loops and Conditional Statements:
- None

Variable Usage:
- sidekick: This constant variable is an object that represents the sidekick configuration. It has the following properties:
  - departments: An array of strings representing different departments.
  - label: A string representing the label of the sidekick.
  - value: A string representing the value of the sidekick.
  - placeholder: A string representing the placeholder text for the sidekick.
  - getSystemPromptTemplate: A function that takes a user object as a parameter and returns a string representing the system prompt template.
  - getUserPromptTemplate: A function that takes a query and context as parameters and returns a string representing the user prompt template.
  - contextStringRender: A function that takes a context object as a parameter and returns a string representing the rendered context.

Potential Bugs or Issues:
- None

Summary:
This script defines and exports a sidekick object that contains properties and methods related to generating prompts for a generative AI. The sidekick object serves as a configuration for the prompt generation process and provides templates for system and user prompts. The script does not contain any classes or functions, and there are no loops or conditional statements. The sidekick object is defined as a constant variable and is exported as the default export of the module. There are no known bugs or issues with the script.