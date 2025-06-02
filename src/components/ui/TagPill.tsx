'use client';

import { getTagStyle } from '@/lib/tag-utils';

export interface TagPillProps {
  tag: string;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function TagPill({ tag, className = '', onClick, size = 'md' }: TagPillProps) {
  const { bgStyle, textStyle } = getTagStyle(tag);
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };
  
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium shadow-sm ${sizeClasses[size]} ${onClick ? 'cursor-pointer hover:opacity-90 transform hover:-translate-y-px transition-all' : ''} ${className}`}
      onClick={onClick}
      style={{
        ...bgStyle,
        ...textStyle
      }}
    >
      {tag}
    </span>
  );
} 