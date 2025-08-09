"use client";
import { useState } from 'react';

interface RecipeCopyLinkButtonProps {
  recipeUrl: string;
  className?: string;
}

// Custom copy link button for RecipeCard component
export default function RecipeCopyLinkButton({ recipeUrl, className = '' }: RecipeCopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${recipeUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  return (
    <button
      onClick={handleCopy}
      className={`px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center gap-1 ${className}`}
      title="Copy recipe link"
      type="button"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17v1a3 3 0 003 3h6a3 3 0 003-3v-6a3 3 0 00-3-3h-1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7V6a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h1" />
      </svg>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
} 