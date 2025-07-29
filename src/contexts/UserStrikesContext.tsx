'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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

interface UserStrikesContextType {
  strikes: UserStrike[];
  loading: boolean;
  isBanned: boolean;
  strikeCount: number;
  refetch: () => Promise<void>;
}

const UserStrikesContext = createContext<UserStrikesContextType | undefined>(undefined);

export function UserStrikesProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [strikes, setStrikes] = useState<UserStrike[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

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
      setHasInitialized(true);
    }
  }, [session?.user?.id, status]);

  const refetch = useCallback(async () => {
    await fetchUserStrikes();
  }, [fetchUserStrikes]);

  useEffect(() => {
    if (status === 'loading') {
      // Don't do anything while session is loading
      return;
    }
    
    if (session?.user?.id && !hasInitialized) {
      fetchUserStrikes();
    } else if (!session?.user?.id) {
      setLoading(false);
      setIsBanned(false);
      setStrikes([]);
      setHasInitialized(false);
    }
  }, [session?.user?.id, status, hasInitialized, fetchUserStrikes]);

  const value = {
    strikes,
    loading,
    isBanned,
    strikeCount: strikes.length,
    refetch
  };

  return (
    <UserStrikesContext.Provider value={value}>
      {children}
    </UserStrikesContext.Provider>
  );
}

export function useUserStrikes() {
  const context = useContext(UserStrikesContext);
  if (context === undefined) {
    throw new Error('useUserStrikes must be used within a UserStrikesProvider');
  }
  return context;
}

// Backward compatibility - keep the old hook name
export function useUserBanned() {
  const context = useUserStrikes();
  return {
    strikes: context.strikes,
    loading: context.loading,
    isBanned: context.isBanned,
    strikeCount: context.strikeCount
  };
} 