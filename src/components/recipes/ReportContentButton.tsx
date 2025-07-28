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
      <button
        disabled
        className="flex items-center px-3 py-1.5 text-xs rounded-md bg-green-100 text-green-700 border border-green-200"
      >
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Reported
      </button>
    );
  }

  // Don't show button if user is banned
  if (isBanned) {
    return null;
  }

  return (
    <button
      onClick={handleReport}
      disabled={isReporting}
      className="flex items-center px-3 py-1.5 text-xs rounded-md border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
      title="Report inappropriate content"
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      {isReporting ? 'Reporting...' : 'Report Content'}
    </button>
  );
} 