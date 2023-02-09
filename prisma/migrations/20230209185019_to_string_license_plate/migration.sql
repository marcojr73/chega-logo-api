/*
  Warnings:

  - Added the required column `userId` to the `revenues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "revenues" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trucks" ALTER COLUMN "year" SET DATA TYPE TEXT,
ALTER COLUMN "efficiency" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
