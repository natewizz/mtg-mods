-- Update Admin Account from MTGMODS to CANTRIPPED
-- Based on the exact Supabase entry provided

-- First, let's see the current admin account
SELECT id, name, username, email, role, "createdAt", "updatedAt" 
FROM "public"."User" 
WHERE id = 'cmcxgu6xz0000l3043ksq16rc';

-- Update the admin account with new branding
UPDATE "public"."User" 
SET 
  name = 'CANTRIPPED',
  username = 'CANTRIPPED',
  email = 'cantrippedofficial@gmail.com',
  bio = '- Moderator of Cantripped
- MTG nerd',
  "linkUrl" = 'https://www.cantripped.com',
  "linkText" = 'CANTRIPPED',
  "updatedAt" = NOW()
WHERE id = 'cmcxgu6xz0000l3043ksq16rc';

-- Verify the update
SELECT id, name, username, email, bio, "linkUrl", "linkText", role, "createdAt", "updatedAt" 
FROM "public"."User" 
WHERE id = 'cmcxgu6xz0000l3043ksq16rc';

-- Check if there are any other references to the old username/email in other tables
-- (This is just for verification - no updates needed)

-- Check ContentReport table for reporter references (via reporterId)
SELECT COUNT(*) as content_reports_with_old_admin
FROM "public"."ContentReport" 
WHERE "reporterId" = 'cmcxgu6xz0000l3043ksq16rc';

-- Check UserStrike table for admin references
SELECT COUNT(*) as user_strikes_with_old_admin
FROM "public"."UserStrike" 
WHERE "adminId" = 'cmcxgu6xz0000l3043ksq16rc';

-- Check AdminNotification table for admin references
SELECT COUNT(*) as admin_notifications_with_old_admin
FROM "public"."AdminNotification" 
WHERE "adminId" = 'cmcxgu6xz0000l3043ksq16rc';

-- Check UserBadge table for awarded badges
SELECT COUNT(*) as badges_awarded_by_old_admin
FROM "public"."UserBadge" 
WHERE "awardedBy" = 'cmcxgu6xz0000l3043ksq16rc';
