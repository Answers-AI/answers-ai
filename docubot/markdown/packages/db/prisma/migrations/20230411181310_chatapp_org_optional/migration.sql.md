# README

## TODO Items
- None

## Known Issues
- The primary key for the `ChatApp` table will be changed. If it partially fails, the table could be left without primary key constraint.
- The `id` column on the `ChatApp` table would be dropped and recreated. This will lead to data loss if there is data in the column.
- You are about to drop the column `appSettings` on the `ChatApp` table. All the data in the column will be lost.
- You are about to drop the column `email` on the `ChatApp` table. All the data in the column will be lost.

This file contains SQL code that drops an index and alters the `ChatApp` table in a PostgreSQL database. The purpose of these changes is to modify the table's primary key and columns. Please exercise caution when executing this code, as it may result in data loss.