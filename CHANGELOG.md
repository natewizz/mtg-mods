# Changelog

All notable changes to the mtg-mods project will be documented in this file.

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

## [Unreleased]

### Added
- Initial project setup with Next.js, TypeScript, and Tailwind CSS
- Project structure and configuration
- CHANGELOG.md created to track project progress
- Database schema implementation with Prisma
  - User model with authentication fields
  - Recipe model with rich text instructions
  - Vote, Bookmark, and Tried models for interactions
  - Proper relationships and constraints
- Authentication system implementation
  - Google OAuth integration
  - NextAuth.js configuration
  - Sign-in page and components
  - Session management
  - Protected routes setup
- Recipe feature implementation
  - Added `/recipes` page to display all recipes
  - Added `/recipes/new` page for creating new recipes
  - Basic recipe listing interface
  - Recipe creation form
- Recipe detailed features
  - Added `/recipes/[id]` page for single recipe view
  - Added `/recipes/[id]/edit` route for editing recipes 
  - Implemented recipe interactions (upvote, bookmark, tried)
  - Added RecipeCard component for consistent display
  - Created DeleteRecipeButton for recipe management
- API implementation
  - Added recipe API endpoints for CRUD operations
  - Added user profile image upload functionality
  - Implemented recipe interactions API endpoints
- Middleware implementation for authentication protection

### Planned
- Recipe feed and search
- User profile system enhancement
- Admin functionality
- Deployment configuration

### Changed
- Updated Tailwind CSS configuration for v4 compatibility
  - Switched from `@tailwind` directives to `@import "tailwindcss"`
  - Added proper `@theme` configuration for custom colors
  - Updated PostCSS configuration to use `@tailwindcss/postcss` plugin
- Simplified signup form
  - Removed username, favorite deck, and bio fields
  - Improved styling with theme colors
  - Added loading indicator for better UX
  - These fields will be moved to user profile in the future
- Enhanced recipe form with rich text editor
- Improved authentication flow with better error handling
- Updated package dependencies to latest versions

### Fixed
- Resolved NextAuth API handler errors by updating route implementation
- Fixed CSS styling issues with Tailwind v4 compatibility
- Resolved routing issues with recipes pages
- Fixed TypeScript linter errors for React components
- Corrected directory structure for Next.js routing
- Resolved path issues in import statements
- Fixed ESLint configuration for NextAuth.js types
- Environment variable handling with fix-env.js utility
- Database connection verification with db-verify.js

### Security
- Environment variables and sensitive data properly configured
- Authentication credentials secured
- Database credentials protected
- Added middleware for route protection
- Implemented proper authorization checks for recipe operations

### Documentation
- Initial CHANGELOG.md created
- Project plan document moved to project root
- Database schema documentation in Prisma schema
- Authentication setup documentation 
- Updated changelog with recent implementation details

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