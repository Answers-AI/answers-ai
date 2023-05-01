Document how the code in the following file is working
"""
import { Sidekick } from 'types';

const coding: Sidekick = {
  label: "Coding Expert",
  value: "coding",
  placeholder: "I can create code for you",
  getSystemPromptTemplate: (user) => {
    return `You are a code assistant. You specialize in building [javascript] applications with OpenAI.`
  },
  getUserPromptTemplate: (query, context) => {
    return `
      I want you to use the code in the following context to help with the users command:\n\n
      """
      ${context}
      """
      User Commmand: ${query}\n\n
      The first response should break the problem down into smaller pieces and provide a high-level overview of the solution.
      Then Create code snippets where the user needs to make updates in the same code style and format as the context.
      Outline the use cases for which end-to-end tests need to be created.
      Always let the user know how confident you are in your response.
      - Confidence: 0-100
      Ask the user what they are trying to do. Ask the user to share files that might be helpful as context.
      - Suggested Questions: <list of questions>
      Always end your response with citing your sources in a list. Cite ALL Sources used in the context in the format of a markdown link. 
      - Source: [http://example.com](My Example Site)\n`;
  },
  contextStringRender: (context) => {
    return `Source: [${context.filePath}](${context.filePath})\n Javascript:\n${context.code}\n\n`;
  },
};

export default coding;
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
