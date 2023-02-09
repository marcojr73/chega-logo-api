/*
  Warnings:

  - Added the required column `teste` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "places" ADD COLUMN     "teste" TEXT NOT NULL;
