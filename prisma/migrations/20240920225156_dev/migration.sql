/*
  Warnings:

  - Added the required column `customCategory` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Income" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "incomeSource" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "customCategory" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Income_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("amount", "category", "createdAt", "date", "description", "id", "incomeSource", "userId", "workspaceId") SELECT "amount", "category", "createdAt", "date", "description", "id", "incomeSource", "userId", "workspaceId" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
CREATE INDEX "Income_userId_idx" ON "Income"("userId");
CREATE INDEX "Income_workspaceId_idx" ON "Income"("workspaceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
