"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileCard from "@/components/user/ProfileCard";
import ProfileTabs from "@/components/user/ProfileTabs";
import type { User as PrismaUser } from "@prisma/client";
import type { RecipeWithStats } from "@/components/user/RecipeList";
import { SessionUser } from "@/lib/auth/types";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: session } = useSession();
  const [profile, setProfile] = useState<PrismaUser | null>(null);
  const [recipes, setRecipes] = useState<RecipeWithStats[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<RecipeWithStats[]>([]);
  const [triedRecipes, setTriedRecipes] = useState<RecipeWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/users/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          setProfile(data.user);
          setRecipes(data.recipes);
          setBookmarkedRecipes(data.bookmarkedRecipes);
          setTriedRecipes(data.triedRecipes);
        } catch (err) {
          console.error(err);
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  // Cast to our custom type for type safety
  const user = session?.user as SessionUser | undefined;
  const isOwnProfile = user?.id === userId;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileCard 
        user={profile}
        isCurrentUser={isOwnProfile}
      />
      <ProfileTabs 
        recipes={recipes} 
        bookmarkedRecipes={bookmarkedRecipes} 
        triedRecipes={triedRecipes} 
        isCurrentUser={isOwnProfile}
      />
    </div>
  );
} 