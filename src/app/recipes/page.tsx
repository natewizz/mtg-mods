import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import RecipeCard from '@/components/recipes/RecipeCard';

async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        author: true,
        votes: true,
        tried: true,
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
      take: 20,
    });
    
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export default async function RecipesPage() {
  const recipes = await getRecipes();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--dark)]">All Recipes</h1>
        
        <Link 
          href="/recipes/new" 
          className="btn-primary"
        >
          Share a Recipe
        </Link>
      </div>
      
      <Suspense fallback={<div>Loading recipes...</div>}>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No recipes have been shared yet.</p>
            <p className="mt-2">
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
