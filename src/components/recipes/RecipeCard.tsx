'use client';

import Link from 'next/link';
import { Recipe, User, Vote, Tried, RecipeTag } from '@prisma/client';
import { getRecipeUrl } from '@/lib/utils';
import TagPill from '@/components/ui/TagPill';

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
      <div className="card hover:shadow-lg transition-shadow min-h-[320px] h-full flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-[var(--dark)]">{recipe.title}</h2>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        
        {/* Display tags if available */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <TagPill 
                key={tag.id} 
                tag={tag.name} 
                className="text-xs"
              />
            ))}
            {recipe.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{recipe.tags.length - 3} more</span>
            )}
          </div>
        )}
        
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