import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import ProfileCard from "@/components/user/ProfileCard";
import ProfileTabs from "@/components/user/ProfileTabs";
import StrikeWarningBanner from "@/components/user/StrikeWarningBanner";
import BannedUserBanner from "@/components/user/BannedUserBanner";
import type { RecipeWithStats } from "@/components/user/RecipeList";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            recipes: true,
            bookmarks: true,
            tried: true,
          },
        },
      },
    });

    if (!user) {
      return {
        title: 'User Not Found - MTG Mods',
        description: 'The requested user profile could not be found.',
      };
    }

    const displayName = user.username || user.name || 'Anonymous';
    const recipeCount = user._count.recipes;
    const bookmarkCount = user._count.bookmarks;
    const triedCount = user._count.tried;

    return {
      title: `${displayName}'s Profile - MTG Mods`,
      description: `View ${displayName}'s MTG Mods profile. See their ${recipeCount} recipes, ${bookmarkCount} bookmarks, and ${triedCount} tried recipes.`,
      keywords: [
        'Magic the Gathering', 'MTG', 'user profile', displayName, 'recipes', 'community', 'game mods'
      ],
      alternates: {
        canonical: `https://www.mtgmods.xyz/profile/${username}`,
      },
      openGraph: {
        title: `${displayName}'s Profile - MTG Mods`,
        description: `View ${displayName}'s MTG Mods profile. See their ${recipeCount} recipes, ${bookmarkCount} bookmarks, and ${triedCount} tried recipes.`,
        url: `https://www.mtgmods.xyz/profile/${username}`,
        siteName: 'MTG Mods',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=${encodeURIComponent(displayName)}'s%20Profile&description=${encodeURIComponent(`View ${displayName}'s MTG Mods profile with ${recipeCount} recipes`)}&type=profile`,
            width: 1200,
            height: 630,
            alt: `${displayName}'s Profile`
          }
        ],
        locale: 'en_US',
        type: 'profile'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${displayName}'s Profile - MTG Mods`,
        description: `View ${displayName}'s MTG Mods profile. See their ${recipeCount} recipes, ${bookmarkCount} bookmarks, and ${triedCount} tried recipes.`,
        images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=${encodeURIComponent(displayName)}'s%20Profile&description=${encodeURIComponent(`View ${displayName}'s MTG Mods profile with ${recipeCount} recipes`)}&type=profile`]
      }
    };
  } catch (error) {
    console.error('Error generating metadata for profile:', error);
    return {
      title: 'Profile - MTG Mods',
      description: 'View user profiles and recipes on MTG Mods.',
    };
  }
}

async function getProfileData(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        _count: {
          select: {
            recipes: true,
            bookmarks: true,
            tried: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    // Fetch user's recipes with stats
    const recipes = await prisma.recipe.findMany({
      where: { authorId: user.id },
      include: {
        tags: true,
        _count: {
          select: {
            votes: true,
            tried: true,
            bookmarks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch bookmarked recipes
    const bookmarkedRecipes = await prisma.recipe.findMany({
      where: {
        bookmarks: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        tags: true,
        _count: {
          select: {
            votes: true,
            tried: true,
            bookmarks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch tried recipes
    const triedRecipes = await prisma.recipe.findMany({
      where: {
        tried: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        tags: true,
        _count: {
          select: {
            votes: true,
            tried: true,
            bookmarks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      user,
      recipes: recipes as RecipeWithStats[],
      bookmarkedRecipes: bookmarkedRecipes as RecipeWithStats[],
      triedRecipes: triedRecipes as RecipeWithStats[],
    };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  const profileData = await getProfileData(username);

  if (!profileData) {
    notFound();
  }

  const { user, recipes, bookmarkedRecipes, triedRecipes } = profileData;
  const isOwnProfile = currentUserId === user.id;

  return (
    <div className="max-w-4xl mx-auto">
      {isOwnProfile && <StrikeWarningBanner />}
      {isOwnProfile && <BannedUserBanner />}
      <ProfileCard 
        user={user}
        isCurrentUser={isOwnProfile}
        onUpdate={isOwnProfile ? undefined : undefined} // We'll handle updates in a separate client component
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