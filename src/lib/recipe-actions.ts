'use server';

import { prisma } from '@/lib/prisma';
import { FilterTag } from '@/components/recipes/RecipeFilters';
import { subDays } from 'date-fns';

export type SortOption = 'newest' | 'oldest' | 'most-upvoted' | 'most-tried';

interface GetRecipesOptions {
  tagFilters?: string[];
  sortBy?: SortOption;
  take?: number;
  skip?: number;
}

export async function getFilteredRecipes({
  tagFilters = [],
  sortBy = 'newest',
  take = 20,
  skip = 0
}: GetRecipesOptions = {}) {
  try {
    // Base query with filtering
    const baseQuery = {
      where: tagFilters.length > 0 ? {
        tags: {
          some: {
            name: {
              in: tagFilters
            }
          }
        }
      } : {},
      include: {
        author: true,
        votes: true,
        tried: true,
        tags: true,
        _count: {
          select: {
            votes: true,
            tried: true,
          },
        },
      },
      take,
      skip,
    };
    
    // Add sorting options
    const orderBy = getSortOption(sortBy);
    
    // Execute query with dynamic sorting
    const recipes = await prisma.recipe.findMany({
      ...baseQuery,
      orderBy,
    });
    
    return recipes;
  } catch (error) {
    console.error('Error fetching filtered recipes:', error);
    return [];
  }
}

// Get popular tags that appear in at least 2 recipes
export async function getPopularTags(minCount = 2): Promise<FilterTag[]> {
  try {
    // Group and count tags
    const tagCounts = await prisma.recipeTag.groupBy({
      by: ['name'],
      _count: {
        name: true
      },
      having: {
        name: {
          _count: {
            gte: minCount
          }
        }
      },
      orderBy: {
        _count: {
          name: 'desc'
        }
      }
    });
    
    // Format results
    const formattedTags: FilterTag[] = tagCounts.map(tag => ({
      name: tag.name,
      count: tag._count.name
    }));
    
    return formattedTags;
  } catch (error) {
    console.error('Error fetching popular tags:', error);
    return [];
  }
}

// Helper to get the correct Prisma orderBy object based on sort option
function getSortOption(sortBy: SortOption) {
  switch (sortBy) {
    case 'oldest':
      return { createdAt: 'asc' as const };
    
    case 'most-upvoted':
      return { 
        votes: {
          _count: 'desc' as const
        }
      };
    
    case 'most-tried':
      return { 
        tried: {
          _count: 'desc' as const
        }
      };
    
    case 'newest':
    default:
      return { createdAt: 'desc' as const };
  }
}

// Get a random recipe ID
export async function getRandomRecipeId(): Promise<string | null> {
  try {
    // Get count of all recipes
    const count = await prisma.recipe.count();
    
    if (count === 0) {
      return null;
    }
    
    // Get a random offset
    const randomOffset = Math.floor(Math.random() * count);
    
    // Get the random recipe
    const randomRecipe = await prisma.recipe.findFirst({
      skip: randomOffset,
      select: {
        id: true,
        title: true,
      }
    });
    
    if (!randomRecipe) {
      return null;
    }
    
    // Return the random recipe ID
    return randomRecipe.title;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return null;
  }
}

// Get the latest recipes
export async function getLatestRecipes(count = 4) {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        author: true,
        tags: true,
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
      take: count,
    });

    return recipes;
  } catch (error) {
    console.error('Error fetching latest recipes:', error);
    return [];
  }
}

// Get a random recipe for the dice roll feature
export async function getRandomRecipe() {
  try {
    // Get the count of all recipes
    const recipeCount = await prisma.recipe.count();
    
    // Generate a random skip value
    const randomSkip = Math.floor(Math.random() * recipeCount);
    
    // Get a random recipe
    const randomRecipe = await prisma.recipe.findFirst({
      skip: randomSkip,
      include: {
        tags: true,
      },
    });
    
    return randomRecipe;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return null;
  }
}

// Get trending recipes based on recent upvotes, bookmarks, and tried (last 7 days)
export async function getTrendingRecipes({
  days = 7,
  take = 8,
  skip = 0,
}: { days?: number; take?: number; skip?: number } = {}) {
  try {
    const since = subDays(new Date(), days);
    // Find recipes with most recent interactions
    const recipes = await prisma.recipe.findMany({
      include: {
        author: true,
        tags: true,
        votes: {
          where: { createdAt: { gte: since } },
        },
        bookmarks: {
          where: { createdAt: { gte: since } },
        },
        tried: {
          where: { createdAt: { gte: since } },
        },
        _count: {
          select: {
            votes: true,
            bookmarks: true,
            tried: true,
          },
        },
      },
      orderBy: [
        // Sort by trending score: sum of recent votes, bookmarks, tried
        {
          votes: {
            _count: 'desc',
          },
        },
        {
          bookmarks: {
            _count: 'desc',
          },
        },
        {
          tried: {
            _count: 'desc',
          },
        },
        { createdAt: 'desc' },
      ],
      take,
      skip,
    });
    // Optionally, you can compute a trending score in JS if Prisma can't sort by sum
    // For now, return as-is for UI to display
    return recipes;
  } catch (error) {
    console.error('Error fetching trending recipes:', error);
    return [];
  }
} 