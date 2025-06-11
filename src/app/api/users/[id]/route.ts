import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Define a basic Recipe interface (can be expanded based on your actual Recipe model)
interface Recipe {
  id: string;
  // Add other common recipe fields if necessary, e.g., title: string;
}

interface RecipeWithCounts extends Recipe {
  _count: {
    votes: number;
    tried: number;
    bookmarks?: number; // Optional as it's not in all queries
  };
}

// Extended user type for our modified schema
interface ExtendedUser {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  linkUrl: string | null;
  linkText: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  emailVerified: string | Date | null;
}

// Define the context type for route handlers
interface RouteContext {
  params: { id: string };
}

// GET /api/users/[id] - Get a user's profile
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Await the params promise
    const { id: userIdOrUsername } = context.params;
    
    // Try to find user by ID first
    let user = await prisma.user.findUnique({
      where: { id: userIdOrUsername },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        linkUrl: true,
        linkText: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
      } as any,
    });

    // If user not found by ID, try to find by username
    if (!user) {
      user = await prisma.user.findUnique({
        where: { username: userIdOrUsername },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
          linkUrl: true,
          linkText: true,
          createdAt: true,
          updatedAt: true,
          emailVerified: true,
        } as any,
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Use the correct user ID for all subsequent queries
    const userId: string = user.id;

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
      bookmarkedRecipes.map(async (bookmark: { recipe: RecipeWithCounts }) => {
        const recipe = bookmark.recipe;
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
      triedRecipes.map(async (tried: { recipe: RecipeWithCounts }) => {
        const recipe = tried.recipe;
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
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Await the params promise
    const { id: userIdOrUsername } = context.params;
    
    // Find the user by ID or username
    let userToUpdate = await prisma.user.findUnique({
      where: { id: userIdOrUsername },
    });

    // If not found by ID, try username
    if (!userToUpdate) {
      userToUpdate = await prisma.user.findUnique({
        where: { username: userIdOrUsername },
      });
    }

    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // User can only update their own profile
    if (session.user.id !== userToUpdate.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    const data = await request.json();
    
    // Create validated payload
    const updatePayload: Partial<ExtendedUser> = {};
    if (data.username && typeof data.username === 'string') updatePayload.username = data.username;
    if (data.bio && typeof data.bio === 'string') updatePayload.bio = data.bio;
    if (data.linkUrl !== undefined) updatePayload.linkUrl = data.linkUrl ? data.linkUrl : null;
    if (data.linkText !== undefined) updatePayload.linkText = data.linkText ? data.linkText : null;

    // Check if username is being updated and if it's taken
    if (updatePayload.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: updatePayload.username as string }, // Ensure it's a string
      });
      
      if (existingUser && existingUser.id !== userToUpdate.id) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userToUpdate.id },
      data: updatePayload, // Use the validated payload
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        linkUrl: true,
        linkText: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
} 