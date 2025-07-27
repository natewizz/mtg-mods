'use client';

import { useState } from 'react';
import DiceRoll from './DiceRoll';

export default function RandomRecipeButton() {
  const [isRolling, setIsRolling] = useState(false);
  const [targetRecipe, setTargetRecipe] = useState<{ id: string; title: string; slug: string } | null>(null);
  
  const handleRandomRecipe = async () => {
    if (isRolling) return;
    
    try {
      // Fetch a random recipe
      const response = await fetch('/api/recipes/random');
      const randomRecipe = await response.json();
      
      if (randomRecipe && randomRecipe.slug) {
        setTargetRecipe(randomRecipe);
        setIsRolling(true);
      } else {
        console.error('No recipes found');
      }
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
  };

  const handleRollComplete = () => {
    setIsRolling(false);
    setTargetRecipe(null);
  };
  
  return (
    <>
      <button 
        onClick={handleRandomRecipe}
        disabled={isRolling}
        className="flex items-center gap-3 bg-gradient-to-r from-[#D3202A] to-[#BF9B30] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50"
      >
        <span className="text-lg">Random Recipe</span>
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#D3202A] font-bold text-xl">
          🎲
        </div>
      </button>
      
      {/* The full-screen dice animation overlay */}
      {isRolling && (
        <DiceRoll 
          isRolling={isRolling}
          onRollComplete={handleRollComplete}
          targetRecipe={targetRecipe}
        />
      )}
    </>
  );
} 