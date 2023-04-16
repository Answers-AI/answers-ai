Filepath: packages/ui/src/useStreamedResponse.ts
Overview: Summary:
This file contains a custom React hook called `useStreamedResponse` which is used to generate a response from an API endpoint and stream the response back to the client in chunks. The hook takes in various parameters such as the chatId, journeyId, messages, filters, apiUrl, onChunk, and onEnd.

Import statements:
The file imports the `useState` hook from the React library and the `Message` type from a custom `types` module.

Script Summary:
The `useStreamedResponse` hook generates a response from an API endpoint and streams the response back to the client in chunks. The hook takes in various parameters such as the chatId, journeyId, messages, filters, apiUrl, onChunk, and onEnd. The hook sets up a fetch request to the API endpoint and reads the response in chunks using a `TextDecoder` and `ReadableStream`. The `onChunk` function is called for each chunk of data received and the `onEnd` function is called when the response is complete.

Internal Functions:
- `generateResponse`: This function generates a response from an API endpoint and streams the response back to the client in chunks. It takes in a `aPrompt` parameter and sets up a fetch request to the API endpoint. It then reads the response in chunks using a `TextDecoder` and `ReadableStream`. The `onChunk` function is called for each chunk of data received and the `onEnd` function is called when the response is complete.

External Functions:
None

Interaction Summary:
This file is part of a larger React application and is used to generate responses from an API endpoint and stream the response back to the client in chunks. The hook takes in various parameters such as the chatId, journeyId, messages, filters, apiUrl, onChunk, and onEnd. The `onChunk` function is called for each chunk of data received and the `onEnd` function is called when the response is complete.

Developer Questions:
- What is the expected format of the `filters` parameter?
- How is the `onChunk` function implemented in the rest of the application?
- What is the expected behavior of the `onEnd` function in the rest of the application?
- What is the expected behavior if the API endpoint returns an error response?

