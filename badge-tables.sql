-- Complete SQL to create Badge and UserBadge tables in Supabase
-- Run this in your Supabase SQL editor

-- Create Badge table
CREATE TABLE "Badge" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL UNIQUE,
  "displayName" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "triggerType" TEXT NOT NULL,
  "triggerValue" INTEGER,
  "isManual" BOOLEAN NOT NULL DEFAULT false,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- Create UserBadge table
CREATE TABLE "UserBadge" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "badgeId" TEXT NOT NULL,
  "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "awardedBy" TEXT,
  
  CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- Add unique constraint for UserBadge
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_badgeId_unique" 
  UNIQUE ("userId", "badgeId");

-- Add foreign key constraints
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;

ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" 
  FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE;

ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_awardedBy_fkey" 
  FOREIGN KEY ("awardedBy") REFERENCES "User"("id") ON DELETE SET NULL;

-- Add indexes for performance
CREATE INDEX "Badge_category_idx" ON "Badge"("category");
CREATE INDEX "Badge_triggerType_idx" ON "Badge"("triggerType");
CREATE INDEX "UserBadge_userId_idx" ON "UserBadge"("userId");
CREATE INDEX "UserBadge_badgeId_idx" ON "UserBadge"("badgeId");
CREATE INDEX "UserBadge_earnedAt_idx" ON "UserBadge"("earnedAt");

-- Update User table to add role enum if not already done
-- (This might already be done from previous migrations)
ALTER TABLE "User" ALTER COLUMN "role" TYPE TEXT;
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- Add isDisabled column if not already present
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isDisabled" BOOLEAN DEFAULT false; 