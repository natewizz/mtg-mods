import { Suspense } from 'react';
import Link from 'next/link';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFiltersWrapper from './RecipeFiltersWrapper';
import { getFilteredRecipes, getPopularTags } from '@/lib/recipe-actions';
import { SortOption } from '@/components/recipes/RecipeFilters';
import { TrendingFeed, TrendingFeedFallback } from '@/components/recipes/TrendingFeed';

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ tags?: string; sort?: SortOption }> }) {
  const resolvedSearchParams = await searchParams;
  // Parse filter parameters from URL
  const tagFilters = resolvedSearchParams.tags ? resolvedSearchParams.tags.split(',') : [];
  const sortBy = (resolvedSearchParams.sort as SortOption) || 'newest';
  
  // Fetch filtered recipes and popular tags
  const [recipes, popularTags] = await Promise.all([
    getFilteredRecipes({ tagFilters, sortBy }),
    getPopularTags(2) // Tags that appear in at least 2 recipes
  ]);
  
  return (
    <div className="space-y-6">
      {/* Trending Feed Section */}
      <Suspense fallback={<TrendingFeedFallback />}>
        <TrendingFeed />
      </Suspense>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--dark)]">All Recipes</h1>
        
        <Link 
          href="/recipes/new" 
          className="btn-primary"
        >
          Share a Recipe
        </Link>
      </div>
      
      {/* Filter and sort component */}
      <RecipeFiltersWrapper 
        availableTags={popularTags}
        initialTags={tagFilters}
        initialSort={sortBy}
      />
      
      <Suspense fallback={<div>Loading recipes...</div>}>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-2">No recipes found</h2>
            {tagFilters.length > 0 ? (
              <p className="text-gray-500">No recipes match your current filter selection.</p>
            ) : (
              <p className="text-gray-500">No recipes have been shared yet.</p>
            )}
            <p className="mt-4">
              <Link href="/recipes/new" className="text-[var(--primary)] hover:underline">
                Be the first to share a recipe!
              </Link>
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: "All MTG Mods Recipes – Magic: The Gathering Rule Variants",
  description: "Browse all Magic: The Gathering rule modifications, custom formats, and community-created game variants. Filter by tags and discover trending recipes.",
  keywords: [
    "Magic the Gathering", "MTG", "recipes", "rule variants", "custom rules", "game mods", "community", "trending", "deck building"
  ],
  openGraph: {
    title: "All MTG Mods Recipes – Magic: The Gathering Rule Variants",
    description: "Browse all Magic: The Gathering rule modifications, custom formats, and community-created game variants. Filter by tags and discover trending recipes.",
    url: "https://mtgmods.xyz/recipes",
    siteName: "MTG Mods",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MTG Mods Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "All MTG Mods Recipes – Magic: The Gathering Rule Variants",
    description: "Browse all Magic: The Gathering rule modifications, custom formats, and community-created game variants. Filter by tags and discover trending recipes.",
    images: ["/logo.png"]
  }
};
