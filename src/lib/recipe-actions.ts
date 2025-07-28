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



// Cached versions with proper cache tags for invalidation
export const getFilteredRecipes = unstable_cache(
  _getFilteredRecipes,
  ['filtered-recipes'],
  {
    tags: ['recipes', 'filtered-recipes'],
    revalidate: 60, // Revalidate every 60 seconds
  }
);

export const getTrendingRecipes = unstable_cache(
  _getTrendingRecipes,
  ['trending-recipes'],
  {
    tags: ['recipes', 'trending-recipes'],
    revalidate: 60,
  }
);

export const getPopularTags = unstable_cache(
  _getPopularTags,
  ['popular-tags'],
  {
    tags: ['tags', 'popular-tags'],
    revalidate: 300, // Revalidate every 5 minutes
  }
);

export const getLatestRecipes = unstable_cache(
  _getLatestRecipes,
  ['latest-recipes'],
  {
    tags: ['recipes', 'latest-recipes'],
    revalidate: 60,
  }
);

export const getRandomRecipe = unstable_cache(
  _getRandomRecipe,
  ['random-recipe'],
  {
    tags: ['recipes', 'random-recipe'],
    revalidate: 300,
  }
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