
# api/sync/confluence/route.ts
This file contains the code for a POST request to the Confluence API. It is responsible for sending the app settings and the user session to the Confluence API.

## Imports
The file imports the following functions and objects:
- `getAppSettings` from `@ui/getAppSettings`
- `getServerSession` from `next-auth`
- `authOptions` from `@ui/authOptions`
- `inngest` from `@utils/ingest/client`

## POST Request
The `POST` function is responsible for sending the app settings and the user session to the Confluence API. It does this by first retrieving the app settings and the user session from the imported functions and objects. It then sends the data to the Confluence API using the `inngest.send` function. The data sent includes the version, timestamp, name, user, and app settings.
