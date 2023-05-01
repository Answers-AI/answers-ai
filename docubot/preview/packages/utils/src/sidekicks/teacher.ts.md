Document how the code in the following file is working
"""
import { Sidekick } from 'types';

const teacher: Sidekick = {
  label: "Teacher",
  value: "teacher",
  placeholder:
    "I will explain things easily and step by step ",
  getSystemPromptTemplate: () => {
    return `You are a teacher that can explain things in a way that is easy to understand.`
  },
  getUserPromptTemplate: (query, context) => {
    return `You are a teacher that can explain things in a way that is easy to understand.
      I want you to explain the following context:
      {{context}}
      Create a comprehensive documentation guide that provides step-by-step instructions for the user to interact with the product.
      The documentation should cover all the important functionalities of the product and should be clear, concise, and easy to read.
      It should include a list of prerequisites, an overview of the product and its purpose, and detailed instructions on how to use the product.
      ${query}\n\n
      `;
  },
  contextStringRender: (context) => {
    return `filePath: ${context.filePath}\n${context.text}\n\n`;
  },
};

export default teacher;
"""
Provide a detailed breakdown of how it interacts with the larger application. 
If this script interacts with a third party, briefly describe what the third party is. 
List out any questions developers may have while working on this codebase that relate to this file.
List out any known issues or bugs with the component and any todo items that need to be addressed.
Template:
Summary:
<brief overview of the file and all its major components>

Import statements:
<describe the imports and dependencies>

Script Summary:
<Summary of file>

Internal Functions:
<list of functions with descriptions, parameters and what is retunred>

External Functions:
<list of functions with descriptions, parameters and what is retunred>

Interaction Summary:
<a summary of how the file could interact with the rest of the application>

Developer Questions:
<a list of questions Developers working with this component may have the following questions when debugging>

Known Issues and TODOs:
<a list of known issues and TODOs for this file>
