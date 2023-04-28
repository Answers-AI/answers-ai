Summary:
This file contains code that modifies the behavior of the Prisma ORM (Object-Relational Mapping) library. Specifically, it adds soft-delete functionality to certain models, allowing records to be marked as deleted without actually being removed from the database.

Import statements:
The file imports the PrismaClient class from a generated Prisma client file.

Script Summary:
The file exports a PrismaClient instance that is either the global.prisma object or a new instance of PrismaClient. It also defines an array of model names that should have soft-delete functionality enabled. The file then adds middleware functions to the PrismaClient instance that modify the behavior of certain query types to implement soft-delete functionality.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file interacts with the rest of the application by providing a modified PrismaClient instance that has soft-delete functionality enabled for certain models. This allows other parts of the application to mark records as deleted without actually removing them from the database.

Developer Questions:
- What models have soft-delete functionality enabled?
- How does the soft-delete functionality work?
- What query types are modified to implement soft-delete functionality?

Known Issues and TODOs:
- None