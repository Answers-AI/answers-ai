## ChatApp Database Schema

This file contains the SQL code to create the ChatApp database schema. 

### TODO Items
- None at the moment.

### Known Issues
- None at the moment.

### CreateTable
The `CreateTable` section contains the SQL code to create the `ChatApp` table with the following columns:
- `id` (TEXT): a unique identifier for each ChatApp instance (required)
- `name` (TEXT): the name of the ChatApp instance (optional)
- `email` (TEXT): the email associated with the ChatApp instance (required)
- `apiKey` (TEXT): the API key associated with the ChatApp instance (required)
- `organizationId` (TEXT): the ID of the organization associated with the ChatApp instance (optional)
- `userId` (TEXT): the ID of the user associated with the ChatApp instance (required)
- `appSettings` (JSONB): a JSON object containing additional settings for the ChatApp instance (optional)

### CreateIndex
The `CreateIndex` section contains the SQL code to create two unique indexes on the `ChatApp` table:
- `ChatApp_email_key`: an index on the `email` column to ensure that each email is unique
- `ChatApp_apiKey_key`: an index on the `apiKey` column to ensure that each API key is unique

### AddForeignKey
The `AddForeignKey` section contains the SQL code to add two foreign key constraints to the `ChatApp` table:
- `ChatApp_organizationId_fkey`: a foreign key constraint on the `organizationId` column that references the `id` column of the `Organization` table and sets the `organizationId` to `NULL` when the referenced row is deleted and updates the `organizationId` when the referenced row is updated
- `ChatApp_userId_fkey`: a foreign key constraint on the `userId` column that references the `id` column of the `User` table and restricts deletion of the referenced row and updates the `userId` when the referenced row is updated.