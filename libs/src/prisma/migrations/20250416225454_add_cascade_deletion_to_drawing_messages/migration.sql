-- DropForeignKey
ALTER TABLE "DrawingMessage" DROP CONSTRAINT "DrawingMessage_drawingId_fkey";

-- DropForeignKey
ALTER TABLE "DrawingMessage" DROP CONSTRAINT "DrawingMessage_gamePlayerId_fkey";

-- AddForeignKey
ALTER TABLE "DrawingMessage" ADD CONSTRAINT "DrawingMessage_gamePlayerId_fkey" FOREIGN KEY ("gamePlayerId") REFERENCES "GamePlayer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawingMessage" ADD CONSTRAINT "DrawingMessage_drawingId_fkey" FOREIGN KEY ("drawingId") REFERENCES "Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
