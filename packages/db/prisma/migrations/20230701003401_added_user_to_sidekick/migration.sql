/*
  Warnings:

  - Added the required column `userId` to the `Sidekick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sidekick" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sidekick" ADD CONSTRAINT "Sidekick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
