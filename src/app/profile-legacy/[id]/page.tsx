"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfileIdRedirect() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const id = params.id as string;

  useEffect(() => {
    const redirectToUsernameProfile = async () => {
      if (!id) return;

      try {
        // If this is the current user's ID
        if (session?.user?.id === id) {
          // Redirect to the me page which will then redirect to username profile
          router.push('/profile/me');
          return;
        }

        // Otherwise, fetch the user by ID to get their username
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          // If user not found or other error, redirect to all profiles
          router.push('/');
          return;
        }

        const data = await response.json();
        if (data.user?.username) {
          // Redirect to the username-based profile page
          router.push(`/profile/${data.user.username}`);
        } else {
          // Fallback to home if no username
          router.push('/');
        }
      } catch (error) {
        console.error("Error redirecting to username profile:", error);
        router.push('/');
      }
    };

    if (status !== 'loading') {
      redirectToUsernameProfile();
    }
  }, [id, router, session, status]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
    </div>
  );
} 