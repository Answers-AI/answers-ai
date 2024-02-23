/*
  Warnings:

  - Added the required column `chatflow` to the `Sidekick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sidekick" ADD COLUMN     "chatflow" JSONB NOT NULL;
