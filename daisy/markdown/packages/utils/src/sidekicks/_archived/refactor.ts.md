Script Purpose and Role:
The purpose of this script is to define a Sidekick object for a code refactoring assistant within a broader software application. The Sidekick object contains properties and methods related to the code refactoring functionality. This script serves as a configuration file for the refactoring assistant, providing information about the assistant's capabilities and behavior.

Script Structure:
The script starts with an import statement for the "Sidekick" type from the "types" module. It then defines a constant variable named "refactor" which is of type "Sidekick". The "refactor" object contains properties and methods related to the code refactoring assistant. Finally, the "refactor" object is exported as the default export of the script.

Import Statements:
- The script imports the "Sidekick" type from the "types" module. This import statement allows the script to use the "Sidekick" type for defining the "refactor" object.

Classes and Functions:
- The script does not define any classes or functions. Instead, it defines an object literal named "refactor" which contains properties and methods.

Properties of the "refactor" Object:
- departments: An array of strings representing the departments that the code refactoring assistant belongs to. In this case, it only belongs to the "engineering" department.
- label: A string representing the label or title of the code refactoring assistant. In this case, it is set to 'Refactoring Expert'.
- value: A string representing the value or identifier of the code refactoring assistant. In this case, it is set to 'refactor'.
- placeholder: A string representing the placeholder text for the code refactoring assistant. In this case, it is set to 'I can create refactor code for you'.
- getSystemPromptTemplate: A function that returns a string representing the system prompt template for the code refactoring assistant. It does not take any parameters and always returns the same string: 'You are a code refactoring assistant.'.
- getUserPromptTemplate: A function that takes two parameters: 'query' (a string) and 'context' (an object). It returns a string representing the user prompt template for the code refactoring assistant. The returned string includes the 'query' and 'context' values provided as parameters, formatted in a specific way.
- contextStringRender: A function that takes one parameter: 'context' (an object). It returns a string representing the rendered context for the code refactoring assistant. The returned string includes the 'filePath', 'url', 'code', and 'text' properties of the 'context' object, formatted in a specific way.

Interaction Summary:
This script defines the behavior and properties of a code refactoring assistant within a broader software application. It provides templates for system and user prompts, as well as a rendered context string. The code refactoring assistant can be used to assist users in refactoring code files by providing step-by-step instructions and explanations.

Developer Questions:
- How can I customize the departments that the code refactoring assistant belongs to?
- Can I change the label and value of the code refactoring assistant?
- How can I modify the system and user prompt templates?
- What properties are available in the 'context' object passed to the 'getUserPromptTemplate' and 'contextStringRender' functions?
- Can I add additional properties or methods to the 'refactor' object?