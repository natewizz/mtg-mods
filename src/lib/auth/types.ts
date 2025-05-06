// This file centralizes and exposes session types for consistent usage across the app
// Note: NextAuth session is extended in next-auth.d.ts

/**
 * Type definition for the user in a session
 */
export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

/**
 * Type definition for a NextAuth session 
 */
export type SessionWithUser = {
  user: SessionUser;
  expires: string;
}; 