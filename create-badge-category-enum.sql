-- Create BadgeCategory enum only
-- Run this in your Supabase SQL editor

CREATE TYPE "BadgeCategory" AS ENUM (
  'ROLE',
  'ACHIEVEMENT', 
  'MILESTONE',
  'SPECIAL',
  'STREAK',
  'COMMUNITY'
); 