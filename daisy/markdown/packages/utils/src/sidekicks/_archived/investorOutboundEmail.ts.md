Script Purpose and Role:
The purpose of this script is to define a sales sidekick object that represents a specific role within a broader software application. The sales sidekick object contains various properties and methods that provide information and templates related to the sales department. This script serves as a configuration file that can be imported and used by other parts of the application to access the sales sidekick object.

Script Structure:
The script starts with an import statement that imports the Sidekick type from the 'types' module. It then defines a constant variable named 'sales' which is of type Sidekick. The 'sales' object contains several properties and methods that define the characteristics and behavior of the sales sidekick.

Import Statements:
- import { Sidekick } from 'types': This import statement imports the Sidekick type from the 'types' module. The Sidekick type is likely a custom type defined elsewhere in the application and is used to define the structure of the sales sidekick object.

Classes and Functions:
- getSystemPromptTemplate(): This function is a method of the sales sidekick object. It returns a system prompt template string that provides information about the role of an investor outbound email expert. The template includes details about the person's job at AnswerAI, their specialization in writing outbound emails to venture capitalists and investors, and their expertise in generative AI, enterprise software, and digital marketing.

- getUserPromptTemplate(query, context): This function is another method of the sales sidekick object. It returns a user prompt template string that guides the user in crafting an email to an investor. The template includes the user's query, a context string, and a set of guidelines for writing investor emails. The function takes two parameters: 'query' represents the user's query, and 'context' represents the context string to be included in the template.

- contextStringRender(context): This function is also a method of the sales sidekick object. It returns a string that represents the rendering of a context string. The function takes a 'context' parameter, which is a context object containing a 'filePath' and 'text' property. The returned string includes the 'filePath' and 'text' properties of the context object, along with some additional formatting.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
- sales: This constant variable represents the sales sidekick object. It is of type Sidekick and contains various properties and methods that define the characteristics and behavior of the sales sidekick.

Potential Bugs or Issues:
There are no apparent bugs or issues in this script.

Summary:
This script defines a sales sidekick object that represents a specific role within a software application. The object contains properties and methods that provide information and templates related to the sales department. The script can be imported and used by other parts of the application to access the sales sidekick object. There are no known bugs or issues with this component.