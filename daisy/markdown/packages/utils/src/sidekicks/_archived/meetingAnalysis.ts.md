Script Purpose and Role:
The purpose of this script is to define and export a variable named "sales" that represents a sidekick object for meeting analysis. This script is likely part of a broader software application that involves analyzing meeting transcripts and providing insights and summaries based on user queries.

Script Structure:
The script starts with an import statement for the "Sidekick" type from the "types" module. It then defines a constant variable named "sales" which is an object with various properties and methods. Finally, it exports the "sales" variable as the default export of the module.

Import Statements:
- { Sidekick } from 'types': This import statement imports the "Sidekick" type from the "types" module. The "Sidekick" type is likely a custom type defined elsewhere in the application.

Classes and Functions:
- sales: This is a constant variable that represents a sidekick object for meeting analysis. It has the following properties and methods:
  - departments: An array of strings representing different departments.
  - label: A string representing the label for the meeting analysis.
  - value: A string representing the value for the meeting analysis.
  - temperature: A number representing the temperature for the meeting analysis.
  - placeholder: A string representing a placeholder message for the meeting analysis.
  - getSystemPromptTemplate: A function that returns a string representing a system prompt template for the meeting analysis.
  - getUserPromptTemplate: A function that returns a string representing a user prompt template for the meeting analysis.
  - contextStringRender: A function that returns a string representing a context string for the meeting analysis.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
- sales: This constant variable is used to store the sidekick object for meeting analysis. It is assigned an object with various properties and methods.

Potential Bugs or Issues:
There are no apparent bugs or issues in this script.

Summary:
This script defines and exports a sidekick object for meeting analysis. The object has properties and methods related to the meeting analysis, such as departments, label, value, temperature, placeholder, and prompt templates. It is likely part of a larger software application that involves analyzing meeting transcripts and providing insights and summaries based on user queries. The script does not contain any loops or conditional statements and does not have any apparent bugs or issues.