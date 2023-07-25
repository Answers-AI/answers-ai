Script Purpose and Role:
This script defines a TypeScript module that exports a constant object named "teacher". This object represents a sidekick character in a software application. The purpose of this script is to provide a template for creating a teacher sidekick with specific properties and methods. The role of this script within the broader software application is to define the behavior and characteristics of the teacher sidekick, which can be used in other parts of the application.

Script Structure:
The script starts with import statements, followed by the definition of the "teacher" object using TypeScript syntax. Finally, the "teacher" object is exported as the default export of the module.

Import Statements:
The script imports a single entity named "Sidekick" from a module named "types". The "Sidekick" type is likely defined in the "types" module and is used to specify the type of the "teacher" object.

Classes and Functions:
There are no classes defined in this script. Instead, the script defines an object named "teacher" with the following properties and methods:

- departments: An array of strings representing the departments the teacher belongs to.
- label: A string representing the label or name of the teacher.
- value: A string representing the value associated with the teacher.
- placeholder: A string representing a placeholder text for the teacher.
- getSystemPromptTemplate: A function that takes no parameters and returns a string. This function returns a template string describing the teacher as someone who can explain things easily and step by step.
- getUserPromptTemplate: A function that takes two parameters (query and context) and returns a string. This function returns a template string describing the teacher and asking the user to explain a given context. The query and context parameters are interpolated into the template string.
- contextStringRender: A function that takes one parameter (context) and returns a string. This function returns a template string representing the context information of the teacher. The context parameter is interpolated into the template string.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
The script uses the following variables:

- teacher: A constant object representing the teacher sidekick. It is assigned an object with various properties and methods.

Potential Bugs or Issues:
There are no apparent bugs or issues with this script.

Summary:
This script defines a teacher sidekick object with specific properties and methods. It exports this object as the default export of the module. The script does not contain any classes, loops, or conditional statements. The teacher object represents a teacher sidekick in a software application and provides methods for generating prompt templates and rendering context information. The script imports the "Sidekick" type from the "types" module. There are no known bugs or issues with this script.