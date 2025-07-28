'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface UserStrike {
  id: string;
  userId: string;
  reason: string;
  recipeId?: string;
  recipeTitle?: string;
  adminId: string;
  adminName: string;
  createdAt: string;
}

export function useUserBanned() {
  const { data: session, status } = useSession();
  const [strikes, setStrikes] = useState<UserStrike[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBanned, setIsBanned] = useState(false);

  const fetchUserStrikes = useCallback(async () => {
    // Don't fetch if session is loading or no user ID
    if (status === 'loading' || !session?.user?.id) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/user/strikes');
      
      if (response.ok) {
        const data = await response.json();
        const userStrikes = data.strikes || [];
        setStrikes(userStrikes);
        setIsBanned(userStrikes.length >= 2);
      } else {
        setStrikes([]);
        setIsBanned(false);
      }
    } catch (error) {
      console.error('Error fetching user strikes:', error);
      setStrikes([]);
      setIsBanned(false);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, status]);

  useEffect(() => {
    if (status === 'loading') {
      // Don't do anything while session is loading
      return;
    }
    
    if (session?.user?.id) {
      fetchUserStrikes();
    } else {
      setLoading(false);
      setIsBanned(false);
      setStrikes([]);
    }
  }, [session?.user?.id, status, fetchUserStrikes]);

  return {
    strikes,
    isBanned,
    loading,
    strikeCount: strikes.length
  };
} 