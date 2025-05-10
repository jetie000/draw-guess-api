-- CreateTable
CREATE TABLE "AchievementType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level1Amount" INTEGER NOT NULL,
    "level2Amount" INTEGER NOT NULL,
    "level3Amount" INTEGER NOT NULL,

    CONSTRAINT "AchievementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AchievementType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
