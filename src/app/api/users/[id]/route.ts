import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

// GET /api/users/[id] - Get a user's profile
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correct type for App Router dynamic params
) {
  try {
    // Await the params promise
    const { id: userId } = await params;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      // Let Prisma infer the return type based on select
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        favoriteDeck: true,
        bio: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user recipes
    const recipes = await prisma.recipe.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            votes: true,
            tried: true,
            bookmarks: true,
          },
        },
      },
    });

    // Calculate vote sums for each recipe
    const recipesWithVoteSums = await Promise.all(
      recipes.map(async (recipe) => {
        const voteSum = await prisma.vote.aggregate({
          where: { recipeId: recipe.id },
          _sum: { value: true },
        });
        return {
          ...recipe,
          voteSum: voteSum._sum.value || 0,
        };
      })
    );

    // Get bookmarked recipes
    const bookmarkedRecipes = await prisma.bookmark.findMany({
      where: { userId },
      select: {
        recipe: {
          include: {
            _count: {
              select: {
                votes: true,
                tried: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const bookmarkedRecipesWithVoteSums = await Promise.all(
      bookmarkedRecipes.map(async ({ recipe }) => {
        const voteSum = await prisma.vote.aggregate({
          where: { recipeId: recipe.id },
          _sum: { value: true },
        });
        return {
          ...recipe,
          voteSum: voteSum._sum.value || 0,
        };
      })
    );

    // Get tried recipes
    const triedRecipes = await prisma.tried.findMany({
      where: { userId },
      select: {
        recipe: {
          include: {
            _count: {
              select: {
                votes: true,
                tried: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const triedRecipesWithVoteSums = await Promise.all(
      triedRecipes.map(async ({ recipe }) => {
        const voteSum = await prisma.vote.aggregate({
          where: { recipeId: recipe.id },
          _sum: { value: true },
        });
        return {
          ...recipe,
          voteSum: voteSum._sum.value || 0,
        };
      })
    );

    return NextResponse.json({
      user,
      recipes: recipesWithVoteSums,
      bookmarkedRecipes: bookmarkedRecipesWithVoteSums,
      triedRecipes: triedRecipesWithVoteSums,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// PATCH /api/users/[id] - Update user profile
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Correct type for App Router dynamic params
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Await the params promise
    const { id: userId } = await params;
    
    // User can only update their own profile
    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    const data = await req.json();
    
    // Create validated payload
    const updatePayload: Prisma.UserUpdateInput = {};
    if (data.username && typeof data.username === 'string') updatePayload.username = data.username;
    if (data.favoriteDeck && typeof data.favoriteDeck === 'string') updatePayload.favoriteDeck = data.favoriteDeck;
    if (data.bio && typeof data.bio === 'string') updatePayload.bio = data.bio;

    // Check if username is being updated and if it's taken
    if (updatePayload.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: updatePayload.username as string }, // Ensure it's a string
      });
      
      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatePayload, // Use the validated payload
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        favoriteDeck: true,
        bio: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
} 