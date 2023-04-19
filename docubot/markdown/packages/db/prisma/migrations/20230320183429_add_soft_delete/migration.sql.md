Summary:
This file is a SQL migration script that adds a "deleted" column to four tables in the database: Chat, Journey, Message, and Prompt. The "deleted" column is of type BOOLEAN and has a default value of false.

Dependencies:
This file depends on the Prisma ORM to interact with the database.

Code Summary:
The code consists of four ALTER TABLE statements, each adding a "deleted" column to a different table in the database. The "deleted" column is of type BOOLEAN and has a default value of false.

Interaction Summary:
This file interacts with the database by modifying the schema of four tables: Chat, Journey, Message, and Prompt. Once the migration is applied, these tables will have a "deleted" column that can be used to mark records as deleted without actually deleting them from the database.

Developer Questions:
- What happens if we try to apply this migration to a database that already has a "deleted" column in one or more of these tables?
- How do we query for records that have been "soft deleted" using the "deleted" column?
- What happens if we try to delete a record that has already been "soft deleted" using the "deleted" column?