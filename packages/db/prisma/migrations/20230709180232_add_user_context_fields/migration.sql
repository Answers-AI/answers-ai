-- DropForeignKey
ALTER TABLE "ContextField" DROP CONSTRAINT "ContextField_organizationId_fkey";

-- AlterTable
ALTER TABLE "ContextField" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ContextField" ADD CONSTRAINT "ContextField_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContextField" ADD CONSTRAINT "ContextField_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
