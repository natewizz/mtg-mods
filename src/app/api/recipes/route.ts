import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, getCurrentUserId } from '@/lib/auth/get-session';
import { z } from 'zod';
import { slugify } from '@/lib/utils';

// Validation schema for creating a recipe
const createRecipeSchema = z.object({
  title: z.string().min(5).max(100),
  instructions: z.string().min(20),
  tags: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get the auth session using the helper function
    const session = await getSession();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to create a recipe' },
        { status: 401 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const validationResult = createRecipeSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid recipe data', errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { title, instructions, tags = [] } = validationResult.data;

    // Get the user ID using the helper function
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID not found' },
        { status: 401 }
      );
    }

    // Create the recipe
    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug: slugify(title),
        instructions,
        author: {
          connect: { id: userId },
        },
        tags: {
          create: tags.map(tagName => ({
            name: tagName,
          })),
        },
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the recipe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
            tried: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching recipes' },
      { status: 500 }
    );
  }
} 