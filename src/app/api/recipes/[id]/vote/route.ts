import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';

// Validation schema for voting
const voteSchema = z.object({
  value: z.number().min(-1).max(1),
});

// Define the context type for route handlers
interface RouteContext {
  params: { id: string };
}

// Add or update a vote
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to vote' },
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
      where: { id: context.params.id },
    });
    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }
    // Parse and validate the request body
    const body = await request.json();
    const validationResult = voteSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid vote value', errors: validationResult.error.errors },
        { status: 400 }
      );
    }
    const { value } = validationResult.data;
    // Create or update the vote using upsert
    const vote = await prisma.vote.upsert({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId: context.params.id,
        },
      },
      update: {
        value,
      },
      create: {
        userId: session.user.id,
        recipeId: context.params.id,
        value,
      },
    });
    return NextResponse.json(vote, { status: 200 });
  } catch (error) {
    console.error('Error voting on recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing the vote' },
      { status: 500 }
    );
  }
}

// Remove a vote
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'You must be logged in to remove a vote' },
        { status: 401 }
      );
    }
    if (!session.user.id) {
      return NextResponse.json(
        { message: 'User ID is missing from session' },
        { status: 401 }
      );
    }
    // Delete the vote
    const result = await prisma.vote.delete({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId: context.params.id,
        },
      },
    }).catch(() => null); // Catch the error if the vote doesn't exist
    if (!result) {
      return NextResponse.json(
        { message: 'Vote not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Vote removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json(
      { message: 'An error occurred while removing the vote' },
      { status: 500 }
    );
  }
} 