"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MeProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      // Redirect to login if not authenticated
      router.push("/auth/signin?next=/profile/me");
      return;
    }

    // Make sure we have user data from the session
    if (session?.user) {
      // Check if the user has a username
      if (session.user.username) {
        // Redirect to the user's profile with username
        router.push(`/profile/${session.user.username}`);
      } else {
        // Only redirect to username setup if username is actually missing
        router.push("/auth/setup-username");
      }
    }
  }, [session, status, router]);

  // Show loading state while redirecting
  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div>
    </div>
  );
} 