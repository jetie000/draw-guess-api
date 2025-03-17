-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_gamePlayerId_fkey";

-- AlterTable
ALTER TABLE "_DrawingWordTypeToGame" ADD CONSTRAINT "_DrawingWordTypeToGame_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DrawingWordTypeToGame_AB_unique";

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_gamePlayerId_fkey" FOREIGN KEY ("gamePlayerId") REFERENCES "GamePlayer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
