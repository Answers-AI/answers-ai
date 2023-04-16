Filepath: packages/db/prisma/migrations/20230320183429_add_soft_delete/migration.sql
Overview: Summary:
This file contains SQL commands to add a "deleted" column to four tables in the database: Chat, Journey, Message, and Prompt.

Dependencies:
This file depends on the Prisma ORM to interact with the database.

Code Summary:
The code consists of four ALTER TABLE commands, each adding a "deleted" column to a different table. The column is of type BOOLEAN and has a default value of false.

Interaction Summary:
This file is part of a database migration, which means it is intended to be run once to update the database schema. Once the migration is complete, the "deleted" column will be available in the Chat, Journey, Message, and Prompt tables. Other parts of the application may use this column to implement soft deletion of records.

Developer Questions:
- What is the purpose of the "deleted" column?
- How is the "deleted" column used in the rest of the application?
- What happens if the migration is run multiple times?

