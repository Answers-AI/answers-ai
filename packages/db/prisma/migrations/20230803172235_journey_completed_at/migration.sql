/*
  Warnings:

  - You are about to drop the column `completed` on the `Journey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Journey" DROP COLUMN "completed",
ADD COLUMN     "completedAt" TIMESTAMP(3);
