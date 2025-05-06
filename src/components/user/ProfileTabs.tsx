"use client";

import { useState } from 'react';
import RecipeList from './RecipeList';
import { Recipe } from '@prisma/client';

type RecipeWithStats = Recipe & {
  _count?: {
    votes: number;
    tried: number;
  };
  voteSum?: number;
};

type ProfileTabsProps = {
  recipes: RecipeWithStats[];
  bookmarkedRecipes: RecipeWithStats[];
  triedRecipes: RecipeWithStats[];
  isCurrentUser: boolean;
};

type TabType = 'recipes' | 'bookmarks' | 'tried';

export default function ProfileTabs({ 
  recipes, 
  bookmarkedRecipes, 
  triedRecipes,
  isCurrentUser
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('recipes');

  const tabs = [
    { id: 'recipes' as TabType, label: 'Recipes' },
    { id: 'bookmarks' as TabType, label: 'Bookmarks' },
    { id: 'tried' as TabType, label: 'Tried' },
  ];

  return (
    <div className="mt-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-[#5A31F4] text-[#5A31F4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-4">
        {activeTab === 'recipes' && (
          <RecipeList
            recipes={recipes}
            title={isCurrentUser ? 'Your Recipes' : 'Their Recipes'}
            emptyMessage={isCurrentUser 
              ? "You haven't created any recipes yet. Create your first recipe!" 
              : "This user hasn't created any recipes yet."}
          />
        )}

        {activeTab === 'bookmarks' && (
          <RecipeList
            recipes={bookmarkedRecipes}
            title={isCurrentUser ? 'Your Bookmarks' : 'Their Bookmarks'}
            emptyMessage={isCurrentUser 
              ? "You haven't bookmarked any recipes yet." 
              : "This user hasn't bookmarked any recipes yet."}
          />
        )}

        {activeTab === 'tried' && (
          <RecipeList
            recipes={triedRecipes}
            title={isCurrentUser ? 'Recipes You\'ve Tried' : 'Recipes They\'ve Tried'}
            emptyMessage={isCurrentUser 
              ? "You haven't marked any recipes as tried yet." 
              : "This user hasn't marked any recipes as tried yet."}
          />
        )}
      </div>
    </div>
  );
} 