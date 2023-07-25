POST /api/route
Summary: This API endpoint handles a POST request to a specific route. It performs various operations related to chat and AI processing, and returns a response stream.

Example Usage:
```
curl -X POST \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "journeyId": "123",
  "chatId": "456",
  "filters": {},
  "prompt": "Hello",
  "messages": [],
  "sidekick": {},
  "gptModel": "model1"
}'
```

Example Response:
```
Response stream
```

Import statements:
- `getServerSession` from 'next-auth': This import is used to get the server session for authentication purposes.
- `OpenAIStream` from '@utils/OpenAIStream': This import is used to create a stream for interacting with the OpenAI API.
- `inngest` from '@utils/ingest/client': This import is used to send data to an ingest service.
- `getCompletionRequest` from '@utils/llm/getCompletionRequest': This import is used to get the completion request for the AI model.
- `fetchContext` from '@utils/pinecone/fetchContext': This import is used to fetch the context for the AI model.
- `upsertChat` from '@utils/upsertChat': This import is used to upsert a chat in the database.
- `prisma` from '@db/client': This import is used to interact with the database using Prisma.
- `authOptions` from '@ui/authOptions': This import provides authentication options.

Internal Functions:
- `handleStreamEnd`: This function is called when the stream ends and handles the response from the AI model. It saves the answer to the database and sends a message to the ingest service.

External Services:
- Ingest service: This service is used to send data related to the chat and AI processing.

API Endpoints:
- POST /api/route: This endpoint handles a POST request to the specified route. It expects the following parameters in the request body: `journeyId`, `chatId`, `filters`, `prompt`, `messages`, `sidekick`, and `gptModel`. It performs various operations related to chat and AI processing, and returns a response stream.

Interaction Summary:
1. The API endpoint receives a POST request with the required parameters.
2. It retrieves the server session for authentication.
3. It checks if the user is authenticated and has an email. If not, it returns a redirect response with a status code of 401.
4. It extracts the required parameters from the request body.
5. It checks if a sidekick object is provided and retrieves the sidekick from the database if it exists.
6. It upserts the chat in the database.
7. It sends a message to the ingest service to indicate that a prompt has been upserted.
8. It fetches the context, pinecone filters, pinecone data, and context documents using the provided parameters.
9. If there is an error fetching the context, it logs the error and throws it.
10. It defines a function to handle the end of the stream.
11. It gets the completion request for the AI model using the provided parameters.
12. It creates a stream using the OpenAIStream function, passing the necessary parameters and the handleStreamEnd function.
13. It returns the stream as a response with the appropriate headers.

Developer Questions:
1. What is the purpose of the `getServerSession` function and how does it work?
2. How does the `upsertChat` function handle the upsert operation in the database?
3. What is the purpose of the `fetchContext` function and what data does it fetch?
4. How does the `handleStreamEnd` function save the answer to the database and send a message to the ingest service?
5. What is the purpose of the `OpenAIStream` function and how does it interact with the OpenAI API?
6. How can I test this API endpoint locally?
7. Are there any known issues or limitations with this code?