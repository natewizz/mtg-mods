'use client';

import { useState } from 'react';

interface BadgeProps {
  icon: string;
  color: string;
  displayName: string;
  description: string;
  earnedAt?: string;
  awardedBy?: {
    name?: string;
    username?: string;
  };
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
  useSvg?: boolean; // New prop to use SVG instead of emoji
}

export default function Badge({
  icon,
  color,
  displayName,
  description,
  earnedAt,
  awardedBy,
  size = 'md',
  showTooltip = true,
  className = '',
  useSvg = false
}: BadgeProps) {
  const [showTooltipState, setShowTooltipState] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  };

  // Enhanced color classes with gradients and effects
  const getColorClasses = (baseColor: string) => {
    const colorMap: Record<string, string> = {
      'bg-gray-500': 'bg-gradient-to-br from-gray-400 to-gray-600 shadow-gray-500/20',
      'bg-blue-500': 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/20',
      'bg-purple-500': 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/20',
      'bg-green-500': 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/20',
      'bg-red-500': 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/20',
      'bg-emerald-500': 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/20',
      'bg-yellow-500': 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-500/20',
      'bg-orange-500': 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/20',
      'bg-purple-600': 'bg-gradient-to-br from-purple-500 to-purple-700 shadow-purple-600/20',
      'bg-purple-700': 'bg-gradient-to-br from-purple-600 to-purple-800 shadow-purple-700/20',
      'bg-purple-400': 'bg-gradient-to-br from-purple-300 to-purple-500 shadow-purple-400/20',
      'bg-blue-400': 'bg-gradient-to-br from-blue-300 to-blue-500 shadow-blue-400/20',
      'bg-blue-600': 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-600/20',
      'bg-blue-700': 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-700/20',
      'bg-blue-800': 'bg-gradient-to-br from-blue-700 to-blue-900 shadow-blue-800/20',
      'bg-blue-900': 'bg-gradient-to-br from-blue-800 to-blue-950 shadow-blue-900/20',
      'bg-red-400': 'bg-gradient-to-br from-red-300 to-red-500 shadow-red-400/20',
      'bg-red-600': 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-600/20',
      'bg-red-700': 'bg-gradient-to-br from-red-600 to-red-800 shadow-red-700/20',
      'bg-red-800': 'bg-gradient-to-br from-red-700 to-red-900 shadow-red-800/20',
      'bg-red-900': 'bg-gradient-to-br from-red-800 to-red-950 shadow-red-900/20',
      'bg-emerald-400': 'bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-emerald-400/20',
      'bg-emerald-600': 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-600/20',
      'bg-emerald-700': 'bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-emerald-700/20',
      'bg-emerald-800': 'bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-emerald-800/20',
      'bg-emerald-900': 'bg-gradient-to-br from-emerald-800 to-emerald-950 shadow-emerald-900/20',
      'bg-yellow-400': 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-yellow-400/20',
      'bg-yellow-600': 'bg-gradient-to-br from-yellow-500 to-yellow-700 shadow-yellow-600/20',
      'bg-yellow-700': 'bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-yellow-700/20',
      'bg-yellow-800': 'bg-gradient-to-br from-yellow-700 to-yellow-900 shadow-yellow-800/20',
      'bg-yellow-900': 'bg-gradient-to-br from-yellow-800 to-yellow-950 shadow-yellow-900/20',
    };

    return colorMap[baseColor] || baseColor;
  };

  const tooltipContent = (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 border border-gray-700">
      <div className="font-semibold text-white">{displayName}</div>
      <div className="text-gray-300 text-xs mt-1">{description}</div>
      {earnedAt && (
        <div className="text-gray-400 text-xs mt-1">
          Earned {new Date(earnedAt).toLocaleDateString()}
        </div>
      )}
      {awardedBy && (
        <div className="text-gray-400 text-xs">
          Awarded by {awardedBy.name || awardedBy.username}
        </div>
      )}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
    </div>
  );

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => showTooltip && setShowTooltipState(true)}
      onMouseLeave={() => showTooltip && setShowTooltipState(false)}
    >
      <div 
        className={`
          ${sizeClasses[size]} 
          ${getColorClasses(color)}
          rounded-full 
          flex 
          items-center 
          justify-center 
          shadow-lg
          hover:shadow-xl
          hover:scale-110
          transition-all 
          duration-200 
          cursor-pointer
          border-2 border-white/20
          backdrop-blur-sm
        `}
        title={showTooltip ? undefined : `${displayName}: ${description}`}
      >
        {useSvg ? (
          // SVG icon placeholder - you can replace with actual SVG icons
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <span className="select-none drop-shadow-sm">{icon}</span>
        )}
      </div>
      
      {showTooltip && showTooltipState && tooltipContent}
    </div>
  );
} 