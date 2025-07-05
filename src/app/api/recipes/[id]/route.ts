import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, getCurrentUserId } from '@/lib/auth/get-session';
import { z } from 'zod';

// Validation schema for updating a recipe
const updateRecipeSchema = z.object({
  title: z.string().min(5).max(100),
  instructions: z.string().min(20),
  tags: z.array(z.string()).optional(),
});

// Define the context type for route handlers
interface RouteContext {
  params: { id: string };
}

// Get a single recipe
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: context.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        tags: true,
        _count: {
          select: {
            votes: true,
            tried: true,
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the recipe' },
      { status: 500 }
    );
  }
}

// Update a recipe
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getSession();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to update a recipe' },
        { status: 401 }
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: context.params.id },
      include: {
        tags: true,
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Get the current user ID
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID not found' },
        { status: 401 }
      );
    }

    // Check if the user is the author of the recipe
    if (recipe.authorId !== userId) {
      return NextResponse.json(
        { message: 'You are not authorized to update this recipe' },
        { status: 403 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const validationResult = updateRecipeSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid recipe data', errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { title, instructions, tags = [] } = validationResult.data;

    // Update the recipe with a transaction to handle tags
    const updatedRecipe = await prisma.$transaction(async (tx) => {
      // Delete existing tags
      await tx.recipeTag.deleteMany({
        where: { recipeId: context.params.id },
      });

      // Update the recipe
      return tx.recipe.update({
        where: { id: context.params.id },
        data: {
          title,
          instructions,
          tags: {
            create: tags.map(tagName => ({
              name: tagName,
            })),
          },
        },
        include: {
          tags: true,
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      });
    });

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the recipe' },
      { status: 500 }
    );
  }
}

// Delete a recipe
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await getSession();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to delete a recipe' },
        { status: 401 }
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: context.params.id },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Get the current user ID
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID not found' },
        { status: 401 }
      );
    }

    // Check if the user is the author of the recipe
    if (recipe.authorId !== userId) {
      return NextResponse.json(
        { message: 'You are not authorized to delete this recipe' },
        { status: 403 }
      );
    }

    // Delete the recipe
    await prisma.$transaction(async (tx) => {
      // Delete all tags associated with the recipe
      await tx.recipeTag.deleteMany({
        where: { recipeId: context.params.id },
      });

      // Delete all votes associated with the recipe
      await tx.vote.deleteMany({
        where: { recipeId: context.params.id },
      });

      // Delete all bookmarks associated with the recipe
      await tx.bookmark.deleteMany({
        where: { recipeId: context.params.id },
      });

      // Delete all tried records associated with the recipe
      await tx.tried.deleteMany({
        where: { recipeId: context.params.id },
      });

      // Delete the recipe
      await tx.recipe.delete({
        where: { id: context.params.id },
      });
    });

    return NextResponse.json(
      { message: 'Recipe deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while deleting the recipe' },
      { status: 500 }
    );
  }
} 