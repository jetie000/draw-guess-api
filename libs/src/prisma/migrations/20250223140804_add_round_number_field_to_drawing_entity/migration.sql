/*
  Warnings:

  - Added the required column `roundNumber` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "roundNumber" INTEGER NOT NULL;
