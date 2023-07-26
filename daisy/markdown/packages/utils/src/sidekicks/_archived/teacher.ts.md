Script Purpose and Role:
This script defines a TypeScript module that exports a constant object named "teacher". This object represents a sidekick character in a software application. The purpose of this script is to provide a template for creating a teacher sidekick with specific properties and methods. The role of this script within the broader software application is to define the behavior and characteristics of the teacher sidekick, which can be used in other parts of the application.

Script Structure:
The script starts with import statements, followed by the definition of the "teacher" object using TypeScript syntax. Finally, the "teacher" object is exported as the default export of the module.

Import Statements:
The script imports a single entity, the "Sidekick" type, from the "types" module. The "Sidekick" type is likely defined in another file and is used to ensure type safety when defining the "teacher" object.

Classes and Functions:
There are no classes defined in this script. Instead, the script defines an object literal named "teacher" with several properties and methods.

- departments: This property is an array of strings representing the departments the teacher belongs to.

- label: This property is a string representing the label or name of the teacher.

- value: This property is a string representing the value associated with the teacher.

- placeholder: This property is a string representing a placeholder text for the teacher.

- getSystemPromptTemplate: This method is a function that returns a string. It provides a system prompt template for the teacher.

- getUserPromptTemplate: This method is a function that takes two parameters, "query" and "context", and returns a string. It provides a user prompt template for the teacher, incorporating the query and context.

- contextStringRender: This method is a function that takes a "context" parameter and returns a string. It renders the context information in a specific format.

Review of Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
The script uses variables to define the properties and methods of the "teacher" object. The variables are appropriately named and used within the context of the object.

Potential Bugs or Issues:
There are no apparent bugs or issues in this script.

Summary:
This script defines a teacher sidekick object with specific properties and methods. It exports the teacher object as the default export of the module. The script imports the "Sidekick" type from the "types" module to ensure type safety. The teacher object represents a teacher sidekick in the software application and provides templates for system and user prompts. The script is well-structured and does not contain any loops or conditional statements. There are no known bugs or issues with this component.