'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface RecipeInteractionsProps {
  recipeId: string;
  initialVoteValue?: number | null;
  initialBookmarked: boolean;
  initialTried: boolean;
  voteCount: number;
  triedCount: number;
}

export default function RecipeInteractions({
  recipeId,
  initialVoteValue = null,
  initialBookmarked = false,
  initialTried = false,
  voteCount = 0,
  triedCount = 0,
}: RecipeInteractionsProps) {
  const { status } = useSession();
  const router = useRouter();
  
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
    return true;
  };

  // Handle vote
  const handleVote = async (value: number) => {
    if (!checkAuth()) return;
    
    setIsUpdating(true);
    
    try {
      // If user already voted with this value, remove the vote
      if (userVote === value) {
        // Optimistic update
        setUserVote(null);
        setTotalVotes(prev => prev - value);
        
        await fetch(`/api/recipes/${recipeId}/vote`, {
          method: 'DELETE',
        });
      } else {
        // Calculate vote difference
        const voteChange = userVote === null ? value : value - userVote;
        
        // Optimistic update
        setUserVote(value);
        setTotalVotes(prev => prev + voteChange);
        
        await fetch(`/api/recipes/${recipeId}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value }),
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
          onClick={() => handleVote(1)}
          disabled={isUpdating}
          className={`p-2 rounded-full transition-colors ${userVote === 1 ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
          aria-label="Upvote"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        
        <span className="mx-2 font-medium text-lg">{totalVotes}</span>
        
        <button 
          onClick={() => handleVote(-1)}
          disabled={isUpdating}
          className={`p-2 rounded-full transition-colors ${userVote === -1 ? 'bg-red-100 text-red-700' : 'hover:bg-gray-100'}`}
          aria-label="Downvote"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
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
    </div>
  );
} 