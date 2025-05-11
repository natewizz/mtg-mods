"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UsernameSetup from "@/components/user/UsernameSetup";

export default function SetupUsernamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If the user is not authenticated, redirect to login
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    
    // If the user already has a username, redirect to their profile
    if (status === "authenticated" && session?.user?.username) {
      router.push(`/profile/${session.user.username}`);
    }
    
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (isLoading || status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-[#2C2E3A] mb-8">
        Welcome to MTG Mods!
      </h1>
      
      <div className="mb-8">
        <p className="text-center text-gray-600">
          Let's set up your magical identity before you begin your journey.
        </p>
      </div>
      
      <UsernameSetup 
        userId={session.user.id} 
      />
    </div>
  );
} 