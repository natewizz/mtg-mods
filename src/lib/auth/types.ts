// This file centralizes and exposes session types for consistent usage across the app
// Note: NextAuth session is extended in next-auth.d.ts

/**
 * Extended session user type to include properties added by our custom session callback
 */
export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

/**
 * Type definition for a NextAuth session 
 */
export type SessionWithUser = {
  user: SessionUser;
  expires: string;
}; 