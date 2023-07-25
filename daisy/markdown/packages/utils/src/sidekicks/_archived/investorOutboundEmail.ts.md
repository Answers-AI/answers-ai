Script Purpose and Role:
The purpose of this script is to define a sales sidekick object that represents a specific role within a broader software application. The sales sidekick object contains various properties and methods that provide information and templates related to the sales department. This script serves as a configuration file that can be imported and used by other parts of the application to access the sales sidekick object.

Script Structure:
The script starts with an import statement that imports the Sidekick type from the 'types' module. It then defines a constant variable named 'sales' that is of type Sidekick. The 'sales' variable is an object that contains properties and methods related to the sales sidekick.

Import Statements:
- import { Sidekick } from 'types': This import statement imports the Sidekick type from the 'types' module. The Sidekick type is used to define the type of the 'sales' variable.

Classes and Functions:
- getSystemPromptTemplate(): This function is a method of the 'sales' object. It returns a system prompt template string that provides information about the role of an investor outbound email expert. The template includes details about the person's job at AnswerAI, their specialization in writing outbound emails to venture capitalists and investors, and their expertise in generative AI, enterprise software, and digital marketing.

- getUserPromptTemplate(query, context): This function is a method of the 'sales' object. It returns a user prompt template string that guides the user in crafting an email to an investor. The template includes the user's query, a context string, and a set of guidelines for writing investor emails.

- contextStringRender(context): This function is a method of the 'sales' object. It takes a context object as a parameter and returns a string that represents the context. The returned string includes the file path and text of the context.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
- sales: This constant variable represents the sales sidekick object. It is of type Sidekick and contains properties and methods related to the sales department.

Potential Bugs or Issues:
There are no apparent bugs or issues in this script.

Summary:
This script defines a sales sidekick object that provides information and templates related to the sales department. It includes methods for retrieving system and user prompt templates, as well as rendering a context string. The script can be imported and used by other parts of the application to access the sales sidekick object. No bugs or issues were identified in the script.