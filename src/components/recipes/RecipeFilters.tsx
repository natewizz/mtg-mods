'use client';

import { useState, useCallback } from 'react';
import TagPill from '@/components/ui/TagPill';

export type SortOption = 'newest' | 'oldest' | 'most-upvoted' | 'most-tried';

export interface FilterTag {
  name: string;
  count: number;
}

interface RecipeFiltersProps {
  availableTags: FilterTag[];
  onFiltersChange: (tags: string[], sort: SortOption) => void;
  initialTags?: string[];
  initialSort?: SortOption;
}

export default function RecipeFilters({
  availableTags,
  onFiltersChange,
  initialTags = [],
  initialSort = 'newest'
}: RecipeFiltersProps) {
  // Parse initial state from props
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [showAllTags, setShowAllTags] = useState(false);
  
  // Get top 10 most popular tags
  const topTags = availableTags.slice(0, 10);
  
  // Memoized callback to notify parent - called only when user actually changes something
  const notifyParent = useCallback((newTags: string[], newSort: SortOption) => {
    onFiltersChange(newTags, newSort);
  }, [onFiltersChange]);
  
  // Toggle a tag selection
  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => {
      const isSelected = prev.includes(tagName);
      const newTags = isSelected
        ? prev.filter(tag => tag !== tagName)
        : [...prev, tagName];
      
      // Notify parent immediately when user changes tags
      notifyParent(newTags, sortOption);
      return newTags;
    });
  };
  
  // Update sort option
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    // Notify parent immediately when user changes sort
    notifyParent(selectedTags, option);
  };
  
  // Clear tag filters only
  const clearTagFilters = () => {
    setSelectedTags([]);
    notifyParent([], sortOption);
  };
  
  // Clear sort option only
  const clearSortOption = () => {
    setSortOption('newest');
    notifyParent(selectedTags, 'newest');
  };
  
  // Toggle between showing top tags and all tags
  const toggleShowAllTags = () => {
    setShowAllTags(prev => !prev);
  };
  
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        {/* Filters side */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-medium text-[var(--dark)]">Filters</h2>
            {selectedTags.length > 0 && (
              <button 
                className="text-sm text-gray-500 hover:underline px-2 py-1 rounded hover:bg-gray-100"
                onClick={clearTagFilters}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Sort side */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-medium text-[var(--dark)]">Sort</h2>
            {sortOption !== 'newest' && (
              <button 
                className="text-sm text-gray-500 hover:underline px-2 py-1 rounded hover:bg-gray-100"
                onClick={clearSortOption}
              >
                Reset
              </button>
            )}
          </div>
          
          {/* Sort options */}
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { value: 'newest', label: 'Newest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'most-upvoted', label: 'Most Upvoted' },
              { value: 'most-tried', label: 'Most Tried' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value as SortOption)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  sortOption === option.value
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Selected tag pills */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1 mb-4">
          <span className="text-sm text-gray-500">Active filters:</span>
          {selectedTags.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              onClick={() => toggleTag(tag)}
              className="cursor-pointer"
            />
          ))}
        </div>
      )}
      
      {/* Tag filter pills - always visible */}
      <div className="mt-2 pt-4 border-t">
        <div className={`flex flex-wrap gap-2 mb-3 ${showAllTags ? 'max-h-48 overflow-y-auto p-2' : ''}`}>
          {/* Show either top tags or all tags based on state */}
          {(showAllTags ? availableTags : topTags).map(tag => (
            <TagPill
              key={tag.name}
              tag={tag.name}
              onClick={() => toggleTag(tag.name)}
              className={`cursor-pointer ${
                selectedTags.includes(tag.name) 
                  ? 'border-2' 
                  : 'hover:brightness-110'
              }`}
            />
          ))}
        </div>
        
        {/* See All / Show Less button */}
        {availableTags.length > 10 && (
          <div className="text-right">
            <button 
              onClick={toggleShowAllTags}
              className="text-sm text-[var(--primary)] hover:underline inline-flex items-center px-3 py-1.5 rounded hover:bg-gray-100"
            >
              {showAllTags ? 'Show Less' : `See All Filters (${availableTags.length})`}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transition-transform ${showAllTags ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 