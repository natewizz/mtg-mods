'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserBanned } from '@/hooks/useUserBanned';

interface ReportContentButtonProps {
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
}

export default function ReportContentButton({ 
  recipeId, 
  recipeTitle, 
  recipeSlug 
}: ReportContentButtonProps) {
  const { status } = useSession();
  const router = useRouter();
  const [isReporting, setIsReporting] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { isBanned } = useUserBanned();

  // Check if user is logged in
  const isLoggedIn = status === 'authenticated';

  const handleReport = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href));
      return;
    }

    if (isBanned) {
      alert('Your account has been disabled due to content violations. You cannot report content.');
      return;
    }

    setIsReporting(true);

    try {
      const response = await fetch('/api/recipes/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          recipeTitle,
          recipeSlug,
        }),
      });

      if (response.ok) {
        setIsReported(true);
        // Reset after 3 seconds
        setTimeout(() => setIsReported(false), 3000);
      } else {
        const errorData = await response.json();
        console.error('Failed to report content:', errorData.message);
        // Show error message to user
        alert(errorData.message || 'Failed to report content');
      }
    } catch (error) {
      console.error('Error reporting content:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  if (isReported) {
    return (
      <div className="relative">
        <button
          disabled
          className="flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Reported
        </button>
      </div>
    );
  }

  // Don't show button if user is banned
  if (isBanned) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={handleReport}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={isReporting}
        className="group flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        title="Report inappropriate content"
      >
        <svg 
          className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
        {isReporting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Reporting...
          </span>
        ) : (
          'Report'
        )}
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md shadow-lg z-10 whitespace-nowrap">
          Report inappropriate content
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
} 