-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "access_token" TEXT,
    "access_token_time" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "create_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_verify" BOOLEAN NOT NULL DEFAULT false,
    "verify_time" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "is_disable" BOOLEAN NOT NULL DEFAULT false,
    "disable_time" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00'
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
