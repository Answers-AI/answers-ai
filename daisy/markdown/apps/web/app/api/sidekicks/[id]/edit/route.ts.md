API Summary:
This file contains code for a PATCH endpoint that updates a sidekick object in the application. The endpoint expects a request with a valid sidekick ID in the URL and a JSON payload containing the updated sidekick data. The code retrieves the user session, checks if the user is authenticated, and then proceeds to update the sidekick object in the database. The updated sidekick object is returned as the response.

Import statements:
- `NextResponse` is imported from the 'next/server' module and is used to send responses back to the client.
- `getServerSession` is imported from the 'next-auth' module and is used to retrieve the user session.
- `prisma` is imported from the '@db/client' module and is used to interact with the database.
- `authOptions` is imported from the '@ui/authOptions' module and contains options for session authentication.
- `respond401` is imported from the '@utils/auth/respond401' module and is used to handle unauthorized requests.
- `Sidekick` is imported from the 'types' module and represents the sidekick object structure.
- `normalizeSidekickForUpdate` is imported from the 'utilities/normalizeSidekick' module and is used to normalize the sidekick data before updating.

Internal Functions:
- `PATCH`: This is the main function that handles the PATCH request. It takes in the request (`req`) and response (`res`) objects as parameters. It first retrieves the user session using `getServerSession` and checks if the user is authenticated. If not, it returns a 401 unauthorized response using `respond401`. It then extracts the sidekick ID from the URL using a regular expression. If the ID is invalid or not found, it returns a JSON response with an error message. Next, it retrieves the updated sidekick data from the request payload and normalizes it using `normalizeSidekickForUpdate`. It then retrieves all the columns for the Sidekick model from the database schema and creates a new object (`newData`) with the normalized sidekick data. It sets any null values to undefined to prevent them from being updated. Finally, it updates the sidekick object in the database using `prisma.sidekick.update` and returns the updated sidekick as the response.

External Services:
- Database: The code interacts with the database using the Prisma client (`prisma`). It retrieves the sidekick object from the database and updates it with the new data.

API Endpoints:
PATCH /api/sidekicks/:id/edit
Summary: This endpoint updates a sidekick object with the provided ID. It requires authentication and expects a JSON payload containing the updated sidekick data.

Example Usage:
```
curl -X PATCH \
  http://localhost:3000/api/sidekicks/123/edit \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access_token>' \
  -d '{
  "name": "Updated Sidekick",
  "powerLevel": 100
}'
```

Example Response:
```json
{
  "id": "123",
  "name": "Updated Sidekick",
  "powerLevel": 100,
  "userId": null,
  "createdByUser": {
    "id": "456",
    "name": "John Doe"
  }
}
```

Interaction Summary:
1. The code retrieves the user session using `getServerSession` and checks if the user is authenticated.
2. It extracts the sidekick ID from the URL.
3. It retrieves the updated sidekick data from the request payload and normalizes it.
4. It retrieves all the columns for the Sidekick model from the database schema.
5. It creates a new object with the normalized sidekick data, setting any null values to undefined.
6. It updates the sidekick object in the database using `prisma.sidekick.update`.
7. It returns the updated sidekick as the response.

Developer Questions:
1. What is the purpose of `normalizeSidekickForUpdate` and how does it work?
2. How are the database fields determined and why are they set to undefined in the `newData` object?
3. What happens if the user is not authenticated? How is the unauthorized response handled?
4. Are there any additional validations or error handling in this code that are not mentioned?
5. How can I test this endpoint locally?