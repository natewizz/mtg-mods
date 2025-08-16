"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UsernameSetup from "@/components/user/UsernameSetup";

export default function SetupUsernamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedRedirect, setHasCheckedRedirect] = useState(false);

  useEffect(() => {
    // Only check redirects once when session is loaded
    if (status === "loading" || hasCheckedRedirect) {
      return;
    }

    setHasCheckedRedirect(true);

    // If the user is not authenticated, redirect to login
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    
    // If the user already has a username, redirect to homepage
    if (status === "authenticated" && session?.user?.username) {
      console.log("User already has a username:", session.user.username);
      router.push("/");
      return;
    }
    
    // If authenticated but no username, stay on this page
    if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [session, status, router, hasCheckedRedirect]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will redirect in useEffect
  }

  if (!session?.user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-center text-white">Welcome to Cantripped!</h1>
      
      <div className="mb-8">
        <p className="text-center text-gray-600">
          Let&apos;s set up your magical identity before you begin your journey.
        </p>
      </div>
      
      <UsernameSetup 
        userId={session.user.id} 
      />
    </div>
  );
} 