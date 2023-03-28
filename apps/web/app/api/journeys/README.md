# Route API

This file contains the code for the route API, which is used to manage user journeys. It provides methods for retrieving and deleting journeys, and is designed to be used with the [Next.js](https://nextjs.org/) framework.

## GET

The `GET` method is used to retrieve a list of journeys associated with a user. It requires authentication and will redirect to the authentication page if the user is not logged in.

## DELETE

The `DELETE` method is used to delete a journey associated with a user. It requires authentication and will redirect to the authentication page if the user is not logged in. It also requires an `id` parameter to be passed in the URL, which is used to identify the journey to be deleted.
