'use client';

import { useState, useEffect } from 'react';
import BadgeCollection from './BadgeCollection';

interface BadgeData {
  id: string;
  badge: {
    id: string;
    name: string;
    displayName: string;
    description: string;
    icon: string;
    color: string;
    category: string;
  };
  earnedAt: string;
  awardedBy?: {
    name?: string;
    username?: string;
  };
}

interface UserBadgeCollectionProps {
  userId: string;
  showCategoryHeaders?: boolean;
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function UserBadgeCollection({
  userId,
  showCategoryHeaders = true,
  maxDisplay,
  size = 'md',
  className = ''
}: UserBadgeCollectionProps) {
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}/badges`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch badges');
        }
        
        const data = await response.json();
        setBadges(data);
      } catch (err) {
        console.error('Error fetching badges:', err);
        setError(err instanceof Error ? err.message : 'Failed to load badges');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBadges();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className={`text-gray-500 text-center py-4 ${className}`}>
        Loading badges...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-500 text-center py-4 ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <BadgeCollection
      badges={badges}
      showCategoryHeaders={showCategoryHeaders}
      maxDisplay={maxDisplay}
      size={size}
      className={className}
    />
  );
} 