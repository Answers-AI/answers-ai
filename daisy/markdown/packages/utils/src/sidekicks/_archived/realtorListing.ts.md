Script Purpose and Role:
The purpose of this script is to define and export a Sidekick object for a realtor listing. This object contains various properties and methods related to creating property descriptions for real estate listings. The script's role within the broader software application is to provide a reusable component that can be used by other parts of the application to generate realtor listing prompts and templates.

Script Structure:
The script starts with an import statement for the Sidekick type from the 'types' module. It then defines a constant variable named 'realtorListing' which is of type Sidekick. This variable represents the realtor listing sidekick object and contains properties and methods related to realtor listings. Finally, the script exports the 'realtorListing' object as the default export.

Import Statements:
- The import statement imports the Sidekick type from the 'types' module. This type is used to define the type of the 'realtorListing' object.

Classes and Functions:
- getSystemPromptTemplate(): This function returns a system prompt template for the realtor listing sidekick. It provides a description of the role and expertise of a copywriter in creating property descriptions for real estate agents. The function does not take any parameters and returns a string.

- getUserPromptTemplate(query, context): This function returns a user prompt template for the realtor listing sidekick. It takes two parameters: 'query' which represents the information about the property, and 'context' which represents the context of the prompt. The function returns a string that includes the property information and provides instructions for the user to write a detailed property description.

- contextStringRender(context): This function returns a string representation of the context for the realtor listing sidekick. It takes one parameter 'context' which represents the context of the prompt. The function returns a string that includes the file path or URL of the context and the text of the context.

Loops and Conditional Statements:
There are no loops or conditional statements in this script.

Variable Usage:
- realtorListing: This constant variable represents the realtor listing sidekick object. It is of type Sidekick and contains properties and methods related to realtor listings.

Potential Bugs or Issues:
There are no known bugs or issues with this component.

Summary:
This script defines and exports a Sidekick object for a realtor listing. The object contains properties and methods related to creating property descriptions for real estate listings. The script provides system and user prompt templates, as well as a function to render the context of the prompt. It can be used as a reusable component in the broader software application to generate realtor listing prompts and templates. There are no known bugs or issues with this component.