'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserStrikes } from '@/contexts/UserStrikesContext';
import ReportContentButton from './ReportContentButton';

interface RecipeInteractionsProps {
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  initialVoteValue?: number | null;
  initialBookmarked: boolean;
  initialTried: boolean;
  voteCount: number;
  triedCount: number;
}

export default function RecipeInteractions({
  recipeId,
  recipeTitle,
  recipeSlug,
  initialVoteValue = null,
  initialBookmarked = false,
  initialTried = false,
  voteCount = 0,
  triedCount = 0,
}: RecipeInteractionsProps) {
  const { status } = useSession();
  const router = useRouter();
  const { isBanned } = useUserStrikes();
  
  // Local state for optimistic updates
  const [userVote, setUserVote] = useState<number | null>(initialVoteValue);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [tried, setTried] = useState(initialTried);
  const [totalVotes, setTotalVotes] = useState(voteCount);
  const [totalTried, setTotalTried] = useState(triedCount);
  const [isUpdating, setIsUpdating] = useState(false);

  // Check if user is logged in
  const isLoggedIn = status === 'authenticated';

  // Handle authentication check
  const checkAuth = () => {
    if (!isLoggedIn) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href));
      return false;
    }
    if (isBanned) {
      alert('Your account has been disabled due to content violations. You cannot interact with content.');
      return false;
    }
    return true;
  };

  // Handle vote (only upvote now)
  const handleVote = async () => {
    if (!checkAuth()) return;
    
    setIsUpdating(true);
    
    try {
      // If user already voted, remove the vote
      if (userVote === 1) {
        // Optimistic update
        setUserVote(null);
        setTotalVotes(prev => prev - 1);
        
        await fetch(`/api/recipes/${recipeId}/vote`, {
          method: 'DELETE',
        });
      } else {
        // Add upvote
        const voteChange = userVote === null ? 1 : 1 - userVote;
        
        // Optimistic update
        setUserVote(1);
        setTotalVotes(prev => prev + voteChange);
        
        await fetch(`/api/recipes/${recipeId}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: 1 }),
        });
      }
      
      router.refresh();
    } catch (error) {
      console.error('Error updating vote:', error);
      // Revert optimistic update on error
      setUserVote(initialVoteValue);
      setTotalVotes(voteCount);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle bookmark toggle
  const handleBookmark = async () => {
    if (!checkAuth()) return;
    
    setIsUpdating(true);
    
    try {
      // Optimistic update
      setBookmarked(prev => !prev);
      
      if (bookmarked) {
        await fetch(`/api/recipes/${recipeId}/bookmark`, {
          method: 'DELETE',
        });
      } else {
        await fetch(`/api/recipes/${recipeId}/bookmark`, {
          method: 'POST',
        });
      }
      
      router.refresh();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // Revert optimistic update on error
      setBookmarked(initialBookmarked);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle tried toggle
  const handleTried = async () => {
    if (!checkAuth()) return;
    
    setIsUpdating(true);
    
    try {
      // Optimistic update
      setTried(prev => !prev);
      setTotalTried(prev => prev + (tried ? -1 : 1));
      
      if (tried) {
        await fetch(`/api/recipes/${recipeId}/tried`, {
          method: 'DELETE',
        });
      } else {
        await fetch(`/api/recipes/${recipeId}/tried`, {
          method: 'POST',
        });
      }
      
      router.refresh();
    } catch (error) {
      console.error('Error toggling tried:', error);
      // Revert optimistic update on error
      setTried(initialTried);
      setTotalTried(triedCount);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-b py-4 my-6">
      {/* Voting */}
      <div className="flex items-center">
        <button 
          onClick={handleVote}
          disabled={isUpdating}
          className={`p-2 rounded-full transition-colors ${userVote === 1 ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
          aria-label="Like"
        >
          <svg className="w-6 h-6" fill={userVote === 1 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        </button>
        
        <span className="mx-2 font-medium text-lg">{totalVotes}</span>
      </div>

      {/* Bookmark button */}
      <button 
        onClick={handleBookmark}
        disabled={isUpdating}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          bookmarked ? 'bg-[var(--accent)] text-white' : 'border border-gray-300 hover:bg-gray-100'
        }`}
      >
        <svg className="w-5 h-5 mr-2" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        {bookmarked ? 'Saved' : 'Save'}
      </button>

      {/* Tried button */}
      <button 
        onClick={handleTried}
        disabled={isUpdating}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          tried ? 'bg-[var(--supporting)] text-white' : 'border border-gray-300 hover:bg-gray-100'
        }`}
      >
        <svg className="w-5 h-5 mr-2" fill={tried ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {tried ? 'Tried' : 'I Tried This'} 
        {totalTried > 0 && <span className="ml-1 text-sm">({totalTried})</span>}
      </button>

      {/* Report Content Button */}
      <ReportContentButton 
        recipeId={recipeId}
        recipeTitle={recipeTitle}
        recipeSlug={recipeSlug}
      />
    </div>
  );
} 