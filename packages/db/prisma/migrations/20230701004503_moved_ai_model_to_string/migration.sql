/*
  Warnings:

  - You are about to drop the column `aiModelId` on the `Sidekick` table. All the data in the column will be lost.
  - You are about to drop the `AIModel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aiModel` to the `Sidekick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sidekick" DROP CONSTRAINT "Sidekick_aiModelId_fkey";

-- AlterTable
ALTER TABLE "Sidekick" DROP COLUMN "aiModelId",
ADD COLUMN     "aiModel" TEXT NOT NULL;

-- DropTable
DROP TABLE "AIModel";
