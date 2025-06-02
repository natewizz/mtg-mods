"use client";

import { useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function SigninCallbackPageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      // Not signed in, redirect to sign in page
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated" && session) {
      // User is authenticated
      if (!session.user.username) {
        // User needs to set up a username
        router.push("/auth/setup-username");
        return;
      }

      // User has a username, check if we have a next parameter
      const next = searchParams.get("next") || "/";
      router.push(next);
    }
  }, [session, status, router, searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div>
    </div>
  );
}

export default function SigninCallbackPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div></div>}>
      <SigninCallbackPageContent />
    </Suspense>
  );
} 