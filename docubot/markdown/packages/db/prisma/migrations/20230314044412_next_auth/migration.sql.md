# README for SQL Migration Script

## TODO Items
- None

## Known Issues
- Dropping columns will result in loss of data
- Changing primary key for User table may result in partial failure and loss of primary key constraint
- Adding required column to Chat table without default value is not possible if table is not empty

## Description
This SQL migration script contains a series of SQL commands to alter the structure of the database. It includes dropping columns, altering tables, creating new tables, and adding foreign key constraints.

## Usage
This script should be executed on the database to apply the changes to the structure. It is recommended to backup the database before executing the script.

## Warnings
- You are about to drop the column `prompt` on the `Chat` table. All the data in the column will be lost.
- You are about to drop the column `completionId` on the `Message` table. All the data in the column will be lost.
- You are about to drop the column `usages` on the `Message` table. All the data in the column will be lost.
- The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
- You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
- Added the required column `promptId` to the `Chat` table without a default value. This is not possible if the table is not empty.