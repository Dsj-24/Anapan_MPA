import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const meetingPrep = pgTable("meeting_prep", {
  eventId: text("event_id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  company: text("company"),
  roleLine: text("role_line"),
  meetingTitle: text("meeting_title").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  prepJson: jsonb("prep_json").notNull(),
  contextJson: jsonb("context_json").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
