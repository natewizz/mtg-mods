'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  
  // Get top 10 most popular tags
  const topTags = availableTags.slice(0, 10);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isSortDropdownOpen) {
        setIsSortDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSortDropdownOpen]);
  
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
    setIsSortDropdownOpen(false);
    // Notify parent immediately when user changes sort
    notifyParent(selectedTags, option);
  };

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
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

  // Get sort option label
  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'newest': return 'Newest';
      case 'oldest': return 'Oldest';
      case 'most-upvoted': return 'Most Upvoted';
      case 'most-tried': return 'Most Tried';
      default: return 'Newest';
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        {/* Filters side */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-[var(--dark)]">Filters</h2>
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
        <div className="relative">
          {/* Sort dropdown with inline label */}
          <div className="relative mt-2" ref={sortDropdownRef}>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Sort:</span>
              <button
                onClick={toggleSortDropdown}
                aria-haspopup="listbox"
                aria-expanded={isSortDropdownOpen}
                aria-labelledby="sort-label"
                className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              >
                <span className="text-gray-700">{getSortLabel(sortOption)}</span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {isSortDropdownOpen && (
              <div 
                role="listbox"
                aria-labelledby="sort-label"
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
              >
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'oldest', label: 'Oldest' },
                  { value: 'most-upvoted', label: 'Most Upvoted' },
                  { value: 'most-tried', label: 'Most Tried' }
                ].map(option => (
                  <button
                    key={option.value}
                    role="option"
                    aria-selected={sortOption === option.value}
                    onClick={() => handleSortChange(option.value as SortOption)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md ${
                      sortOption === option.value
                        ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {sortOption !== 'newest' && (
            <button 
              className="text-sm text-gray-500 hover:underline px-2 py-1 rounded hover:bg-gray-100 mt-2"
              onClick={clearSortOption}
            >
              Reset
            </button>
          )}
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
      
      {/* Tag filter pills - limited to 2 rows but expandable */}
      <div className="mt-2 pt-4 border-t">
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Show either top tags (limited to ~8-10 for 2 rows) or all tags */}
          {(showAllTags ? availableTags : topTags.slice(0, 8)).map(tag => (
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
          
          {/* Show remaining count when collapsed */}
          {!showAllTags && topTags.length > 8 && (
            <span className="text-sm text-gray-500 self-center">+{topTags.length - 8} more</span>
          )}
        </div>
        
        {/* See All / Show Less button */}
        {availableTags.length > 8 && (
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