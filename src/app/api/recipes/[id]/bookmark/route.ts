import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// Add a bookmark
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to bookmark recipes' },
        { status: 401 }
      );
    }

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Create the bookmark if it doesn't exist
    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId: params.id,
        },
      },
      update: {}, // No update needed
      create: {
        userId: session.user.id,
        recipeId: params.id,
      },
    });

    return NextResponse.json(bookmark, { status: 200 });
  } catch (error) {
    console.error('Error bookmarking recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while bookmarking the recipe' },
      { status: 500 }
    );
  }
}

// Remove a bookmark
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to remove bookmarks' },
        { status: 401 }
      );
    }

    // Delete the bookmark
    const result = await prisma.bookmark.delete({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId: params.id,
        },
      },
    }).catch(() => null); // Catch the error if the bookmark doesn't exist

    if (!result) {
      return NextResponse.json(
        { message: 'Bookmark not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Bookmark removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return NextResponse.json(
      { message: 'An error occurred while removing the bookmark' },
      { status: 500 }
    );
  }
} 