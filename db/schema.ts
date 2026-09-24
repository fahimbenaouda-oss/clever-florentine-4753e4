import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatarPreset: text("avatar_preset").notNull().default("cyber-warrior"),
  avatarArmor: text("avatar_armor").notNull().default("nano-vest"),
  avatarColor: text("avatar_color").notNull().default("neon-cyan"),
  avatarAura: text("avatar_aura").notNull().default("electric-blue"),
  currentLevel: integer("current_level").notNull().default(1),
  totalXp: integer("total_xp").notNull().default(0),
  currentLevelXp: integer("current_level_xp").notNull().default(0),
  xpToNextLevel: integer("xp_to_next_level").notNull().default(1000),
  streakDays: integer("streak_days").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  workoutsThisWeek: integer("workouts_this_week").notNull().default(0),
  totalMinutes: integer("total_minutes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  firstName: text("first_name").notNull(),
  age: integer("age").notNull(),
  mainGoal: text("main_goal").notNull(), // 'musculation', 'remise_en_forme', 'perte_de_poids', 'endurance', 'actif'
  fitnessLevel: text("fitness_level").notNull(), // 'debutant', 'intermediaire', 'avance'
  trainingLocation: text("training_location").notNull(), // 'maison', 'salle', 'exterieur'
  equipment: text("equipment").notNull().default("aucun"),
  sessionsPerWeek: integer("sessions_per_week").notNull().default(3),
  preferredDuration: integer("preferred_duration").notNull().default(30), // 15, 30, 45, 60
  favoriteActivities: text("favorite_activities"),
  physicalLimitations: text("physical_limitations"),
  healthDisclaimerAccepted: boolean("health_disclaimer_accepted").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  muscleGroup: text("muscle_group").notNull(),
  difficulty: text("difficulty").notNull(), // 'debutant', 'intermediaire', 'avance'
  equipmentRequired: text("equipment_required").notNull().default("aucun"),
  defaultSets: integer("default_sets").notNull().default(3),
  defaultReps: text("default_reps").notNull().default("12"),
  durationSeconds: integer("duration_seconds").default(0),
  restSeconds: integer("rest_seconds").notNull().default(30),
  instructions: text("instructions").notNull(),
  mistakesToAvoid: text("mistakes_to_avoid").notNull(),
  contraindications: text("contraindications").notNull(),
  iconName: text("icon_name"),
  imageUrl: text("image_url"),
  xpReward: integer("xp_reward").notNull().default(50),
  category: text("category").notNull().default("entrainement"), // 'echauffement', 'entrainement', 'calme'
});

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  targetGoal: text("target_goal").notNull(),
  fitnessLevel: text("fitness_level").notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(30),
  xpReward: integer("xp_reward").notNull().default(300),
  equipment: text("equipment").notNull().default("aucun"),
  isDailyPick: boolean("is_daily_pick").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull().references(() => workouts.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  orderIndex: integer("order_index").notNull().default(0),
  phase: text("phase").notNull().default("entrainement"), // 'echauffement', 'entrainement', 'calme'
  sets: integer("sets").notNull().default(3),
  reps: text("reps").notNull().default("12"),
  durationSeconds: integer("duration_seconds").default(0),
  restSeconds: integer("rest_seconds").notNull().default(30),
});

export const completedWorkouts = pgTable("completed_workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  workoutId: integer("workout_id").references(() => workouts.id),
  workoutTitle: text("workout_title").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  exercisesCompleted: integer("exercises_completed").notNull(),
  totalExercises: integer("total_exercises").notNull(),
  xpEarned: integer("xp_earned").notNull(),
  caloriesBurned: integer("calories_burned"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const xpTransactions = pgTable("xp_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  category: text("category").notNull(), // 'workout', 'exercise', 'challenge', 'streak', 'bonus'
  createdAt: timestamp("created_at").defaultNow(),
});

export const levels = pgTable("levels", {
  level: integer("level").primaryKey(),
  title: text("title").notNull(),
  requiredXp: integer("required_xp").notNull(),
  unlockableTitle: text("unlockable_title"),
  unlockableCosmetic: text("unlockable_cosmetic"),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  xpBonus: integer("xp_bonus").notNull().default(100),
  requirementType: text("requirement_type").notNull(), // 'first_workout', 'streak', 'workouts_count', 'cardio_count', 'level_reached'
  requirementValue: integer("requirement_value").notNull().default(1),
});

export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  badgeId: integer("badge_id").notNull().references(() => badges.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  xpReward: integer("xp_reward").notNull(),
  badgeRewardSlug: text("badge_reward_slug"),
  challengeType: text("challenge_type").notNull(), // 'weekly_workouts', 'activity_minutes', 'streak_days'
  targetValue: integer("target_value").notNull(),
  expiresAt: timestamp("expires_at"),
});

export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id),
  currentProgress: integer("current_progress").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  claimedAt: timestamp("claimed_at"),
});

export const friendships = pgTable("friendships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  friendName: text("friend_name").notNull(),
  friendAvatar: text("friend_avatar").notNull(),
  friendLevel: integer("friend_level").notNull(),
  friendXp: integer("friend_xp").notNull(),
  streak: integer("streak").notNull().default(1),
  status: text("status").notNull().default("accepted"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  planTier: text("plan_tier").notNull().default("free"), // 'free', 'standard', 'premium'
  status: text("status").notNull().default("active"),
  monthlyPriceCents: integer("monthly_price_cents").notNull().default(0),
  startedAt: timestamp("started_at").defaultNow(),
  endsAt: timestamp("ends_at"),
});
