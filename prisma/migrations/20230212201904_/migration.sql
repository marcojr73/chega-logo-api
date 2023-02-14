/*
  Warnings:

  - You are about to drop the column `profit` on the `revenues` table. All the data in the column will be lost.
  - Added the required column `value` to the `revenues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "revenues" DROP COLUMN "profit",
ADD COLUMN     "value" INTEGER NOT NULL;
