Summary:
This code is a TypeScript module that exports a function called `getCompletionRequest`. The function takes in several parameters, including `context`, `user`, `organization`, `messages`, `input`, `sidekick`, and `gptModel`. It performs various operations to generate a completion request object that can be used with an AI model to generate a response. The function utilizes several utility functions and imports various types and enums from external modules.

Import statements:
- `Message`, `Sidekick`, `User`, `Organization`: These are types imported from the 'types' module. They are used to define the types of the `user`, `organization`, and `messages` parameters in the `getCompletionRequest` function.
- `ChatCompletionRequestMessageRoleEnum`: This is an enum imported from the 'openai' module. It is used to define the role of a message in the completion request.
- `countTokens`: This is a function imported from the '../utilities/countTokens' module. It is used to count the number of tokens in a given text.
- `renderContext`: This is a function imported from the '../utilities/renderContext' module. It is used to render a template with the provided context and variables.
- `getMaxTokensByModel`: This is a default export from the '../utilities/getMaxTokensByModel' module. It is used to get the maximum number of tokens allowed for a specific AI model.
- `getUserContextFields`: This is a function imported from the '../utilities/getUserContextFields' module. It is used to get custom context fields for a user.
- `getOrganizationContextFields`: This is a function imported from the '../utilities/getOrganizationContextFields' module. It is used to get custom context fields for an organization.

Script Summary:
The `getCompletionRequest` function is the main function in this script. It takes in several parameters and performs the following steps:
1. It retrieves custom context fields for the organization and user.
2. It renders the system prompt and user prompt templates using the provided input, context, and context fields.
3. It sets default values for temperature, frequency, presence, sidekickModel, and maxCompletionTokens if not provided.
4. It counts the tokens in the system prompt and user prompt.
5. It calculates the maximum number of tokens allowed for the completion request.
6. It filters the messages based on the token count to ensure they fit within the maximum limit.
7. It constructs the full message array by combining the filtered messages and the user prompt.
8. It returns an object containing the completion request parameters.

Internal Functions:
- `getCompletionRequest`: This is the main function that generates a completion request object. It takes in several parameters and performs various operations to construct the completion request. It returns an object containing the completion request parameters.

External Functions:
- `countTokens`: This function takes in a text string and counts the number of tokens in it. It returns a promise that resolves to the token count.
- `renderContext`: This function takes in a template string and an object of variables and renders the template by replacing the variables with their corresponding values. It returns the rendered string.
- `getMaxTokensByModel`: This function takes in a GPT model name and returns the maximum number of tokens allowed for that model.
- `getUserContextFields`: This function takes in a user object and returns custom context fields for the user.
- `getOrganizationContextFields`: This function takes in an organization object and returns custom context fields for the organization.

Interaction Summary:
This script can be used as a module in a larger software application. Other parts of the application can import and use the `getCompletionRequest` function to generate completion requests for AI models. The function takes in various parameters, including the user, organization, messages, input, and sidekick information, and returns a completion request object that can be passed to an AI model for generating responses.

Developer Questions:
- How can I modify the system prompt and user prompt templates?
- What are the default values for temperature, frequency, presence, sidekickModel, and maxCompletionTokens?
- How are the messages filtered based on the token count?
- How can I customize the completion request parameters?
- How can I handle errors or exceptions that may occur during the execution of this function?
- Are there any potential performance issues with counting tokens or filtering messages?