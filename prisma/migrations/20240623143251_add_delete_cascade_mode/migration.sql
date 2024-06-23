-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attendeees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "registration_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendeees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "attendeees_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_attendeees" ("event_id", "id", "participant_id", "registration_date") SELECT "event_id", "id", "participant_id", "registration_date" FROM "attendeees";
DROP TABLE "attendeees";
ALTER TABLE "new_attendeees" RENAME TO "attendeees";
CREATE UNIQUE INDEX "attendeees_event_id_participant_id_key" ON "attendeees"("event_id", "participant_id");
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "comment_text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comments_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("comment_text", "created_at", "event_id", "id", "user_id") SELECT "comment_text", "created_at", "event_id", "id", "user_id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organizer_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_date" DATETIME NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "max_participants" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_events" ("created_at", "description", "event_date", "event_name", "id", "location", "max_participants", "organizer_id", "updated_at") SELECT "created_at", "description", "event_date", "event_name", "id", "location", "max_participants", "organizer_id", "updated_at" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE TABLE "new_organizers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "website" TEXT,
    "organization_name" TEXT,
    CONSTRAINT "organizers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_organizers" ("bio", "id", "organization_name", "userId", "website") SELECT "bio", "id", "organization_name", "userId", "website" FROM "organizers";
DROP TABLE "organizers";
ALTER TABLE "new_organizers" RENAME TO "organizers";
CREATE UNIQUE INDEX "organizers_userId_key" ON "organizers"("userId");
CREATE TABLE "new_participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "website" TEXT,
    CONSTRAINT "participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_participants" ("bio", "id", "userId", "website") SELECT "bio", "id", "userId", "website" FROM "participants";
DROP TABLE "participants";
ALTER TABLE "new_participants" RENAME TO "participants";
CREATE UNIQUE INDEX "participants_userId_key" ON "participants"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
