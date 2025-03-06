/*
  Warnings:

  - You are about to drop the `GameWordType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameWordType" DROP CONSTRAINT "GameWordType_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameWordType" DROP CONSTRAINT "GameWordType_wordTypeId_fkey";

-- DropTable
DROP TABLE "GameWordType";

-- CreateTable
CREATE TABLE "_DrawingWordTypeToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DrawingWordTypeToGame_AB_unique" ON "_DrawingWordTypeToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_DrawingWordTypeToGame_B_index" ON "_DrawingWordTypeToGame"("B");

-- AddForeignKey
ALTER TABLE "_DrawingWordTypeToGame" ADD CONSTRAINT "_DrawingWordTypeToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "DrawingWordType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DrawingWordTypeToGame" ADD CONSTRAINT "_DrawingWordTypeToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
