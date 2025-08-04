-- Create UserRole enum only
-- Run this in your Supabase SQL editor

CREATE TYPE "UserRole" AS ENUM (
  'USER',
  'MODERATOR',
  'ADMIN'
); 