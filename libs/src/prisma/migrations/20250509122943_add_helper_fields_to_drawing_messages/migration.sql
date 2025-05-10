/*
  Warnings:

  - Added the required column `isFirst` to the `DrawingMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGuessed` to the `DrawingMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondsPassedAfterRound` to the `DrawingMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DrawingMessage" ADD COLUMN     "isFirst" BOOLEAN NOT NULL,
ADD COLUMN     "isGuessed" BOOLEAN NOT NULL,
ADD COLUMN     "secondsPassedAfterRound" DOUBLE PRECISION NOT NULL;
