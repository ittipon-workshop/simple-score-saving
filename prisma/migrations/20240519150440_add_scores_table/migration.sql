-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "highest_score" INTEGER NOT NULL,
    "update_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
