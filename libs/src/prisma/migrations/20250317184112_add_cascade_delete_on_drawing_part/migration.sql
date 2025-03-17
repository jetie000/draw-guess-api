-- DropForeignKey
ALTER TABLE "DrawingPart" DROP CONSTRAINT "DrawingPart_drawingId_fkey";

-- AddForeignKey
ALTER TABLE "DrawingPart" ADD CONSTRAINT "DrawingPart_drawingId_fkey" FOREIGN KEY ("drawingId") REFERENCES "Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
