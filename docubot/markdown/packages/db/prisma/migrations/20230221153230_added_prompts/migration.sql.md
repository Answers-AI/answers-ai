## TODO Items
- None

## Known Issues
- None

## Description
This file contains the SQL code to create a table named "Prompt" and add a foreign key constraint to the "userId" column referencing the "id" column of the "User" table.

## CreateTable
```
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);
```

## AddForeignKey
```
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```