CREATE TABLE "badges" (
	"id" serial PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"xp_bonus" integer DEFAULT 100 NOT NULL,
	"requirement_type" text NOT NULL,
	"requirement_value" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"xp_reward" integer NOT NULL,
	"badge_reward_slug" text,
	"challenge_type" text NOT NULL,
	"target_value" integer NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "completed_workouts" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"workout_id" integer,
	"workout_title" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	"exercises_completed" integer NOT NULL,
	"total_exercises" integer NOT NULL,
	"xp_earned" integer NOT NULL,
	"calories_burned" integer,
	"completed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"muscle_group" text NOT NULL,
	"difficulty" text NOT NULL,
	"equipment_required" text DEFAULT 'aucun' NOT NULL,
	"default_sets" integer DEFAULT 3 NOT NULL,
	"default_reps" text DEFAULT '12' NOT NULL,
	"duration_seconds" integer DEFAULT 0,
	"rest_seconds" integer DEFAULT 30 NOT NULL,
	"instructions" text NOT NULL,
	"mistakes_to_avoid" text NOT NULL,
	"contraindications" text NOT NULL,
	"icon_name" text,
	"image_url" text,
	"xp_reward" integer DEFAULT 50 NOT NULL,
	"category" text DEFAULT 'entrainement' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "friendships" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"friend_name" text NOT NULL,
	"friend_avatar" text NOT NULL,
	"friend_level" integer NOT NULL,
	"friend_xp" integer NOT NULL,
	"streak" integer DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'accepted' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"level" integer PRIMARY KEY,
	"title" text NOT NULL,
	"required_xp" integer NOT NULL,
	"unlockable_title" text,
	"unlockable_cosmetic" text
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"plan_tier" text DEFAULT 'free' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"monthly_price_cents" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp DEFAULT now(),
	"ends_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"badge_id" integer NOT NULL,
	"unlocked_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_challenges" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"challenge_id" integer NOT NULL,
	"current_progress" integer DEFAULT 0 NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"claimed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"first_name" text NOT NULL,
	"age" integer NOT NULL,
	"main_goal" text NOT NULL,
	"fitness_level" text NOT NULL,
	"training_location" text NOT NULL,
	"equipment" text DEFAULT 'aucun' NOT NULL,
	"sessions_per_week" integer DEFAULT 3 NOT NULL,
	"preferred_duration" integer DEFAULT 30 NOT NULL,
	"favorite_activities" text,
	"physical_limitations" text,
	"health_disclaimer_accepted" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"avatar_preset" text DEFAULT 'cyber-warrior' NOT NULL,
	"avatar_armor" text DEFAULT 'nano-vest' NOT NULL,
	"avatar_color" text DEFAULT 'neon-cyan' NOT NULL,
	"avatar_aura" text DEFAULT 'electric-blue' NOT NULL,
	"current_level" integer DEFAULT 1 NOT NULL,
	"total_xp" integer DEFAULT 0 NOT NULL,
	"current_level_xp" integer DEFAULT 0 NOT NULL,
	"xp_to_next_level" integer DEFAULT 1000 NOT NULL,
	"streak_days" integer DEFAULT 0 NOT NULL,
	"best_streak" integer DEFAULT 0 NOT NULL,
	"workouts_this_week" integer DEFAULT 0 NOT NULL,
	"total_minutes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "workout_exercises" (
	"id" serial PRIMARY KEY,
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"order_index" integer DEFAULT 0 NOT NULL,
	"phase" text DEFAULT 'entrainement' NOT NULL,
	"sets" integer DEFAULT 3 NOT NULL,
	"reps" text DEFAULT '12' NOT NULL,
	"duration_seconds" integer DEFAULT 0,
	"rest_seconds" integer DEFAULT 30 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workouts" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"subtitle" text,
	"description" text,
	"target_goal" text NOT NULL,
	"fitness_level" text NOT NULL,
	"duration_minutes" integer DEFAULT 30 NOT NULL,
	"xp_reward" integer DEFAULT 300 NOT NULL,
	"equipment" text DEFAULT 'aucun' NOT NULL,
	"is_daily_pick" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "xp_transactions" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"reason" text NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "completed_workouts" ADD CONSTRAINT "completed_workouts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "completed_workouts" ADD CONSTRAINT "completed_workouts_workout_id_workouts_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id");--> statement-breakpoint
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_badges_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id");--> statement-breakpoint
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_challenge_id_challenges_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id");--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_workouts_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id");--> statement-breakpoint
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_exercises_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id");--> statement-breakpoint
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");