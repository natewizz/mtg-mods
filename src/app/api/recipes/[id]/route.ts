import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, getCurrentUserId } from '@/lib/auth/get-session';
import { z } from 'zod';
import { slugify } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { validateRecipeContent } from '@/lib/content-filter';

// Validation schema for updating a recipe
const updateRecipeSchema = z.object({
  title: z.string().min(5).max(100),
  instructions: z.string().min(20),
  tags: z.array(z.string()).optional(),
});

// Get a single recipe
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const { id } = params;
    const recipe = await prisma.recipe.findUnique({
      where: { id },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const { id } = params;
    const session = await getSession();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to update a recipe' },
        { status: 401 }
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id },
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

    // Check for offensive content
    const contentValidation = validateRecipeContent(title, instructions);
    if (!contentValidation.isValid) {
      return NextResponse.json(
        { 
          message: 'Content contains inappropriate language',
          errors: contentValidation.errors,
          offensiveWords: contentValidation.offensiveWords
        },
        { status: 400 }
      );
    }

    // Generate new slug if title has changed
    let newSlug = recipe.slug;
    if (title !== recipe.title) {
      newSlug = slugify(title);
      
      // Check if the new slug already exists (excluding the current recipe)
      const existingRecipe = await prisma.recipe.findUnique({
        where: { slug: newSlug },
      });
      
      if (existingRecipe && existingRecipe.id !== id) {
        // If slug exists, append a number to make it unique
        let counter = 1;
        let uniqueSlug = `${newSlug}-${counter}`;
        
        while (await prisma.recipe.findUnique({ where: { slug: uniqueSlug } })) {
          counter++;
          uniqueSlug = `${newSlug}-${counter}`;
        }
        
        newSlug = uniqueSlug;
      }
    }

    // Update the recipe with a transaction to handle tags
    const updatedRecipe = await prisma.$transaction(async (tx) => {
      // Delete existing tags
      await tx.recipeTag.deleteMany({
        where: { recipeId: id },
      });

      // Update the recipe
      return tx.recipe.update({
        where: { id },
        data: {
          title,
          slug: newSlug,
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

    // Invalidate cache to ensure fresh data
    revalidateTag('recipes');
    revalidateTag('filtered-recipes');
    revalidateTag('trending-recipes');
    revalidateTag('latest-recipes');
    revalidateTag('tags');
    revalidateTag('popular-tags');

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const { id } = params;
    const session = await getSession();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to delete a recipe' },
        { status: 401 }
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id },
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

    // Delete the recipe and related data in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete all tags associated with the recipe
      await tx.recipeTag.deleteMany({
        where: { recipeId: id },
      });

      // Delete all votes associated with the recipe
      await tx.vote.deleteMany({
        where: { recipeId: id },
      });

      // Delete all bookmarks associated with the recipe
      await tx.bookmark.deleteMany({
        where: { recipeId: id },
      });

      // Delete all tried records associated with the recipe
      await tx.tried.deleteMany({
        where: { recipeId: id },
      });

      // Delete the recipe
      await tx.recipe.delete({
        where: { id },
      });
    });

    // Invalidate cache to ensure fresh data
    revalidateTag('recipes');
    revalidateTag('filtered-recipes');
    revalidateTag('trending-recipes');
    revalidateTag('latest-recipes');
    revalidateTag('tags');
    revalidateTag('popular-tags');

    return NextResponse.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while deleting the recipe' },
      { status: 500 }
    );
  }
} 