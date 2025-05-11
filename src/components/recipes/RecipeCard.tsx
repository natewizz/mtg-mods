'use client';

import Link from 'next/link';
import { Recipe, User, Vote, Tried } from '@prisma/client';
import { getRecipeUrl } from '@/lib/utils';

type RecipeWithRelations = Recipe & {
  author: User;
  votes: Vote[];
  tried: Tried[];
  _count?: {
    votes: number;
    tried: number;
  };
};

interface RecipeCardProps {
  recipe: RecipeWithRelations;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  // Calculate vote count (upvotes - downvotes)
  const voteCount = recipe._count?.votes || recipe.votes.reduce((sum, vote) => sum + vote.value, 0);
  
  // Count of people who tried the recipe
  const triedCount = recipe._count?.tried || recipe.tried.length;

  // Generate the recipe URL with only the title for SEO
  const recipeUrl = getRecipeUrl(recipe.title);

  return (
    <Link href={recipeUrl}>
      <div className="card hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-2 text-[var(--dark)]">{recipe.title}</h2>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium mr-1">By</span>
            <span>{recipe.author.name || recipe.author.username || 'Anonymous'}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-1">🔼</span>
              <span>{voteCount}</span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-1">✅</span>
              <span>{triedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 