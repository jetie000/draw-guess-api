-- CreateTable
CREATE TABLE "GameWordType" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "wordTypeId" INTEGER NOT NULL,

    CONSTRAINT "GameWordType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameWordType" ADD CONSTRAINT "GameWordType_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameWordType" ADD CONSTRAINT "GameWordType_wordTypeId_fkey" FOREIGN KEY ("wordTypeId") REFERENCES "DrawingWordType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
