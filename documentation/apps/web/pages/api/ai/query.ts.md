Filepath: apps/web/pages/api/ai/query.ts
Overview: API Summary:
This file contains an API endpoint for handling AI queries. It receives a prompt and messages from the client, sends them to an AI model for processing, and returns a response to the client.

Import statements:
- NextApiRequest, NextApiResponse: Types for Next.js API routes
- getServerSession: Function for retrieving the server session
- Message: Type for chat messages
- prisma: Database client for interacting with the database
- cors: Middleware for handling CORS
- inngest: Client for sending data to an analytics service
- authOptions: Options for authentication
- createChatChain: Function for creating a chat chain
- upsertChat: Function for upserting a chat
- fetchContext: Function for fetching context data

Internal Functions:
- handler: The main function for the API endpoint. It receives a request and response object, retrieves the user session, validates the user, upserts a chat, sends the prompt to an AI model for processing, creates a response message, and sends analytics data.

External Services:
- Prisma: A database client for interacting with the database
- Inngest: A client for sending data to an analytics service

API Endpoints:
POST /api/ai/query
Summary: Handles AI queries by sending the prompt and messages to an AI model for processing and returning a response.
Example Usage:
```
const response = await fetch('/api/ai/query', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Hello', messages: [] }),
  headers: {
    'Content-Type': 'application/json'
  }
});
```

Example Response:
```
{
  "id": 1,
  "chat": {
    "id": 1,
    "email": "user@example.com",
    "filters": {},
    "isNewJourney": false,
    "prompt": "Hello",
    "journeyId": null
  },
  "role": "assistant",
  "content": "Hi there!",
  "context": "",
  "summary": "",
  "filters": {},
  "pineconeData": null,
  "completionData": null,
  "completionRequest": null
}
```

Interaction Summary:
Client-side components can use this API endpoint to send a prompt and messages to an AI model for processing and receive a response. The response can be used to update the chat interface and display the AI's response to the user.

Developer Questions:
- What AI model is being used for processing the prompts?
- How can I modify the AI model or switch to a different one?
- What analytics data is being sent and how is it being used?
- How can I modify the analytics data or switch to a different analytics service?

