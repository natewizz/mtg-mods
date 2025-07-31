# Changelog

All notable changes to the mtg-mods project will be documented in this file.

## [Unreleased]

### Fixed
- **Mobile UX Improvements**
  - Fixed changelog mobile layout: version number now appears below type pill on smaller screens
  - Updated all changelog dates to reflect 2025 timeline
  - Added proper development and launch entries to show platform evolution
  - Fixed mobile menu staying open after clicking links - menu now closes automatically
  - Improved responsive design for better mobile experience

### Security
- **CRITICAL**: Enabled Row Level Security (RLS) on all database tables
  - Added comprehensive security policies for all tables to prevent unauthorized access
  - Implemented user-specific access controls for personal data (profiles, bookmarks, votes, etc.)
  - Added admin-only policies for sensitive operations (content moderation, user management)
  - Created public read policies for shared content (recipes, tags, user profiles)
  - Enhanced database security to comply with Supabase best practices

### Added
- Public changelog page with historical timeline view
  - Created `/changelog` route with beautiful vertical timeline design
  - Added comprehensive historical entries from platform launch to current version
  - Implemented color-coded entry types (feature, improvement, fix, security)
  - Added interactive hover effects and modern UI matching brand colors
  - Included feedback section with contact link for user suggestions
- Updated footer navigation
  - Added "Changelog" link to Policies section in footer
  - Renamed "Submit a Mod" to "Create a Recipe" for better clarity
- Updated community guidelines to reflect implemented reporting system and ban criteria
  - Added comprehensive content filtering system documentation
  - Documented user strikes and banning system (2 strikes = automatic ban)
  - Updated reporting system information with Report button functionality
  - Added details about automated offensive content detection and evasion prevention
  - Clarified consequences and enforcement procedures

### Fixed
- **CRITICAL**: Fixed infinite loop in user strikes API calls by implementing React Context for shared state
  - Replaced individual `useUserBanned` hook calls with centralized `UserStrikesProvider`
  - Eliminated multiple simultaneous API calls from Header, BannedUserBanner, StrikeWarningBanner, ReportContentButton, and RecipeInteractions components
  - Added proper state management with `hasInitialized` flag to prevent redundant fetches
  - Maintained backward compatibility with existing `useUserBanned` hook

## [2025-07-29] - Content Reporting System and User Strikes Fix

### Added
- Content reporting system for recipes with admin review workflow
- User strikes system with automatic banning after 2 violations
- Admin dashboard with content reports and user strikes management
- Content filtering system to prevent offensive language in recipes
- Enhanced content filter to detect spaced/dotted/dashed/underscored offensive words (e.g., "f u c k", "s.h.i.t")
- Google Analytics 4 integration with updated tracking ID (G-7KRYYYL31Z)

### Fixed
- Infinite redirect loop during user authentication and username setup
- User strikes displaying admin names instead of banned user names
- Recipe deletion not working in admin panel (now properly deletes from database)
- User banning not working in admin panel (now properly adds [BANNED] to bio)
- Recipe creation/deletion not auto-refreshing on page (now uses router.refresh())
- Centralized user strikes logic in useUserBanned hook
- Fixed useUserBanned hook with proper useCallback and dependency management
- Eliminated duplicate API calls by centralizing logic in useUserBanned hook

### Changed
- Updated content reports workflow: removed "reviewed" status, simplified to "dismiss" or "remove" actions
- Content reports now show latest 7 by default with "Load More" option
- Report content button styling improved for better UX
- Updated Google Analytics tracking ID from G-6Y1TBDE679 to G-7KRYYYL31Z

### Technical
- Added comprehensive TypeScript interfaces for all API responses
- Implemented proper cache invalidation using revalidateTag for recipe operations
- Added Prisma transaction support for atomic database operations
- Enhanced error handling and user feedback for content validation

## [2024-05-25] - Profile Card Enhancements and Cleanup

### Added
- Enhanced ProfileCard component with improved styling
  - Added gradient background to profile card
  - Added border and shadow to profile image
  - Implemented website URL validation with real-time feedback
  - Added link icon for website URLs
  - Created bordered bio section with improved visual hierarchy
  - Improved form styling with username @ symbol prefix
  - Added interactive hover effects and transitions

### Changed
- Updated user profile data structure
  - Removed unused 'favoriteDeck' field from UI and database schema
  - Repurposed website link functionality to replace favorite deck
  - Modified API routes to use the new data structure
  - Updated TypeScript types to reflect schema changes
- Improved website link display
  - Renamed "Website" to "Link" for better conciseness
  - Moved link display inline with link icon
  - Enhanced styling for better visibility

### Fixed
- Fixed TypeScript errors in API routes
  - Added proper type casting for extended user fields
  - Created ExtendedUser interface for type safety
  - Fixed recipe property access in bookmarked and tried recipes
  - Resolved userId type errors in query parameters
- Fixed profile card UI responsiveness
  - Improved mobile layout for profile information
  - Enhanced form validation feedback
  - Fixed spacing and alignment issues

## [2024-05-13] - Recipe Filtering and Sorting System

### Added
- Comprehensive recipe filtering and sorting system
  - Added tag-based filtering with multi-select functionality 
  - Implemented sorting options: newest, oldest, most upvoted, most tried
  - Created UI for displaying and managing selected filters
  - Added URL parameter support for shareable filtered views
- Tag management improvements
  - Added support for displaying popular tags (appearing in 2+ recipes)
  - Implemented MTG color-coded tag display throughout the application
  - Created reusable TagPill component with proper vertical alignment
- Enhanced recipe list UI
  - Improved empty state handling with context-aware messages
  - Added tag display on recipe cards
  - Implemented responsive filter/sort controls

### Changed
- Updated recipes page architecture to support filtering
  - Refactored recipe fetching to use server actions
  - Implemented efficient database queries for filtered results
  - Added client-side state management for filters
- Improved recipe display
  - Enhanced recipe cards with tag information
  - Updated UI to accommodate filter controls
  - Improved responsive layout for various screen sizes

## [2024-05-12] - Tag System Improvements

### Added
- MTG color-themed tag styling system
  - Created reusable TagPill component for consistent tag display
  - Implemented tag categorization based on MTG color wheel design
  - Added visual distinction between different tag categories
- Enhanced tag selection interface in recipe form
  - Added interactive tag suggestions with MTG-themed categories
  - Implemented "Selected Tags" display for better user feedback
  - Added tag categorization system by purpose/meaning

### Changed
- Updated recipe page, recipe card, and recipe form to use consistent tag styling
- Improved visual hierarchy with color-coded tag pills
- Enhanced user interface with MTG-themed color scheme for tags

### Fixed
- Fixed recipe redirection after creation to use slugified title URLs
- Improved tag display consistency across the application
- Fixed styling issues with tag pills in different contexts

## [2024-05-11] - URL Structure and User Experience Improvements

### Added
- New URL structure for recipes using slugified titles
  - Created `/recipes/[slug]` routes for improved SEO and readability
  - Added helper functions for generating consistent URL slugs
  - Implemented redirect system for backward compatibility
- New user profile URL structure
  - Created `/profile/[username]` routes instead of ID-based routes
  - Added `/profile/me` shortcut that redirects to the current user's profile
  - Implemented legacy redirects from ID-based URLs to username-based URLs
- Username selection feature
  - Created UI for selecting from multiple MTG-themed username options
  - Added username availability checking
  - Implemented username generation based on MTG terminology

### Changed
- Updated username management
  - Removed restriction on changing usernames
  - Modified signup process to delay username creation until username setup
  - Improved username storage with proper usage of transactions
- Enhanced navigation throughout the application
  - Updated all profile links to use the new URL structure
  - Updated recipe links to use the new slug-based URLs
  - Improved redirection logic for authentication flows
- API routes now support lookups by both ID and username
  - Modified user API endpoints to handle username or ID parameters
  - Ensured proper error handling for non-existent users
  - Optimized database queries for slug-based routes

### Fixed
- Fixed URL conflicts with Next.js dynamic routes
  - Resolved issues with different slug names for the same dynamic path
  - Created separate route hierarchies for legacy redirects
- Fixed transaction errors with UsernameChange model
  - Corrected SQL query issues with the ID field
  - Implemented proper upsert logic for username changes
  - Fixed type safety issues with Prisma client
- Resolved navigation issues after profile updates
  - Ensured proper redirection after username changes
  - Fixed state management in profile components
  - Improved error handling during profile operations

## [2024-03-21] - Task Manager Project

### Added
- New task manager project setup
  - Next.js application with TypeScript and Tailwind CSS
  - Custom color scheme implementation
    - Primary: #5A31F4 (Deep Indigo)
    - Background: #F1F3FA (Light Grayish Blue)
    - Text: #2C2E3A (Charcoal)
    - Accent 1: #FF8661 (Muted Coral)
    - Accent 2: #FFC145 (Soft Gold)
    - Supporting: #3DA1C4 (Soft Cyan)
    - Contrast: #F4A261 (Warm Sand)
  - Prisma database schema with models:
    - User model with authentication fields
    - Project model with task relationships
    - Task model with status and priority tracking
  - Initial components:
    - TaskList component with status and priority management
    - API routes for task CRUD operations
  - Prisma client configuration and setup

### Planned
- Task creation and editing forms
- Project management interface
- User authentication system
- Task filtering and sorting
- Real-time updates
- Mobile responsiveness improvements

### Changed
- Updated project structure to follow Next.js 13+ app directory conventions
- Implemented new color scheme across components
- Modified database schema for task management

### Fixed
- TypeScript configuration issues
- Prisma client generation
- Component import paths

### Security
- Database connection configuration
- Environment variables setup

### Documentation
- Updated CHANGELOG.md with new project details
- Added component documentation
- Database schema documentation 

## [2024-06-07] - Admin Dashboard, Profile Privacy, and UI/UX Improvements

### Added
- Admin dashboard with advanced metrics, charts, and analytics (user, recipe, interaction stats)
- Modular dashboard chart components using Recharts and Tailwind
- Markdown support for user bio (with react-markdown)
- Profile tab counts for Recipes, Bookmarks, Tried
- Markdown Help link/tooltip next to bio editor (edit and view modes)
- Copy Link button for recipes (copies current URL, shows confirmation)
- Copy Link button for profiles (copies current URL, shows confirmation)

### Changed
- Profile card now hides full name and displays only username (or 'Anonymous')
- Nav bar now shows username instead of full name
- Removed duplicate username display on profile card
- Removed 'Settings' nav item (all account management via profile)
- Improved profile and dashboard UI for clarity and privacy
- Minor UI polish for markdown and sharing features

### Fixed
- Cleaned up unused variables in dashboard code by prefixing with underscore (for future use)
- Removed unused variable in ProfileCard to resolve linter errors
- Linter passes for Vercel deploy (except known NextAuth adapter warning)

### Security
- User full name is no longer exposed in any public or private profile views

### Documentation
- Updated changelog with all recent admin, privacy, and UI/UX changes 

## [2024-06-11] - User Timestamps and Profile Metadata

### Added
- Added `createdAt` and `updatedAt` fields to the User model via Prisma migration
- Profile card now displays 'Joined' (from emailVerified or createdAt) and 'Last active' (from updatedAt) in the bottom right corner

### Changed
- Updated user API to return new timestamp fields for profile display
- Modernized profile card layout for subtle metadata display

### Migration
- Manual SQL migration to backfill timestamps for existing users 

## [2024-06-12] - Trending Recipes Feed

### Added
- Trending Recipes feed on the /recipes page
  - Backend: `getTrendingRecipes` server function aggregates most upvoted, bookmarked, and tried recipes in the last 7 days
  - UI: New `TrendingFeed` server component displays trending recipes in a responsive grid using Shadcn UI, Radix, and Tailwind
  - Integrated trending feed at the top of the /recipes page with Suspense loading state

### Changed
- RecipeCard and trending grid now enforce consistent card heights for a uniform layout

### Fixed
- Linter error for RecipeCard import in TrendingFeed 