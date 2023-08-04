// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { inngest } from '@utils/ingest/client';
import { authenticateApiKey } from '@utils/auth/authenticateApiKey';
import { respond401 } from '@utils/auth/respond401';

export async function POST(req: Request) {
  const result = await authenticateApiKey(req);

  if (!result) return respond401();

  const data = await req.json();

  // loop through these and return an error if any are missing
  const keys = ['repo', 'text', 'filePath'];

  for (const key of keys) {
    if (!data?.[key]) {
      return NextResponse.json(
        { error: `No ${key} in body` },
        {
          status: 400
        }
      );
    }
  }

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'codebase/repo.sync',
    user: result.type === 'user' ? result.user : undefined,
    organization: result.type === 'organization' ? result.organization : undefined,
    data
  });

  return NextResponse.json({ status: 'ok' });
}

API Summary:
This code file contains a single API endpoint that handles a POST request to '/api/route'. The endpoint expects a JSON payload with specific keys ('repo', 'text', 'filePath'). It authenticates the request using an API key, and if the authentication is successful, it sends the data to an external service called 'inngest'. The endpoint returns a JSON response with a status of 'ok' if the request is successful.

Import statements:
- NextResponse: This is a utility class from the 'next/server' package that provides methods for creating HTTP responses.
- inngest: This is a utility function from the '@utils/ingest/client' module that sends data to an external service.
- authenticateApiKey: This is a utility function from the '@utils/auth/authenticateApiKey' module that handles API key authentication.
- respond401: This is a utility function from the '@utils/auth/respond401' module that generates a 401 Unauthorized response.

Internal Functions:
- POST: This is the main function that handles the POST request to '/api/route'. It takes a request object as a parameter and returns a response object. It first authenticates the request using the 'authenticateApiKey' function. If the authentication fails, it returns a 401 Unauthorized response using the 'respond401' function. If the authentication is successful, it parses the JSON payload from the request using the 'req.json()' method. It then checks if the required keys ('repo', 'text', 'filePath') are present in the payload. If any of the keys are missing, it returns a 400 Bad Request response with an error message. If all the keys are present, it sends the data to the 'inngest' service using the 'inngest.send()' method. Finally, it returns a 200 OK response with a JSON object containing the status 'ok'.

External Services:
- inngest: This is an external service that receives data and performs some processing. The 'inngest.send()' method is used to send data to this service.

API Endpoints:
POST /api/route
Summary: This endpoint handles a POST request to '/api/route' and expects a JSON payload with the keys 'repo', 'text', and 'filePath'. It authenticates the request using an API key and sends the data to the 'inngest' service. It returns a JSON response with a status of 'ok' if the request is successful.

Example Usage:
```
curl -X POST \
  http://localhost:3000/api/route \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "repo": "my-repo",
  "text": "some text",
  "filePath": "/path/to/file"
}'
```

Example Response:
```json
{
  "status": "ok"
}
```

Interaction Summary:
1. The client sends a POST request to '/api/route' with a JSON payload containing the required keys ('repo', 'text', 'filePath').
2. The server authenticates the request using an API key.
3. If the authentication fails, the server returns a 401 Unauthorized response.
4. If the authentication is successful, the server parses the JSON payload and checks if all the required keys are present.
5. If any of the keys are missing, the server returns a 400 Bad Request response with an error message.
6. If all the keys are present, the server sends the data to the 'inngest' service.
7. The 'inngest' service processes the data.
8. The server returns a 200 OK response with a JSON object containing the status 'ok'.

Developer Questions:
1. What is the purpose of the 'authenticateApiKey' function?
2. What happens if the 'inngest.send()' method fails?
3. Can the keys in the JSON payload be customized?
4. How can I test this API endpoint locally?

TODO:
- Add error handling for the 'inngest.send()' method.
- Add unit tests for the 'POST' function.

Known Issues:
- None.