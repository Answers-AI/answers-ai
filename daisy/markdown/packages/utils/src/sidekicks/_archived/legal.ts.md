Summary:
This code is a TypeScript module that exports an object named "legal". The object represents a legal sidekick in a software application. It contains properties and methods related to the legal department, such as department names, a label, a value, a placeholder, and functions for generating user prompts and rendering context strings.

Import statements:
- The code imports the "Sidekick" type from the "types" module. This type is used to define the type of the "legal" object.

Script Summary:
The script defines an object named "legal" and exports it as the default export of the module. The "legal" object has the following properties:
- "departments": An array of strings representing the departments that the legal sidekick belongs to.
- "label": A string representing the label or title of the legal sidekick.
- "value": A string representing the value or identifier of the legal sidekick.
- "placeholder": A string representing a placeholder text for the legal sidekick.
- "getUserPromptTemplate": A function that takes two parameters, "query" and "context", and returns a string. This function generates a user prompt template for the legal sidekick, including the query, context, and instructions for providing a legal response in markdown format.
- "contextStringRender": A function that takes a "context" parameter and returns a string. This function generates a context string for the legal sidekick, including the file path or URL and the text of the context.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This module can be imported and used by other parts of the software application that require a legal sidekick. The exported "legal" object can be accessed and used to retrieve information about the legal sidekick, generate user prompts, and render context strings.

Developer Questions:
- How can I customize the departments that the legal sidekick belongs to?
- Can I modify the label, value, or placeholder of the legal sidekick?
- How can I change the user prompt template or the context string rendering logic?
- Are there any other properties or methods that can be added to the legal sidekick object?
- How can I use the legal sidekick in other parts of the application?