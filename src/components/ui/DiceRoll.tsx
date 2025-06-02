'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRecipeUrl } from '@/lib/utils';

interface DiceRollProps {
  isRolling: boolean;
  onRollComplete: () => void;
  targetRecipe?: {
    id: string;
    title: string;
  } | null;
}

export default function DiceRoll({ isRolling, onRollComplete, targetRecipe }: DiceRollProps) {
  const router = useRouter();
  const [diceNumber, setDiceNumber] = useState(1);
  const [rollCount, setRollCount] = useState(0);
  const [rollSpeed, setRollSpeed] = useState(100); // Slower initial speed
  const maxRolls = 15; // Fewer rolls for a shorter animation
  const [redirectInProgress, setRedirectInProgress] = useState(false);
  
  // Effect for dice animation
  useEffect(() => {
    if (!isRolling) return;
    
    // Create dice rolling animation
    const interval = setInterval(() => {
      // Random number between 1 and 20 (d20)
      setDiceNumber(Math.floor(Math.random() * 20) + 1);
      setRollCount(prev => prev + 1);
      
      // Slow down the rolling animation more gently
      if (rollCount > maxRolls * 0.3) {
        setRollSpeed(prev => prev + 10);
      }
      
      // Start redirect around 2/3 through the animation
      if (rollCount > maxRolls * 0.6 && targetRecipe && !redirectInProgress) {
        setRedirectInProgress(true);
        const recipeUrl = getRecipeUrl(targetRecipe.title);
        router.push(recipeUrl);
      }
      
      // When animation completes
      if (rollCount >= maxRolls) {
        clearInterval(interval);
        
        // Final redirect attempt if it hasn't happened yet
        if (targetRecipe && !redirectInProgress) {
          const recipeUrl = getRecipeUrl(targetRecipe.title);
          router.push(recipeUrl);
        }
        
        onRollComplete();
      }
    }, rollSpeed);
    
    return () => {
      clearInterval(interval);
    };
  }, [isRolling, rollCount, rollSpeed, onRollComplete, router, targetRecipe, redirectInProgress]);
  
  // Return nothing if not rolling and at initial state
  if (!isRolling && rollCount === 0) return null;
  
  // Different colors based on roll - using MTG color wheel with softer colors
  const getColor = () => {
    // MTG colors for the dice with reduced intensity
    if (diceNumber >= 1 && diceNumber <= 4) return 'from-[#F8F6D8] to-[#F1EFE1] text-[#2C2E3A]'; // White
    if (diceNumber >= 5 && diceNumber <= 8) return 'from-[#6AADDA] to-[#4A8DBA] text-white'; // Blue
    if (diceNumber >= 9 && diceNumber <= 12) return 'from-[#4D4D4D] to-[#303030] text-white'; // Black
    if (diceNumber >= 13 && diceNumber <= 16) return 'from-[#E77E6C] to-[#D25E4C] text-white'; // Red
    if (diceNumber >= 17 && diceNumber <= 20) return 'from-[#6CB46E] to-[#4C944E] text-white'; // Green
    return 'from-[#E0D689] to-[#D5CB7E] text-[#2C2E3A]'; // Gold fallback
  };
  
  // Get mana symbol based on roll value
  const getManaSymbol = () => {
    if (diceNumber >= 1 && diceNumber <= 4) {
      // White mana - Sun symbol
      return (
        <div className="w-8 h-8 bg-[#FFFCD6] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M50 15 L57 35 L77 35 L61 48 L68 68 L50 56 L32 68 L39 48 L23 35 L43 35 Z" fill="black" />
          </svg>
        </div>
      );
    }
    
    if (diceNumber >= 5 && diceNumber <= 8) {
      // Blue mana - Water drop
      return (
        <div className="w-8 h-8 bg-[#AAE0FA] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M50 15 C50 15 25 45 25 65 C25 85 75 85 75 65 C75 45 50 15 50 15 Z" fill="black" />
          </svg>
        </div>
      );
    }
    
    if (diceNumber >= 9 && diceNumber <= 12) {
      // Black mana - Skull
      return (
        <div className="w-8 h-8 bg-[#C6C2C1] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M50 25 C35 25 25 35 25 50 C25 65 35 75 50 75 C65 75 75 65 75 50 C75 35 65 25 50 25 Z M42 42 C42 45 38 45 38 42 C38 39 42 39 42 42 Z M62 42 C62 45 58 45 58 42 C58 39 62 39 62 42 Z M50 56 L42 48 L58 48 Z M40 67 L36 56 L46 60 Z M60 67 L64 56 L54 60 Z" fill="black" />
          </svg>
        </div>
      );
    }
    
    if (diceNumber >= 13 && diceNumber <= 16) {
      // Red mana - Flame
      return (
        <div className="w-8 h-8 bg-[#F8AA92] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M50 15 C45 30 60 35 60 50 C60 60 50 65 40 60 C40 70 45 80 60 80 C75 80 80 65 75 50 C70 35 55 30 50 15 Z" fill="black" />
          </svg>
        </div>
      );
    }
    
    if (diceNumber >= 17 && diceNumber <= 20) {
      // Green mana - Tree
      return (
        <div className="w-8 h-8 bg-[#A3D39C] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M50 15 C35 30 25 35 25 55 C25 70 35 80 50 80 C65 80 75 70 75 55 C75 35 65 30 50 15 Z M50 40 L40 60 L60 60 Z M50 80 L50 65 L50 80 Z" fill="black" />
          </svg>
        </div>
      );
    }
    
    // Colorless fallback
    return (
      <div className="w-8 h-8 bg-[#E0D689] rounded-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-6 h-6">
          <path d="M50 15 L65 30 L80 15 L70 35 L90 45 L70 50 L90 60 L70 65 L80 85 L60 70 L50 90 L40 70 L20 85 L30 65 L10 60 L30 50 L10 45 L30 35 L20 15 L40 30 Z" fill="black" />
        </svg>
      </div>
    );
  };
  
  // Gentler animation parameters
  const animationDuration = Math.max(0.3, 0.8 - (rollCount / maxRolls) * 0.5);
  const animationScale = 1 + (rollCount / maxRolls) * 0.2; // Less growth
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative">
        {/* Reduced magical sparkles/particles */}
        <div className="absolute inset-0 -m-6 opacity-50">
          <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute bottom-1/4 right-0 w-1 h-1 bg-[#3DA1C4] rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
        </div>
        
        {/* Main d20 dice - simplified and softer */}
        <div 
          className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold bg-gradient-to-br ${getColor()} shadow-lg`}
          style={{ 
            animation: `gentleSpin ${animationDuration}s ease-in-out`,
            transform: `scale(${animationScale})`,
            boxShadow: `0 0 20px rgba(255, 255, 255, 0.2), 
                      0 0 40px rgba(90, 49, 244, 0.1)`,
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <span>{diceNumber}</span>
            <div className="mt-1">{getManaSymbol()}</div>
          </div>
        </div>
        
        {/* Bottom text - simpler */}
        <div className="text-white text-lg mt-6 text-center font-medium">
          Finding a recipe...
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gentleSpin {
          0% { transform: rotate(0deg) scale(${animationScale}); }
          100% { transform: rotate(360deg) scale(${animationScale}); }
        }
      `}</style>
    </div>
  );
} 