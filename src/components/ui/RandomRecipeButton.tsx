'use client';

import { useState } from 'react';
import { getRandomRecipe } from '@/lib/recipe-actions';
import DiceRoll from './DiceRoll';

export default function RandomRecipeButton() {
  const [isRolling, setIsRolling] = useState(false);
  const [targetRecipe, setTargetRecipe] = useState<{id: string; title: string} | null>(null);
  
  const handleRandomRecipe = async () => {
    if (isRolling) return;
    
    // Start animation immediately
    setIsRolling(true);
    
    // Fetch recipe in the background
    getRandomRecipe()
      .then(randomRecipe => {
        if (randomRecipe) {
          setTargetRecipe({
            id: randomRecipe.id,
            title: randomRecipe.title,
          });
        } else {
          console.error('No recipes found');
          setIsRolling(false);
        }
      })
      .catch(error => {
        console.error('Error fetching random recipe:', error);
        setIsRolling(false);
      });
  };
  
  const handleRollComplete = () => {
    setIsRolling(false);
    setTargetRecipe(null);
  };
  
  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleRandomRecipe}
        disabled={isRolling}
        className="group relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-[#5A31F4] to-[#3DA1C4] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70"
      >
        {/* Subtle background light effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF8661]/10 to-[#FFC145]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <span className="text-lg relative z-10">Roll for a Random Recipe</span>
        <div className="relative z-10 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#5A31F4]">
          {/* Better D20 dice SVG icon with clearer "20" */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8" fill="currentColor">
            {/* D20 shape with facets */}
            <path d="M256 20.48L20.48 128v256L256 491.52 491.52 384V128L256 20.48z" fill="white" stroke="currentColor" strokeWidth="12"/>
            {/* Lines defining the facets */}
            <path d="M256 20.48L128 170.67h256L256 20.48z M128 170.67v200l-107.52-42.67V128l107.52 42.67z 
                  M128 370.67L256 491.52 384 370.67H128z M384 370.67v-200l107.52-42.67v200l-107.52 42.67z 
                  M384 170.67L256 20.48 128 170.67h256z" fill="none" stroke="currentColor" strokeWidth="8"/>
            {/* Main visible face */}
            <path d="M170 230a86 86 0 1 1 172 0 86 86 0 0 1-172 0z" fill="white" stroke="currentColor" strokeWidth="4"/>
            {/* Number "20" */}
            <path d="M209 242c0-14 7-22 19-22 12 0 19 8 19 19 0 8-3 14-12 23l-12 13v1h24v11h-42v-10l21-21c6-7 9-11 9-16 0-6-4-9-9-9s-9 3-9 9h-8z
                  M287 220v45h-8v-35h-12v-7c6 0 10-1 13-3h7z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Subtle sparkles on hover - reduced */}
        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDuration: '2s' }}></div>
      </button>
      
      <div className="mt-3 text-sm text-gray-500 italic">
        Let fate decide your next MTG mod adventure
      </div>
      
      {isRolling && (
        <DiceRoll 
          isRolling={isRolling} 
          onRollComplete={handleRollComplete} 
          targetRecipe={targetRecipe}
        />
      )}
    </div>
  );
} 