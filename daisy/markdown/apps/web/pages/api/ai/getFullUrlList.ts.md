```
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import cors from '@ui/cors';
import { authOptions } from '@ui/authOptions';
import { getFullUrlList } from '@ui/chat/getFullUrlList';

export type SourceUrl = {
  id: string;
  domain: string;
  url: string;
};

type Data = SourceUrl[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  const session = await getServerSession(req, res, authOptions);

  const user = session?.user;

  if (!user?.email) {
    res.status(401);
    return;
  }

  const urls = await getFullUrlList();

  res.status(200).json(urls);
};

export default handler;
```

API Summary:
This file contains an API endpoint that handles requests to retrieve a list of source URLs. It requires authentication and returns a JSON response containing the list of URLs.

Import statements:
- `NextApiRequest` and `NextApiResponse` are imported from the 'next' package. They are used to define the types of the request and response objects for the API endpoint.
- `getServerSession` is imported from the 'next-auth' package. It is used to retrieve the user session from the server.
- `cors` is imported from the '@ui/cors' module. It is used to enable Cross-Origin Resource Sharing (CORS) for the API endpoint.
- `authOptions` is imported from the '@ui/authOptions' module. It contains the options for authentication.
- `getFullUrlList` is imported from the '@ui/chat/getFullUrlList' module. It is a function that retrieves the full list of URLs.

Internal Functions:
- `handler`: This is the main function that handles the API request. It is an asynchronous function that takes in the request and response objects as parameters. It first enables CORS by calling the `cors` function. Then, it retrieves the user session using `getServerSession` and the `authOptions`. If the user session does not contain an email, it sets the response status to 401 (Unauthorized) and returns. Otherwise, it calls `getFullUrlList` to retrieve the list of URLs and sets the response status to 200 (OK) with the URLs as the JSON response.

External Services:
- This API endpoint depends on the Next.js framework and the 'next-auth' package for authentication.

API Endpoints:
GET /api/source-urls
Summary: Retrieves a list of source URLs.
Example Usage:
```
curl -X GET \
  http://localhost:3000/api/source-urls \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
```

Example Response:
```json
[
  {
    "id": "1",
    "domain": "example.com",
    "url": "https://example.com"
  },
  {
    "id": "2",
    "domain": "example.org",
    "url": "https://example.org"
  }
]
```

Interaction Summary:
1. The client sends a GET request to the /api/source-urls endpoint.
2. The server enables CORS for the request.
3. The server retrieves the user session using `getServerSession` and `authOptions`.
4. If the user session does not contain an email, the server sets the response status to 401 (Unauthorized) and returns.
5. Otherwise, the server calls `getFullUrlList` to retrieve the list of URLs.
6. The server sets the response status to 200 (OK) and sends the list of URLs as the JSON response.

Developer Questions:
- How is authentication handled in this API endpoint?
- What is the structure of the `SourceUrl` type?
- What are the possible response statuses and their meanings?
- Are there any error handling mechanisms in place for this API endpoint?

TODO Items:
- Add error handling for failed authentication.
- Implement pagination for the list of source URLs if it becomes too large.

Known Issues:
- None at the moment.