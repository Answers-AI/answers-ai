/*
  Warnings:

  - The primary key for the `Sidekick` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_SidekickFavoritedBy" DROP CONSTRAINT "_SidekickFavoritedBy_A_fkey";

-- AlterTable
ALTER TABLE "Sidekick" DROP CONSTRAINT "Sidekick_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sidekick_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sidekick_id_seq";

-- AlterTable
ALTER TABLE "_SidekickFavoritedBy" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_SidekickFavoritedBy" ADD CONSTRAINT "_SidekickFavoritedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Sidekick"("id") ON DELETE CASCADE ON UPDATE CASCADE;
