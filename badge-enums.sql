-- Create the missing enum types for the badge system
-- Run this in your Supabase SQL editor

-- Create BadgeCategory enum
CREATE TYPE "BadgeCategory" AS ENUM (
  'ROLE',
  'ACHIEVEMENT', 
  'MILESTONE',
  'SPECIAL',
  'STREAK',
  'COMMUNITY'
);

-- Create BadgeTriggerType enum
CREATE TYPE "BadgeTriggerType" AS ENUM (
  'FIRST_RECIPE',
  'FIRST_LIKE',
  'FIRST_TRIED',
  'RECIPE_COUNT',
  'LIKE_COUNT',
  'TRIED_COUNT',
  'BOOKMARK_COUNT',
  'LOGIN_STREAK',
  'MANUAL',
  'BETA_USER',
  'COMMUNITY_CONTRIBUTION'
);

-- Create UserRole enum
CREATE TYPE "UserRole" AS ENUM (
  'USER',
  'MODERATOR',
  'ADMIN'
);

-- Update the Badge table to use the enum types
ALTER TABLE "Badge" ALTER COLUMN "category" TYPE "BadgeCategory" USING "category"::"BadgeCategory";
ALTER TABLE "Badge" ALTER COLUMN "triggerType" TYPE "BadgeTriggerType" USING "triggerType"::"BadgeTriggerType";

-- Update the User table to use the UserRole enum
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole" USING "role"::"UserRole"; 