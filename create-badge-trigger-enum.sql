-- Create BadgeTriggerType enum only
-- Run this in your Supabase SQL editor

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