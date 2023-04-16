Filepath: packages/utils/src/llm/getCompletionRequest.ts
Overview: Summary:
This file contains a function that returns an object used to request a chat completion from the OpenAI API. The object includes messages to be sent to the API, as well as parameters such as the maximum number of tokens and the model to use.

Import statements:
- `Message` from `types`: a custom type used to represent chat messages
- `ChatCompletionRequestMessageRoleEnum` from `openai`: an enum used to specify the role of a chat message (system or user)

Script Summary:
The `getCompletionRequest` function takes in an object with four properties: `context`, `userName`, `history`, and `input`. It returns an object with several properties, including `max_tokens`, `messages`, `temperature`, and `model`. The `messages` property is an array of chat messages, including a system message, a user message with the provided context, a user message with the provided username (if any), and the user's input. The other properties are used to configure the chat completion request.

Internal Functions:
None

External Functions:
- `getCompletionRequest`: takes in an object with four properties (`context`, `userName`, `history`, and `input`) and returns an object with several properties, including `max_tokens`, `messages`, `temperature`, and `model`.

Interaction Summary:
This file is used to generate a chat completion request object that is sent to the OpenAI API. The returned object is likely used in conjunction with other functions to send the request and process the response.

Developer Questions:
- What is the expected format of the `history` property in the input object?
- How is the returned object used in the rest of the application?
- What is the purpose of the `temperature` property in the returned object?
- What other models can be used besides `gpt-3.5-turbo`?

