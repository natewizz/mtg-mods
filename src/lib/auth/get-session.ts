import { cookies } from 'next/headers';
import { auth } from '@/auth';

/**
 * Returns the session from the server
 * This is a safer way to access the session in server components
 */
export async function getSession() {
  // We need to call cookies() to prevent caching issues
  cookies();
  
  return await auth();
}

/**
 * Returns the current user or null if not logged in
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Returns the current user ID or null if not logged in
 */
export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id || null;
} 