import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const { recipeId, recipeTitle, recipeSlug } = await request.json();

    if (!recipeId || !recipeTitle || !recipeSlug) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Verify the recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId }
    });

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    // Create the content report in the database
    const newReport = await prisma.contentReport.create({
      data: {
        recipeId,
        recipeTitle,
        recipeSlug,
        reporterId: session.user.id,
        status: 'PENDING'
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        recipe: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      }
    });

    console.log(`Content report created for recipe: ${recipeTitle}`);

    return NextResponse.json({ 
      message: 'Content reported successfully',
      report: {
        id: newReport.id,
        recipeId: newReport.recipeId,
        recipeTitle: newReport.recipeTitle,
        recipeSlug: newReport.recipeSlug,
        reporterId: newReport.reporterId,
        status: newReport.status,
        createdAt: newReport.createdAt,
        reporter: newReport.reporter
      }
    });

  } catch (error) {
    console.error('Error creating content report:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 