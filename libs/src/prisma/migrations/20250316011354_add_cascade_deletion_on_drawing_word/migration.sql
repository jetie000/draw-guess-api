-- DropForeignKey
ALTER TABLE "DrawingWord" DROP CONSTRAINT "DrawingWord_typeId_fkey";

-- AddForeignKey
ALTER TABLE "DrawingWord" ADD CONSTRAINT "DrawingWord_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DrawingWordType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
