"use client";

import { Recipe } from '@prisma/client';
import Link from 'next/link';
import { getRecipeUrl } from '@/lib/utils';

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
            <Link href={getRecipeUrl(recipe.title)} key={recipe.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <h3 className="font-bold text-[#2C2E3A] text-lg">{recipe.title}</h3>
                  
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
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