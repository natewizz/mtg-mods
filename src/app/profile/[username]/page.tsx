"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileCard from "@/components/user/ProfileCard";
import ProfileTabs from "@/components/user/ProfileTabs";
import type { User as PrismaUser } from "@prisma/client";
import type { RecipeWithStats } from "@/components/user/RecipeList";
import { SessionUser } from "@/lib/auth/types";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const { data: session } = useSession();
  const [profile, setProfile] = useState<PrismaUser | null>(null);
  const [recipes, setRecipes] = useState<RecipeWithStats[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<RecipeWithStats[]>([]);
  const [triedRecipes, setTriedRecipes] = useState<RecipeWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/users/${username}`);
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
  }, [username]);

  // Handle profile update
  const handleProfileUpdate = async (data: Partial<PrismaUser>) => {
    if (!profile) return Promise.reject(new Error('Profile not loaded'));

    try {
      const response = await fetch(`/api/users/${profile.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      const updatedUser = await response.json();
      setProfile((prevProfile) => prevProfile ? { ...prevProfile, ...updatedUser } : updatedUser);
      
      // If username was changed, redirect to the new profile URL
      if (data.username && data.username !== username) {
        console.log(`Username changed from ${username} to ${data.username}. Redirecting...`);
        router.push(`/profile/${data.username}`);
      }
      
      return Promise.resolve();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      return Promise.reject(err);
    }
  };

  // Cast to our custom type for type safety
  const user = session?.user as SessionUser | undefined;
  // Check if this is the current user's profile by comparing user IDs
  const isOwnProfile = user?.id === profile?.id;

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
        onUpdate={isOwnProfile ? handleProfileUpdate : undefined}
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