Filepath: packages/db/src/client.ts
Overview: Summary:
This file contains code that interacts with the Prisma ORM to handle soft deletes for certain models. It defines a global Prisma client and modifies incoming queries to handle soft deletes for specific models.

Import statements:
The file imports the PrismaClient from '../generated/prisma-client' to interact with the Prisma ORM.

Script Summary:
The script defines a global Prisma client and modifies incoming queries to handle soft deletes for specific models.

Internal Functions:
None.

External Functions:
- prisma: This function returns the global Prisma client or creates a new one if it doesn't exist.

Interaction Summary:
This file interacts with the Prisma ORM to handle soft deletes for specific models. It modifies incoming queries to handle soft deletes for these models.

Developer Questions:
- What models are included in the SOFT_DELETE_MODELS array?
- What is the purpose of the prisma.$use() function?
- How does the script handle soft deletes for specific models?
- What happens if a soft deleted record is updated?

