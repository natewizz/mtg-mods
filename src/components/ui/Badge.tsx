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
  className = ''
}: BadgeProps) {
  const [showTooltipState, setShowTooltipState] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  };

  const tooltipContent = (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50">
      <div className="font-semibold">{displayName}</div>
      <div className="text-gray-300 text-xs">{description}</div>
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
          ${color} 
          rounded-full 
          flex 
          items-center 
          justify-center 
          shadow-md 
          hover:shadow-lg 
          transition-shadow 
          duration-200 
          cursor-pointer
        `}
        title={showTooltip ? undefined : `${displayName}: ${description}`}
      >
        <span className="select-none">{icon}</span>
      </div>
      
      {showTooltip && showTooltipState && tooltipContent}
    </div>
  );
} 