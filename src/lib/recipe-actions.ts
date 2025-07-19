import { cache } from 'react'
import 'server-only'
import { prisma } from '@/lib/prisma';
import { FilterTag } from '@/components/recipes/RecipeFilters';

export type SortOption = 'newest' | 'oldest' | 'most-upvoted' | 'most-tried';

interface GetRecipesOptions {
  tagFilters?: string[];
  sortBy?: SortOption;
  take?: number;
  skip?: number;
}

// Helper to get the correct Prisma orderBy object based on sort option
function getSortOption(sortBy: SortOption) {
  switch (sortBy) {
    case 'oldest':
      return { createdAt: 'asc' as const };
    
    case 'most-upvoted':
      // For now, fall back to newest since Prisma doesn't support sorting by relation counts
      // TODO: Implement proper sorting by vote count using a different approach
      return { createdAt: 'desc' as const };
    
    case 'most-tried':
      // For now, fall back to newest since Prisma doesn't support sorting by relation counts
      // TODO: Implement proper sorting by tried count using a different approach
      return { createdAt: 'desc' as const };
    
    case 'newest':
    default:
      return { createdAt: 'desc' as const };
  }
}

// Cached and optimized recipe fetching with single query
export const getFilteredRecipes = cache(async ({
  tagFilters = [],
  sortBy = 'newest',
  take = 20,
  skip = 0
}: GetRecipesOptions = {}) => {
  try {
    // Single optimized query that fetches everything needed
    const recipes = await prisma.recipe.findMany({
      where: tagFilters.length > 0 ? {
        tags: {
          some: {
            name: {
              in: tagFilters
            }
          }
        }
      } : {},
      select: {
        id: true,
        title: true,
        slug: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            votes: true,
            tried: true,
          },
        },
      },
      orderBy: getSortOption(sortBy),
      take,
      skip,
    });
    
    return recipes;
  } catch (error) {
    console.error('Error fetching filtered recipes:', error);
    return [];
  }
});

// Preload function for eager data fetching
export const preloadFilteredRecipes = (options: GetRecipesOptions = {}) => {
  void getFilteredRecipes(options);
};

// Cached trending recipes with optimized single query
export const getTrendingRecipes = cache(async ({
  take = 8,
  skip = 0,
}: { take?: number; skip?: number } = {}) => {
  try {
    // Single optimized query for trending recipes
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            votes: true,
            bookmarks: true,
            tried: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: take * 2, // Fetch more to allow for sorting
      skip,
    });

    // Client-side sorting by activity score (more efficient than complex Prisma queries)
    const recipesWithActivity = recipes.map(recipe => ({
      ...recipe,
      activityScore: recipe._count.votes + recipe._count.bookmarks + recipe._count.tried
    }));

    // Sort by activity score and return top results
    return recipesWithActivity
      .sort((a, b) => b.activityScore - a.activityScore)
      .slice(0, take);
  } catch (error) {
    console.error('Error fetching trending recipes:', error);
    return [];
  }
});

// Preload function for trending recipes
export const preloadTrendingRecipes = (options: { take?: number; skip?: number } = {}) => {
  void getTrendingRecipes(options);
};

// Cached popular tags fetching
export const getPopularTags = cache(async (minCount = 2): Promise<FilterTag[]> => {
  try {
    const tags = await prisma.recipeTag.groupBy({
      by: ['name'],
      _count: {
        name: true,
      },
      having: {
        name: {
          _count: {
            gte: minCount,
          },
        },
      },
      orderBy: {
        _count: {
          name: 'desc',
        },
      },
    });

    return tags.map(tag => ({
      name: tag.name,
      count: tag._count.name,
    }));
  } catch (error) {
    console.error('Error fetching popular tags:', error);
    return [];
  }
});

// Preload function for popular tags
export const preloadPopularTags = (minCount = 2) => {
  void getPopularTags(minCount);
};

// Cached latest recipes fetching
export const getLatestRecipes = cache(async (count = 4) => {
  try {
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
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
      take: count * 2, // Fetch more to account for filtering
    });

    // Filter out recipes with null or empty slugs
    return recipes.filter(r => r.slug && r.slug.trim() !== '').slice(0, count);
  } catch (error) {
    console.error('Error fetching latest recipes:', error);
    return [];
  }
});

// Preload function for latest recipes
export const preloadLatestRecipes = (count = 4) => {
  void getLatestRecipes(count);
};

// Cached random recipe fetching
export const getRandomRecipe = cache(async () => {
  try {
    const count = await prisma.recipe.count();
    if (count === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * count);
    const recipe = await prisma.recipe.findFirst({
      skip: randomIndex,
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });
    return recipe;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return null;
  }
});

// Helper function for random recipe ID (legacy support)
export const getRandomRecipeId = cache(async (): Promise<string | null> => {
  const recipe = await getRandomRecipe();
  return recipe?.title || null;
}); 