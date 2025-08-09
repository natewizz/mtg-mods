import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, getCurrentUserId } from '@/lib/auth/get-session';
import { z } from 'zod';
import { slugify } from '@/lib/utils';
import { getLatestRecipes, getTrendingRecipes } from '@/lib/recipe-actions';
import { revalidateTag } from 'next/cache';
import { validateRecipeContent } from '@/lib/content-filter';
import { BadgeService } from '@/lib/badge-service';

// Validation schema for creating a recipe
const createRecipeSchema = z.object({
  title: z.string().min(5).max(100),
  instructions: z.string().min(20),
  attachmentName: z.string().optional(),
  attachmentUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
}).refine((data) => {
  // If attachmentUrl is provided, attachmentName must also be provided
  if (data.attachmentUrl && !data.attachmentName) {
    return false;
  }
  return true;
}, {
  message: "Please name your attachment",
  path: ["attachmentName"],
}).refine((data) => {
  // Validate Google Drive PDF URL if provided
  if (data.attachmentUrl) {
    const googleDrivePdfRegex = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view(\?usp=sharing)?$/;
    return googleDrivePdfRegex.test(data.attachmentUrl);
  }
  return true;
}, {
  message: "Only PDF files saved to Google Drive are accepted at this time",
  path: ["attachmentUrl"],
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

    const { title, instructions, attachmentName, attachmentUrl, tags = [] } = validationResult.data;

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
        attachmentName,
        attachmentUrl,
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

    // Check and award badges for recipe creation
    try {
      await BadgeService.checkRecipeBadges(userId);
    } catch (badgeError) {
      console.error('Error checking recipe badges:', badgeError);
      // Don't fail the recipe creation if badge checking fails
    }

    // Invalidate cache to ensure fresh data
    revalidateTag('recipes');
    revalidateTag('filtered-recipes');
    revalidateTag('trending-recipes');
    revalidateTag('latest-recipes');
    revalidateTag('tags');
    revalidateTag('popular-tags');

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the recipe' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latest = searchParams.get('latest');
    const trending = searchParams.get('trending');
    
    // If latest parameter is provided, return latest recipes
    if (latest) {
      const count = parseInt(latest, 10) || 4;
      const recipes = await getLatestRecipes(count);
      return NextResponse.json(recipes);
    }
    
    // If trending parameter is provided, return trending recipes
    if (trending) {
      const count = parseInt(trending, 10) || 4;
      const recipes = await getTrendingRecipes({ take: count });
      return NextResponse.json(recipes);
    }
    
    // Default behavior - return all recipes
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