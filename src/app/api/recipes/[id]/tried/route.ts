import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { BadgeService } from '@/lib/badge-service';

// Mark a recipe as tried
export async function POST(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to mark recipes as tried' },
        { status: 401 }
      );
    }
    if (!session.user.id) {
      return NextResponse.json(
        { message: 'User ID is missing from session' },
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
    // Create the tried record if it doesn't exist
    const tried = await prisma.tried.upsert({
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

    // Check and award badges for tries received by the recipe author
    if (recipe.authorId !== session.user.id) {
      try {
        await BadgeService.checkTriedBadges(recipe.authorId);
      } catch (badgeError) {
        console.error('Error checking tried badges:', badgeError);
        // Don't fail the tried action if badge checking fails
      }
    }

    return NextResponse.json(tried, { status: 200 });
  } catch (error) {
    console.error('Error marking recipe as tried:', error);
    return NextResponse.json(
      { message: 'An error occurred while marking the recipe as tried' },
      { status: 500 }
    );
  }
}

// Remove tried status
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to update tried status' },
        { status: 401 }
      );
    }
    if (!session.user.id) {
      return NextResponse.json(
        { message: 'User ID is missing from session' },
        { status: 401 }
      );
    }
    // Delete the tried record
    const result = await prisma.tried.delete({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId: params.id,
        },
      },
    }).catch(() => null); // Catch the error if the record doesn't exist
    if (!result) {
      return NextResponse.json(
        { message: 'Tried record not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Tried status removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing tried status:', error);
    return NextResponse.json(
      { message: 'An error occurred while removing the tried status' },
      { status: 500 }
    );
  }
} 