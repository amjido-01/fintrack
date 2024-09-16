/*
  Warnings:

  - Added the required column `description` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastActiveAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Workspace_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Workspace" ("createdAt", "createdById", "id", "lastActiveAt", "updatedAt", "workspaceName") SELECT "createdAt", "createdById", "id", "lastActiveAt", "updatedAt", "workspaceName" FROM "Workspace";
DROP TABLE "Workspace";
ALTER TABLE "new_Workspace" RENAME TO "Workspace";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
