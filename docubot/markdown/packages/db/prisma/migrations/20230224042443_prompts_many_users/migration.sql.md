## TODO Items
- None

## Known Issues
- None

## Description
This file contains SQL commands to alter the database schema. The following actions are performed:
- Drop the foreign key constraint on the `userId` column of the `Prompt` table
- Drop the `userId` column from the `Prompt` table
- Create a new table `_PromptToUser` with two columns `A` and `B`
- Create a unique index on columns `A` and `B` of the `_PromptToUser` table
- Create an index on column `B` of the `_PromptToUser` table
- Add a foreign key constraint on column `A` of the `_PromptToUser` table referencing the `id` column of the `Prompt` table with cascading delete and update
- Add a foreign key constraint on column `B` of the `_PromptToUser` table referencing the `id` column of the `User` table with cascading delete and update

## Warnings
- The `userId` column on the `Prompt` table will be dropped and all data in the column will be lost.