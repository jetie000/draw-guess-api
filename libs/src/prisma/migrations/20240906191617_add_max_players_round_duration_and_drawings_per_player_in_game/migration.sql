/*
  Warnings:

  - You are about to drop the column `fillColor` on the `DrawingPart` table. All the data in the column will be lost.
  - You are about to drop the column `strokeColor` on the `DrawingPart` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DrawingPart` table. All the data in the column will be lost.
  - You are about to drop the column `isEnded` on the `Game` table. All the data in the column will be lost.
  - Added the required column `color` to the `DrawingPart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drawingsPerPlayer` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundDuration` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DrawingPart" DROP COLUMN "fillColor",
DROP COLUMN "strokeColor",
DROP COLUMN "type",
ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "isEnded",
ADD COLUMN     "drawingsPerPlayer" INTEGER NOT NULL,
ADD COLUMN     "maxPlayers" INTEGER NOT NULL,
ADD COLUMN     "roundDuration" INTEGER NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GamePlayer" ALTER COLUMN "points" SET DEFAULT 0;
