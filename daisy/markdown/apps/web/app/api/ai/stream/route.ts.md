Template:
{{prompt}}
{{fileContents}}
API Summary:
This file contains a single API endpoint that handles a POST request. The endpoint is responsible for processing user input, generating a response using an AI model, and sending the response back to the client.

Import statements:
- `getServerSession` from `next-auth`: This function is used to retrieve the server session for authentication purposes.
- `OpenAIStream` from `@utils/OpenAIStream`: This is a utility function for interacting with the OpenAI API.
- `inngest` from `@utils/ingest/client`: This is a utility function for sending data to an ingest service.
- `getCompletionRequest` from `@utils/llm/getCompletionRequest`: This function is used to generate a completion request for the AI model.
- `fetchContext` from `@utils/pinecone/fetchContext`: This function is used to fetch context data for the AI model.
- `upsertChat` from `@utils/upsertChat`: This function is used to create or update a chat object in the database.
- `prisma` from `@db/client`: This is the Prisma client for interacting with the database.
- `authOptions` from `@ui/authOptions`: This is an object containing options for authentication.

Internal Functions:
- `handleStreamEnd`: This function is called when the AI model has finished generating a response. It processes the response and sends it to the client.

External Services:
- OpenAI API: This API is used to generate responses using an AI model.
- Ingest service: This service is used to send data to a data ingestion system.
- Prisma: This is the database client used to interact with the database.

API Endpoints:
POST /api/route
Summary: This endpoint handles a POST request and processes user input, generates a response using an AI model, and sends the response back to the client.
Example Usage:
```
curl -X POST \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -d '{
  "journeyId": "123",
  "chatId": "456",
  "filters": {},
  "prompt": "Hello",
  "messages": [],
  "sidekick": {},
  "gptModel": "gpt-3.5-turbo"
}'
```

Example Response:
```json
{
  "response": "Hello, how can I help you?"
}
```

Interaction Summary:
1. The endpoint retrieves the server session for authentication purposes.
2. It checks if the user is authenticated and has an email. If not, it returns a 401 Unauthorized response.
3. It extracts the necessary data from the request payload, such as journeyId, chatId, filters, prompt, messages, sidekick, and gptModel.
4. It checks if a sidekick object is provided and retrieves the sidekick from the database if it exists.
5. It upserts the chat object in the database, creating a new chat if it doesn't exist or updating an existing one.
6. It sends a message to the ingest service to record the user's prompt.
7. It sends a message to the ingest service to record the prompt being upserted.
8. It fetches context data from the Pinecone service, including filters, data, and context documents.
9. It generates a completion request for the AI model using the context, user, organization, input, messages, sidekick, and gptModel.
10. It establishes a stream connection with the OpenAI API using the OpenAIStream utility function.
11. When the AI model generates a response, the handleStreamEnd function is called to process the response and send it to the client.

Developer Questions:
1. What is the purpose of the `getServerSession` function and how is it used?
2. How does the `OpenAIStream` utility function interact with the OpenAI API?
3. What data is sent to the ingest service and why?
4. How does the `upsertChat` function work and what does it do?
5. How is the completion request generated for the AI model?
6. What is the purpose of the `fetchContext` function and what data does it fetch?
7. How is the response from the AI model processed and sent back to the client?
8. Are there any known issues or TODO items related to this file?