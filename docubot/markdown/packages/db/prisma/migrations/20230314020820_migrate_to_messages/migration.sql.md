## README

### TODO Items
- None

### Known Issues
- None

### Description
This file contains SQL commands for altering and creating tables in a database. 

### Warnings
- Dropping the `Answer` table will result in the loss of all data it contains.
- Dropping the `Prompt` table will result in the loss of all data it contains.
- Dropping the `_PromptToUser` table will result in the loss of all data it contains.

### SQL Commands
The file contains the following SQL commands:
- `ALTER TABLE "Answer" DROP CONSTRAINT "Answer_promptId_fkey";`
- `ALTER TABLE "_PromptToUser" DROP CONSTRAINT "_PromptToUser_A_fkey";`
- `ALTER TABLE "_PromptToUser" DROP CONSTRAINT "_PromptToUser_B_fkey";`
- `ALTER TABLE "AppService" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`
- `ALTER TABLE "AppSettings" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`
- `ALTER TABLE "JiraProjectSetting" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`
- `ALTER TABLE "JiraSettings" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`
- `ALTER TABLE "User" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`
- `DROP TABLE "Answer";`
- `DROP TABLE "Prompt";`
- `DROP TABLE "_PromptToUser";`
- `CREATE TABLE "Chat" ("id" SERIAL NOT NULL, "prompt" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Chat_pkey" PRIMARY KEY ("id"));`
- `CREATE TABLE "Message" ("id" SERIAL NOT NULL, "completionId" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'assistant', "content" TEXT NOT NULL, "userId" INTEGER NOT NULL, "chatId" INTEGER NOT NULL, "usages" INTEGER NOT NULL DEFAULT 0, "likes" INTEGER NOT NULL DEFAULT 0, "dislikes" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Message_pkey" PRIMARY KEY ("id"));`
- `CREATE TABLE "_ChatToUser" ("A" INTEGER NOT NULL, "B" INTEGER NOT NULL);`
- `CREATE UNIQUE INDEX "_ChatToUser_AB_unique" ON "_ChatToUser"("A", "B");`
- `CREATE INDEX "_ChatToUser_B_index" ON "_ChatToUser"("B");`
- `ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;`
- `ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;`
- `ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;`
- `ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;`