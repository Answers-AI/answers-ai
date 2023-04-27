# README

## TODO Items
- None

## Known Issues
- None

## Description
This file contains SQL commands for creating and altering tables in a database. The commands include:
- `ALTER TABLE "User" ADD COLUMN "organizationId" TEXT, ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';`
- `CREATE TABLE "Organization" (...)`
- `ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;`

These commands are used for adding columns to the "User" table, creating a new "Organization" table, and adding a foreign key constraint between the two tables.