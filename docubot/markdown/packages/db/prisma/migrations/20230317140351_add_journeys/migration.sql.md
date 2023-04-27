# README

## TODO Items
- None

## Known Issues
- None

## Description
This file contains SQL code for creating and altering tables, as well as adding foreign keys and indexes. The tables created are "Journey" and "_JourneyToUser", and the "Chat" table is altered to add a "journeyId" column. The foreign keys added link the tables together, and the indexes improve query performance. 

## SQL Code
- ALTER TABLE "Chat" ADD COLUMN "journeyId" TEXT;
- CREATE TABLE "Journey" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "filters" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);
- CREATE TABLE "_JourneyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);
- CREATE UNIQUE INDEX "_JourneyToUser_AB_unique" ON "_JourneyToUser"("A", "B");
- CREATE INDEX "_JourneyToUser_B_index" ON "_JourneyToUser"("B");
- ALTER TABLE "Chat" ADD CONSTRAINT "Chat_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
- ALTER TABLE "_JourneyToUser" ADD CONSTRAINT "_JourneyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
- ALTER TABLE "_JourneyToUser" ADD CONSTRAINT "_JourneyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;