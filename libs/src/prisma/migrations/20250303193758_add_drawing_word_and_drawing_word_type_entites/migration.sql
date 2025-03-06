-- CreateTable
CREATE TABLE "DrawingWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "drawingId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "DrawingWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrawingWordType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "DrawingWordType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DrawingWord" ADD CONSTRAINT "DrawingWord_drawingId_fkey" FOREIGN KEY ("drawingId") REFERENCES "Drawing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawingWord" ADD CONSTRAINT "DrawingWord_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DrawingWordType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
