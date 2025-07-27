'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useCallback } from 'react';
import RecipeFilters, { FilterTag, SortOption } from '@/components/recipes/RecipeFilters';

interface RecipeFiltersWrapperProps {
  availableTags: FilterTag[];
  initialTags?: string[];
  initialSort?: SortOption;
}

export default function RecipeFiltersWrapper({
  availableTags,
  initialTags = [],
  initialSort = 'newest'
}: RecipeFiltersWrapperProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Memoized filter change handler to prevent infinite re-renders
  const handleFiltersChange = useCallback((tags: string[], sort: SortOption) => {
    // Construct URL params
    const params = new URLSearchParams();
    
    if (tags.length > 0) {
      params.set('tags', tags.join(','));
    }
    
    if (sort !== 'newest') {
      params.set('sort', sort);
    }
    
    // Update URL with filters
    startTransition(() => {
      const queryString = params.toString();
      const url = queryString ? `/recipes?${queryString}` : '/recipes';
      router.push(url, { scroll: false });
    });
  }, [router]); // Only depend on router, which is stable
  
  return (
    <div className={isPending ? 'opacity-70 pointer-events-none' : ''}>
      <RecipeFilters
        availableTags={availableTags}
        onFiltersChange={handleFiltersChange}
        initialTags={initialTags}
        initialSort={initialSort}
      />
    </div>
  );
} 