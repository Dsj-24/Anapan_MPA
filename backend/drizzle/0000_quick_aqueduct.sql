CREATE TABLE "meeting_prep" (
	"event_id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text,
	"company" text,
	"role_line" text,
	"meeting_title" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"prep_json" jsonb NOT NULL,
	"context_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
