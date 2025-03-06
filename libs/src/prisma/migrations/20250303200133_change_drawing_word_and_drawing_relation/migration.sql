/*
  Warnings:

  - You are about to drop the column `drawingId` on the `DrawingWord` table. All the data in the column will be lost.
  - Added the required column `wordId` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DrawingWord" DROP CONSTRAINT "DrawingWord_drawingId_fkey";

-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "wordId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DrawingWord" DROP COLUMN "drawingId";

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "DrawingWord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
