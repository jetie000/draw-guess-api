-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "isSimplified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isPrivate" SET DEFAULT true;
