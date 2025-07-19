'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomRecipe } from '@/lib/recipe-actions';

export default function DiceRollButton() {
  const router = useRouter();
  const [isRolling, setIsRolling] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  
  const handleRandomRecipe = async () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Animate the dice roll
    const rollInterval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    try {
      // Fetch a random recipe in parallel with the animation
      const randomRecipe = await getRandomRecipe();
      
      // Let the animation play for a bit
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the interval and navigate to the random recipe
      clearInterval(rollInterval);
      setIsRolling(false);
      
      if (randomRecipe && randomRecipe.slug) {
        router.push(`/recipes/${randomRecipe.slug}`);
      } else {
        console.error('No recipes found');
        setIsRolling(false);
      }
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      clearInterval(rollInterval);
      setIsRolling(false);
    }
  };
  
  return (
    <button 
      onClick={handleRandomRecipe}
      disabled={isRolling}
      className={`flex items-center gap-3 bg-gradient-to-r from-[#D3202A] to-[#BF9B30] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${isRolling ? 'animate-pulse' : ''}`}
    >
      <span className="text-lg">Random Recipe</span>
      <div className={`w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#D3202A] font-bold text-xl ${isRolling ? 'animate-spin' : ''}`}>
        {diceNumber}
      </div>
    </button>
  );
} 