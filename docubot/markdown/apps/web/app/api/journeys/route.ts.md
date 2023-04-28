This file contains two API endpoints, `GET` and `DELETE`, that interact with a larger application. The endpoints require authentication and use the `getServerSession` function from the `next-auth` package to retrieve the user's session information. The endpoints also interact with a database using the `prisma` ORM.

Import statements:
- `NextResponse` from `next/server`: used to return responses to the client
- `getServerSession` from `next-auth`: used to retrieve the user's session information
- `prisma` from `db/dist`: used as the ORM to interact with the database
- `authOptions` from `@ui/authOptions`: contains options for the authentication process

Internal Functions:
- `GET`: retrieves all journey records associated with the authenticated user's email address
  - Parameters: `req` (NextApiRequest), `res` (NextApiResponse)
  - Returns: a JSON response containing an array of journey records
- `DELETE`: deletes a journey record associated with the authenticated user's email address
  - Parameters: `req` (NextApiRequest), `res` (NextApiResponse)
  - Returns: a JSON response containing the ID of the deleted record

External Services:
- `next-auth`: used to retrieve the user's session information
- `prisma`: used as the ORM to interact with the database

API Endpoints:
- `GET /api/journey`
  - Summary: Retrieves all journey records associated with the authenticated user's email address
  - Example Usage:
    ```
    curl -X GET \
      http://localhost:3000/api/journey \
      -H 'Content-Type: application/json' \
      -H 'cache-control: no-cache' \
      -d '{
      "data": "data"
    }'
    ```
  - Example Response:
    ```json
    [
      {
        "id": 1,
        "name": "Journey 1",
        "users": [
          {
            "email": "user@example.com"
          }
        ]
      },
      {
        "id": 2,
        "name": "Journey 2",
        "users": [
          {
            "email": "user@example.com"
          }
        ]
      }
    ]
    ```
- `DELETE /api/journey?id=<id>`
  - Summary: Deletes a journey record associated with the authenticated user's email address
  - Example Usage:
    ```
    curl -X DELETE \
      http://localhost:3000/api/journey?id=1 \
      -H 'Content-Type: application/json' \
      -H 'cache-control: no-cache' \
      -d '{
      "data": "data"
    }'
    ```
  - Example Response:
    ```json
    {
      "id": 1
    }
    ```

Interaction Summary:
This file interacts with the `next-auth` package to authenticate users and retrieve their session information. It also interacts with the `prisma` ORM to retrieve and delete journey records associated with the authenticated user's email address.

Developer Questions:
- How is the `authOptions` object configured?
- What other endpoints in the application use the `prisma` ORM?
- How can I modify the `GET` endpoint to retrieve journey records for a specific user, rather than the authenticated user?

Known Issues and TODOs:
- None at this time.