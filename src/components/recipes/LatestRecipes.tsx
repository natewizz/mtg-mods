import Link from 'next/link';
import { getLatestRecipes } from '@/lib/recipe-actions';
import RecipeCard from './RecipeCard';
import DiceRollButton from '@/components/ui/DiceRollButton';
import { Recipe, User, Vote, Tried, RecipeTag } from '@prisma/client';

type RecipeWithRelations = Recipe & {
  author: User;
  votes: Vote[];
  tried: Tried[];
  tags: RecipeTag[];
  _count?: {
    votes: number;
    tried: number;
  };
};

function toRecipeWithRelations(recipe: Partial<RecipeWithRelations>): RecipeWithRelations {
  return {
    ...recipe,
    author: recipe.author as User,
    tags: recipe.tags || [],
    _count: recipe._count || { votes: 0, tried: 0 },
    votes: recipe.votes || [],
    tried: recipe.tried || [],
    id: recipe.id!,
    title: recipe.title!,
    createdAt: recipe.createdAt!,
    updatedAt: recipe.updatedAt!,
    authorId: recipe.authorId!,
    instructions: recipe.instructions!,
  };
}

export default async function LatestRecipes() {
  const recipes = await getLatestRecipes(4);
  const safeRecipes = recipes.map(toRecipeWithRelations);
  
  return (
    <div className="bg-[var(--background)] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[var(--dark)] mb-2">Latest Recipes</h2>
            <p className="text-gray-600">Check out the newest MTG mod creations from the community</p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <DiceRollButton />
            <Link 
              href="/recipes" 
              className="flex items-center justify-center bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              View All
            </Link>
          </div>
        </div>
        
        {safeRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share your MTG mod recipe!</p>
            <Link 
              href="/recipes/new" 
              className="inline-block bg-[var(--primary)] text-white font-bold py-2 px-6 rounded-lg"
            >
              Share a Recipe
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 