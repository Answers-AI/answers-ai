/*
  Warnings:

  - You are about to drop the column `userId` on the `Sidekick` table. All the data in the column will be lost.
  - Made the column `aiModelId` on table `Sidekick` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Sidekick" DROP CONSTRAINT "Sidekick_aiModelId_fkey";

-- DropForeignKey
ALTER TABLE "Sidekick" DROP CONSTRAINT "Sidekick_userId_fkey";

-- AlterTable
ALTER TABLE "Sidekick" DROP COLUMN "userId",
ALTER COLUMN "aiModelId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_SidekickToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SidekickToUser_AB_unique" ON "_SidekickToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SidekickToUser_B_index" ON "_SidekickToUser"("B");

-- AddForeignKey
ALTER TABLE "Sidekick" ADD CONSTRAINT "Sidekick_aiModelId_fkey" FOREIGN KEY ("aiModelId") REFERENCES "AIModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SidekickToUser" ADD CONSTRAINT "_SidekickToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Sidekick"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SidekickToUser" ADD CONSTRAINT "_SidekickToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
