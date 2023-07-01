-- CreateTable
CREATE TABLE "Sidekick" (
    "id" SERIAL NOT NULL,
    "departments" TEXT[],
    "label" TEXT NOT NULL,
    "placeholder" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "frequency" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "presence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxCompletionTokens" INTEGER NOT NULL DEFAULT 500,
    "aiModelId" INTEGER,
    "systemPromptTemplate" TEXT,
    "userPromptTemplate" TEXT,
    "contextStringRender" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sidekick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIModel" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "AIModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sidekick" ADD CONSTRAINT "Sidekick_aiModelId_fkey" FOREIGN KEY ("aiModelId") REFERENCES "AIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
