/*
  Warnings:

  - You are about to drop the column `user_id` on the `participants` table. All the data in the column will be lost.
  - Added the required column `userId` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "website" TEXT,
    CONSTRAINT "participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_participants" ("bio", "id", "website") SELECT "bio", "id", "website" FROM "participants";
DROP TABLE "participants";
ALTER TABLE "new_participants" RENAME TO "participants";
CREATE UNIQUE INDEX "participants_userId_key" ON "participants"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
