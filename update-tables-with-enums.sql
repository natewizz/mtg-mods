-- Update tables to use enum types
-- Run this AFTER creating all the enums above

-- Update the Badge table to use the enum types
ALTER TABLE "Badge" ALTER COLUMN "category" TYPE "BadgeCategory" USING "category"::"BadgeCategory";
ALTER TABLE "Badge" ALTER COLUMN "triggerType" TYPE "BadgeTriggerType" USING "triggerType"::"BadgeTriggerType";

-- Update the User table to use the UserRole enum
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole" USING "role"::"UserRole"; 