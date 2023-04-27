# README

## TODO Items
- None

## Known Issues
- None

## Description
This file contains SQL code to create a table named "Answer" and add a foreign key constraint to it.

## CreateTable
The `CreateTable` section contains SQL code to create a table named "Answer" with the following columns:
- id (serial, not null)
- promptId (integer, not null)
- text (text, not null)

The primary key constraint is set on the "id" column.

## AddForeignKey
The `AddForeignKey` section contains SQL code to add a foreign key constraint to the "Answer" table. The foreign key references the "id" column of the "Prompt" table and is set on the "promptId" column of the "Answer" table. The `ON DELETE RESTRICT ON UPDATE CASCADE` clause is used to specify the behavior of the foreign key constraint.