# Changelog

All notable changes to the mtg-mods project will be documented in this file.

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

### Planned
- Recipe CRUD functionality
- User profile system
- Recipe feed and search
- Interaction features (votes, bookmarks, tried)
- Admin functionality
- Deployment configuration

### Changed
- None yet

### Fixed
- Resolved routing issues with recipes pages
- Fixed TypeScript linter errors for React components
- Corrected directory structure for Next.js routing
- Resolved path issues in import statements
- Fixed ESLint configuration for NextAuth.js types

### Security
- Environment variables and sensitive data properly configured
- Authentication credentials secured
- Database credentials protected

### Documentation
- Initial CHANGELOG.md created
- Project plan document moved to project root
- Database schema documentation in Prisma schema
- Authentication setup documentation 
- Updated changelog with recipes pages implementation

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