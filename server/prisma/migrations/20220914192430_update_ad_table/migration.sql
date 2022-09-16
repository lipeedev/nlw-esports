/*
  Warnings:

  - Added the required column `discord` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourEnd` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourStart` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekDays` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearsPlaying` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ad_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("gameId", "id") SELECT "gameId", "id" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
