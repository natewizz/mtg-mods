"use client";

import { Recipe } from '@prisma/client';
import Link from 'next/link';

// Export this type
export type RecipeWithStats = Recipe & {
  _count?: {
    votes: number;
    tried: number;
  };
  voteSum?: number;
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
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <h3 className="font-bold text-[#2C2E3A] text-lg">{recipe.title}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{recipe.description}</p>
                  
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>👍</span>
                      <span>{recipe.voteSum ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🧪</span>
                      <span>{recipe._count?.tried ?? 0}</span>
                    </div>
                    <div>
                      <span className="text-xs">{new Date(recipe.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 