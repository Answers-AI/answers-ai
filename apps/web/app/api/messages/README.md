
# api/messages/route.ts
This file contains the routes for the messages API. It provides the functionality to GET, DELETE, and PATCH messages. It also handles authentication and authorization for the API.

## GET
The GET route is used to retrieve all messages associated with the user's session. It requires authentication and authorization to be successful.

## DELETE
The DELETE route is used to delete a single message based on its ID. It requires authentication and authorization to be successful.

## PATCH
The PATCH route is used to update a single message based on its ID. It requires authentication and authorization to be successful. It also validates which fields are allowed to be updated.
