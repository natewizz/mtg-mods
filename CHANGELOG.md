# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### 📱 **Mobile UI Improvements & Recipe Card Enhancements** *(Updated: 2025-08-30)*
- **Recipe Page Layout Optimization**
  - Fixed download link overlap with title text on mobile devices
  - Reorganized layout to stack title and buttons vertically on mobile
  - Repositioned report button to bottom right of interaction box
  - Improved responsive spacing and container padding throughout
- **Recipe Interactions Enhancement**
  - Converted stacked interaction buttons to inline layout on mobile
  - Added subtle colored borders matching brand color scheme
  - Reduced vertical spacing for more compact mobile experience
  - Enhanced touch targets and mobile-friendly button sizing
- **Filter System Improvements**
  - Converted sort options from horizontal buttons to dropdown menu
  - Limited filter pills to exactly 2 rows for mobile optimization
  - Added proper visibility control instead of height-based hiding
  - Enhanced mobile touch targets and spacing
- **Homepage Visual Appeal**
  - Enhanced Latest/Trending recipe sections with gradient backgrounds
  - Added meaningful icons for each section (book, lightning bolt)
  - Improved "View All" links with hover animations and arrow icons
  - Better color coordination using brand color scheme
- **Recipe Card Enhancements**
  - Restored text snippets for homepage recipe cards
  - Improved username display with "Posted by:" prefix for clarity
  - Enhanced tag pill styling with primary color scheme and hover effects
  - Better shadows, borders, and hover transitions throughout
  - Increased compact card height to accommodate text previews

### Technical
- Updated RecipeCard component with responsive mobile-first design
- Enhanced RecipeInteractions component with inline button layout
- Improved RecipeFilters component with dropdown sort and limited pill display
- Updated homepage sections with gradient backgrounds and enhanced visual hierarchy
- Maintained consistent styling between compact and full recipe card versions

## [2.0.1] - 2025-08-16
### 🔧 **Final Branding Cleanup & Bug Fixes**
- **Lint error fixes**: Resolved all ESLint and TypeScript compilation errors
- **Admin account scripts**: Added SQL and Node.js scripts for updating admin account branding
- **Code quality**: Fixed unused variables, unescaped entities, and method name mismatches
- **Production readiness**: All branding updates complete and ready for deployment

---

## [2.0.0] - 2025-08-16
### 🎉 **MAJOR REBRAND: MTG Mods → Cantripped**
- **Complete platform rebrand** from "MTG Mods" to "Cantripped"
- **New domain**: Platform now accessible at cantripped.com
- **Updated branding**: All user-facing content, metadata, and references updated
- **Preserved functionality**: All features, recipes, and user data maintained
- **Enhanced identity**: New name better reflects our mission to transform gameplay experiences
- **Community continuity**: Same great community, same great features, new exciting brand

### 🔧 **Technical Updates**
- Updated package.json project name
- Updated all metadata and OpenGraph data
- Updated Docker container and database references
- Updated sitemap and robots.txt
- Updated all policy pages and legal references
- Updated contact information and support channels

---

## [1.0.0] - 2025-01-15
### 🚀 **Platform Launch**
- **First public deployment** of MTG Mods with recipe creation, user authentication, community features, and comprehensive MTG rule modification sharing capabilities
- **Core features**: Recipe creation and management, user profiles, voting system, tag organization
- **Admin tools**: Dashboard, moderation tools, content management
- **Responsive design**: Mobile-optimized interface for all devices
- **Community features**: User interactions, feedback system, reporting tools

## [2025-01-15] - Homepage Layout Improvements and Trending Recipes

### Added
- **Trending Recipes Section**
  - Added new "Trending Recipes" section to homepage below "Latest Recipes"
  - Implemented trending algorithm that considers likes (3x weight), tries (2x weight), and bookmarks (1x weight)
  - Displays 4 trending recipes in the same card format as latest recipes
  - Added proper loading states and error handling for trending recipes
- **Enhanced Recipe Discovery**
  - Moved random recipe button to its own section below both Latest and Trending recipes
  - Improved layout flow: Latest → Trending → Random for better user experience
  - Maintained tight spacing throughout all sections for cohesive design

### Changed
- **Homepage Layout Structure**
  - Reorganized homepage sections for better content flow and user engagement
  - Removed download links from compact recipe cards to prevent title text overlap
  - Updated Latest Recipes section to use compact card format for consistent design
  - Adjusted spacing between sections for tighter, more cohesive layout
- **Recipe Card Design**
  - Softened attachment indicators on recipe cards to be less intrusive
  - Implemented paper clip icon + "Download" text for cleaner attachment display
  - Maintained functionality while improving visual design

### Technical
- Enhanced `getTrendingRecipes` function with weighted scoring algorithm
- Updated API route to support `?trending=4` query parameter
- Improved Prisma queries with proper `_count` aggregation for likes, tries, and bookmarks
- Added robust error handling with optional chaining for activity score calculations
- Maintained responsive design across all new sections

---

## [2025-01-15] - Comprehensive FAQ Page

### Added
- **Robust FAQ Page**
  - Created comprehensive FAQ page at `/faq` route with organized sections
  - Added 25+ frequently asked questions covering all aspects of the platform
  - Implemented category-based navigation with smooth scrolling to sections
  - Organized FAQ content into logical categories: General, Account & User Management, Recipe Creation & Management, Community & Interaction, Badges & Achievements, Technical & Support, Privacy & Security
  - Added contact section at bottom for additional support
  - Implemented responsive design with mobile-friendly navigation
- **FAQ Navigation Integration**
  - Added FAQ link to main navigation (desktop and mobile)
  - Positioned FAQ link between Learn and Contact for logical flow
  - Maintained consistent styling with existing navigation items

### Changed
- **Navigation Structure**
  - Updated Header component to include FAQ link in both desktop and mobile menus
  - Ensured proper mobile menu functionality with FAQ link integration

### Technical
- Created new FAQ page with TypeScript interfaces and proper metadata
- Implemented category-based FAQ organization with dynamic filtering
- Added SEO-optimized metadata including OpenGraph and Twitter cards
- Ensured accessibility with proper heading structure and semantic HTML
- Fixed ESLint issues with proper HTML entity escaping

---

## [2025-01-15] - Recipe Attachment Indicators and Copy Link Functionality

### Added
- **Recipe Attachment Indicators**
  - Added prominent attachment indicators to individual recipe pages (e.g., `/recipes/eras-deck`)
  - Positioned attachment indicators in the top row next to copy link buttons for immediate visibility
  - Enhanced attachment styling with blue background, white text, and hover effects for better UX
  - Implemented soft, non-intrusive attachment indicators on recipe cards with paper clip icon and "Download" text
- **Copy Link Functionality**
  - Added copy link buttons to recipe cards for easy sharing
  - Created `RecipeCopyLinkButton` component for recipe-specific URL copying
  - Integrated copy link functionality with proper URL generation and user feedback
  - Positioned copy link buttons alongside attachment indicators for consistent UI

### Changed
- **Recipe Page Layout**
  - Restructured individual recipe page header to accommodate attachment indicators and copy link buttons
  - Moved attachment indicators from bottom metadata section to top row for better visibility
  - Improved layout with flexbox design for proper alignment and spacing
- **Recipe Card Design**
  - Updated recipe cards to include soft attachment indicators and copy link buttons
  - Softened attachment indicator styling to be less intrusive while maintaining functionality
  - Maintained responsive design and proper spacing across all card variants

### Technical
- Created new `RecipeCopyLinkButton` client component for recipe-specific copy functionality
- Enhanced `RecipeCard` component with attachment indicators and copy link integration
- Updated individual recipe page layout for better attachment visibility and user experience
- Implemented proper TypeScript types and interfaces for new components

---

## [2025-08-07] - Dashboard Performance Fix and Database Optimization

### Fixed
- **Dashboard Connection Pool Timeouts**
  - Resolved Prisma connection pool timeout errors (P2024) on production dashboard
  - Increased connection pool limit from 5 to 20 connections for better concurrent query handling
  - Extended pool timeout from 10 to 60 seconds for complex analytics queries
  - Implemented query batching to reduce concurrent database load from 100+ to 6 sequential batches
  - Optimized dashboard query execution to prevent connection pool exhaustion

### Technical
- Enhanced Prisma client configuration with optimized connection pool settings
- Restructured dashboard queries into logical batches to improve resource utilization
- Reduced peak concurrent database connections during dashboard load

---

## [2025-08-07] - Progressive Badges, Special Badge Attribution, and UX Polish

### Added
- **Progressive Badge System (Visual + Logic)**
  - Higher milestone badges now replace lower ones (show only highest achieved)
  - Bronze → Silver → Gold → Platinum → Diamond visual tiers for milestone badges
  - Tooltips show tier info and progression level
- **Achievement Badge Indicators**
  - Clear "🏆 Permanent Achievement" label on first-time badges (first recipe/like/tried)
  - Subtle green ring to distinguish permanent achievements
- **Maintenance Script**
  - Added `scripts/update-progressive-badges.js` to retroactively clean up lower milestone badges

### Changed
- **Special Badges Attribution**
  - Always display "Awarded by Cantripped" when the awarding user is not set
- Default `awardedBy` to Cantripped for system-awarded badges
- **Badge Display**
  - Only highest milestone per progression group is shown in user collections

### Technical
- Updated `BadgeService` with progressive groups, replacement logic, and filtered display
- Enhanced `Badge` and `BadgeCollection` components to support tier visuals and labels
- Updated retroactive award script to set proper `awardedBy`

---

## [2025-08-07] - UX Improvements and Newsletter Integration

### Added
- **Newsletter Subscription System**
  - Created `/api/newsletter` endpoint for email subscription management
  - Integrated newsletter signup with existing WaitlistSignup database table
  - Added comprehensive form validation and error handling
  - Implemented loading states and user feedback for subscription process
  - Added source tracking to distinguish newsletter subscriptions from other signups
  - Enhanced footer with real-time subscription feedback and success/error messages

### Changed
- **Author Name Links for User Discovery**
  - Made all author names clickable links to user profiles across the application
  - Updated RecipeCard component (both compact and full versions) with profile links
  - Enhanced individual recipe pages with clickable author names
  - Updated dashboard RecipeCell component with author profile links
  - Added proper hover states and styling for author links
  - Implemented smart link generation (only for users with usernames)
  - Improved user discovery and community engagement through profile navigation
- **Homepage Banner Optimization**
  - Reduced banner padding from `py-24` to `py-16` for more compact design
  - Reorganized button layout: moved "Join Kickstarter Waitlist" below primary action buttons
  - Adjusted spacing and visual hierarchy for better user flow
  - Made primary actions ("Explore Recipes" and "Get Started") more prominent
  - Reduced Kickstarter button size for better visual balance
- **Footer Link Updates**
  - Changed "Browse Mods" to "Browse Recipes" for terminology consistency
  - Updated contact page FAQ with new content reporting process
  - Enhanced reporting FAQ with step-by-step instructions and 24-hour timeline
  - Improved user guidance for content moderation and community standards

### Technical Improvements
- **API Enhancements**
  - Added newsletter subscription endpoint with email validation
  - Implemented duplicate prevention for newsletter subscriptions
  - Enhanced error handling and user feedback for subscription process
- **UI/UX Enhancements**
  - Added Link import to dashboard page for author profile links
  - Implemented proper loading states and form validation
  - Enhanced visual feedback with success/error message styling
  - Improved responsive design and mobile experience

## [2025-08-04] - User Badge System and Database Migration

### Added
- **Comprehensive User Badge System**
  - Added Badge and UserBadge models to Prisma schema with proper relationships
  - Implemented automatic badge awarding for various user activities:
    - **Recipe Creation**: First recipe, recipe milestones (1, 5, 10, 25, 50, 100)
    - **Likes Received**: First like, like milestones (1, 5, 10, 25, 50, 100)
    - **Tries Received**: First tried, tried milestones (1, 5, 10, 25, 50, 100)
    - **Bookmarks Received**: Bookmark milestones (1, 5, 10, 25, 50, 100)
  - **Role Badges**: User, Moderator, Admin with proper permissions
  - **Special Badges**: Founding Member, Community Champion, Creative Chef, Helpful Helper
  - **Beta User Badge**: Automatic award for early adopters
  - Created BadgeService for centralized badge logic and management
  - Added Badge and BadgeCollection UI components with tooltips and category grouping
  - Implemented admin API endpoint for manual badge awarding
  - Added user badge API endpoint for fetching user badges
  - Integrated badge checking into all relevant API endpoints (recipes, votes, tried, bookmarks)
  - Badge notifications sent to users when badges are earned
  - Comprehensive badge seeding script with 40+ predefined badges
  - Enhanced gamification with visual feedback and achievement tracking
- **Content Reports and Admin Notifications Database Migration**
  - Migrated content reporting system from JSON files to PostgreSQL database
  - Added AdminNotification model to Prisma schema with proper relationships
  - Updated all API routes to use database instead of file-based storage
  - Created data migration script to preserve existing content reports and notifications
  - Enhanced data integrity with proper foreign key relationships and constraints
  - Improved concurrent access handling and transaction support
  - Added proper indexing for better query performance
- **Beta Testers Sticky Link**
  - Added prominent sticky link in top-right corner for beta tester feedback form
  - Improved visibility and accessibility for beta testing feedback
  - Enhanced user experience for early adopters

### Changed
- **Dashboard Notifications Filtering**
  - Updated dashboard to only show unread notifications
  - Notifications now disappear from sidebar after being dismissed
  - Improved user experience by reducing notification clutter
- **User Role System Enhancement**
  - Updated User model to use proper UserRole enum instead of string
  - Added isDisabled field to User model for better user management
  - Enhanced role-based access control throughout the application

### Technical Improvements
- **Database Schema Updates**
  - Added comprehensive badge system tables and relationships
  - Enhanced user model with badge relationships and role improvements
  - Improved data integrity with proper constraints and indexing
- **API Enhancements**
  - Added badge checking to all relevant user interaction endpoints
  - Implemented admin badge management API
  - Enhanced error handling and logging for badge operations
- **UI Components**
  - Created reusable Badge and BadgeCollection components
  - Added tooltip support for badge information display
  - Implemented category-based badge organization
  - Enhanced visual feedback for user achievements

### Security
- **Role-Based Badge Management**
  - Manual badges can only be awarded by administrators
  - Proper permission checking for badge operations
  - Secure badge awarding with audit trail support

## [Previous Releases]

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