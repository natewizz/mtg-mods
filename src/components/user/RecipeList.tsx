"use client";

import { Recipe } from '@prisma/client';
import RecipeCard from '@/components/recipes/RecipeCard';

// Export this type - updated to match RecipeCard expectations
export type RecipeWithStats = Recipe & {
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  tags: {
    id: string;
    name: string;
  }[];
  _count: {
    votes: number;
    tried: number;
  };
};

type RecipeListProps = {
  recipes: RecipeWithStats[];
  title: string;
  emptyMessage: string;
};

export default function RecipeList({ recipes, title, emptyMessage }: RecipeListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-[#2C2E3A] mb-4">{title}</h2>
      
      {recipes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
} 