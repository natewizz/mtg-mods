import { Suspense } from 'react';
import Link from 'next/link';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFiltersWrapper from './RecipeFiltersWrapper';
import { getFilteredRecipes, getPopularTags, preloadFilteredRecipes, preloadPopularTags } from '@/lib/recipe-actions';
import { SortOption } from '@/components/recipes/RecipeFilters';
import { Metadata } from 'next';

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ tags?: string; sort?: SortOption }> }) {
  const resolvedSearchParams = await searchParams;
  // Parse filter parameters from URL
  const tagFilters = resolvedSearchParams.tags ? resolvedSearchParams.tags.split(',') : [];
  const sortBy = (resolvedSearchParams.sort as SortOption) || 'newest';
  
  // Preload data for better performance
  preloadFilteredRecipes({ tagFilters, sortBy });
  preloadPopularTags(2);
  
  // Fetch data in parallel - always fetch recipes and tags
  const [recipes, popularTags] = await Promise.all([
    getFilteredRecipes({ tagFilters, sortBy }),
    getPopularTags(2),
  ]);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--dark)]">All Recipes</h1>
        
        <Link 
          href="/recipes/new" 
          className="btn-primary"
        >
          Create Recipe
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <p className="text-gray-500">No recipes have been created yet.</p>
            )}
            <p className="mt-4">
              <Link href="/recipes/new" className="text-[var(--primary)] hover:underline">
                Be the first to create a recipe!
              </Link>
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: "All Cantripped Recipes – Magic: The Gathering Rule Variants",
  description: "Browse all Magic: The Gathering rule modifications, custom formats, and community-created game variants. Filter by tags and discover trending recipes.",
  keywords: [
    "Magic the Gathering", "MTG", "recipes", "rule modifications", "game variants", "custom rules", "community", "Cantripped"
  ],
  alternates: {
    canonical: 'https://www.cantripped.com/recipes',
  },
  openGraph: {
    title: "All Cantripped Recipes – Magic: The Gathering Rule Variants",
    description: "Browse all Magic: The Gathering rule modifications, custom formats, and community-created game variants. Filter by tags and discover trending recipes.",
    url: "https://www.cantripped.com/recipes",
    siteName: "Cantripped",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=All%20Cantripped%20Recipes&description=Browse%20all%20Magic%3A%20The%20Gathering%20rule%20modifications%2C%20custom%20formats%2C%20and%20community-created%20game%20variants&type=default`,
        width: 1200,
        height: 630,
        alt: "All Cantripped Recipes - Magic: The Gathering Rule Variants"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Cantripped Recipes – Magic: The Gathering Rule Variants",
    description: "Browse all Magic: The Gathering rule modifications, custom formats, and community-created game variants. Filter by tags and discover trending recipes.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=All%20Cantripped%20Recipes&description=Browse%20all%20Magic%3A%20The%20Gathering%20rule%20modifications%2C%20custom%20formats%2C%20and%20community-created%20game%20variants&type=default`]
  }
};
