Script Purpose and Role:
The purpose of this script is to define and export a sidekick object that contains various properties and methods related to generating prompts for a generative AI called "Midjourney". The sidekick object serves as a configuration for the prompt generation process and provides templates for system and user prompts.

Script Structure:
The script starts with an import statement for the Sidekick type from the 'types' module. It then defines a constant variable named "sidekick" which is an object with several properties and methods. Finally, the sidekick object is exported as the default export of the module.

Import Statements:
- { Sidekick } from 'types': This import statement imports the Sidekick type from the 'types' module. The Sidekick type is likely a custom type definition that defines the structure and types of the properties and methods of the sidekick object.

Classes and Functions:
- No classes or functions are defined in this script. Instead, the sidekick object is defined as a constant variable with properties and methods.

Properties and Methods of the sidekick Object:
- departments: This property is an array of strings that represents the different departments related to the prompt generation process.
- label: This property is a string that represents the label or name of the prompt generator, in this case, "Image Prompt Creator".
- value: This property is a string that represents the value or identifier of the prompt generator, in this case, "imageGenerator".
- placeholder: This property is a string that represents a placeholder text for the prompt generator.
- getSystemPromptTemplate: This method is a function that takes a user object as a parameter and returns a string. It generates a system prompt template for the AI to visualize and returns it as a string.
- getUserPromptTemplate: This method is a function that takes a query and a context object as parameters and returns a string. It generates a user prompt template for the AI to generate an image based on the given query and context, and returns it as a string.
- contextStringRender: This method is a function that takes a context object as a parameter and returns a string. It renders the context object as a string.

Loops and Conditional Statements:
- There are no loops or conditional statements in this script.

Variable Usage:
- The script uses a constant variable named "sidekick" to define the sidekick object. The properties and methods of the sidekick object are accessed and used throughout the script.

Potential Bugs or Issues:
- There are no apparent bugs or issues in this script.

Summary:
This script defines and exports a sidekick object that serves as a configuration for generating prompts for a generative AI. The sidekick object contains properties and methods related to the prompt generation process, including department information, label, value, placeholder, and template generation methods. The script does not define any classes or functions, but instead uses a constant variable to define the sidekick object. There are no apparent bugs or issues in the script.