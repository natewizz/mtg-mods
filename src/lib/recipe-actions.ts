import { cache } from 'react'
import { unstable_cache } from 'next/cache'
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

// Core database query functions - not cached here to allow different cache strategies
async function _getFilteredRecipes({
  tagFilters = [],
  sortBy = 'newest',
  take = 20,
  skip = 0
}: GetRecipesOptions = {}) {
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
}

async function _getTrendingRecipes({
  take = 8,
  skip = 0,
}: { take?: number; skip?: number } = {}) {
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
}

async function _getPopularTags(minCount = 2): Promise<FilterTag[]> {
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
}

async function _getLatestRecipes(count = 4) {
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
}

async function _getRandomRecipe() {
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
}

// Helper function to normalize sort options for consistent caching
function normalizeGetRecipesOptions(options: GetRecipesOptions = {}): GetRecipesOptions {
  return {
    ...options,
    sortBy: (options.sortBy === 'newest' || !options.sortBy) ? 'newest' as SortOption : options.sortBy,
    tagFilters: options.tagFilters?.sort(), // Sort tags for consistent cache keys
    take: options.take || 15,
    skip: options.skip || 0,
  };
}

// Internal cached function
const _getCachedFilteredRecipes = cache(
  unstable_cache(
    async (normalizedOptions: GetRecipesOptions) => {
      try {
        return await _getFilteredRecipes(normalizedOptions);
      } catch (error) {
        console.error('Error fetching filtered recipes:', error);
        return [];
      }
    },
    ['filtered-recipes'],
    {
      revalidate: 30, // Cache for 30 seconds
      tags: ['recipes', 'filtered-recipes'],
    }
  )
);

// Public interface that normalizes options before caching
export const getFilteredRecipes = async (options: GetRecipesOptions = {}) => {
  const normalizedOptions = normalizeGetRecipesOptions(options);
  return _getCachedFilteredRecipes(normalizedOptions);
};

export const getTrendingRecipes = cache(
  unstable_cache(
    async (options: { take?: number; skip?: number } = {}) => {
      try {
        return await _getTrendingRecipes(options);
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
        return [];
      }
    },
    ['trending-recipes'],
    {
      revalidate: 60, // Cache for 1 minute since trending changes less frequently
      tags: ['recipes']
    }
  )
);

export const getPopularTags = cache(
  unstable_cache(
    async (minCount = 2): Promise<FilterTag[]> => {
      try {
        return await _getPopularTags(minCount);
      } catch (error) {
        console.error('Error fetching popular tags:', error);
        return [];
      }
    },
    ['popular-tags'],
    {
      revalidate: 300, // Cache for 5 minutes since tags change even less frequently
      tags: ['tags']
    }
  )
);

export const getLatestRecipes = cache(
  unstable_cache(
    async (count = 4) => {
      try {
        return await _getLatestRecipes(count);
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
        return [];
      }
    },
    ['latest-recipes'],
    {
      revalidate: 60, // Cache for 1 minute
      tags: ['recipes']
    }
  )
);

export const getRandomRecipe = cache(
  unstable_cache(
    async () => {
      try {
        return await _getRandomRecipe();
      } catch (error) {
        console.error('Error fetching random recipe:', error);
        return null;
      }
    },
    ['random-recipe'],
    {
      revalidate: false, // Don't cache random recipes - they should be random!
    }
  )
);

// Preload function for filtered recipes
export const preloadFilteredRecipes = (options: GetRecipesOptions = {}) => {
  void getFilteredRecipes(options);
};

export const preloadTrendingRecipes = (options: { take?: number; skip?: number } = {}) => {
  void getTrendingRecipes(options);
};

export const preloadPopularTags = (minCount = 2) => {
  void getPopularTags(minCount);
};

export const preloadLatestRecipes = (count = 4) => {
  void getLatestRecipes(count);
};

// Helper function for random recipe ID (legacy support)
export const getRandomRecipeId = cache(async (): Promise<string | null> => {
  const recipe = await getRandomRecipe();
  return recipe?.title || null;
}); 