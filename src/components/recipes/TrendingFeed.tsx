import { getTrendingRecipes } from '@/lib/recipe-actions';
import RecipeCard from './RecipeCard';

export async function TrendingFeed() {
  const recipes = await getTrendingRecipes({ take: 8 });

  if (!recipes.length)
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        No trending recipes found. Try creating or interacting with recipes!
      </div>
    );

  return (
    <section className="w-full max-w-5xl mx-auto px-2 md:px-0">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Trending Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} compact={true} />
        ))}
      </div>
    </section>
  );
}

// Suspense fallback wrapper for client-side loading (if needed)
export function TrendingFeedFallback() {
  return (
    <div className="w-full py-8 text-center text-muted-foreground animate-pulse">
      Loading trending recipes...
    </div>
  );
} 