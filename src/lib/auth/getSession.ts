import { auth } from '@/auth';

/**
 * A simple wrapper around auth() to get the current session
 * This is useful when we need to access additional properties
 * added to the session by custom callbacks
 */
export async function getSession() {
  const session = await auth();
  return session;
}

/**
 * Get the authenticated user ID from the session
 * Returns null if the user is not authenticated
 */
export async function getAuthUserId() {
  const session = await getSession();
  return session?.user?.id as string | null;
} 