## TODO Items
- None

## Known Issues
- None

## Description
This file contains a single SQL statement for altering a table named "Account". The statement adds a new column named "refresh_token_expires_in" of data type INTEGER to the table.

## SQL Statement
```
ALTER TABLE "Account" ADD COLUMN "refresh_token_expires_in" INTEGER;
```