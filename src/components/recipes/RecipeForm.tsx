'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Recipe } from '@prisma/client';
import dynamic from 'next/dynamic';
import { getTagStyle } from '@/lib/tag-utils';
import TagPill from '@/components/ui/TagPill';

// Dynamically import TinyMCE to avoid SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 bg-gray-50 h-64 animate-pulse"></div>,
});

// Form validation schema
const recipeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  instructions: z.string().min(20, 'Instructions must be at least 20 characters'),
  tags: z.string().optional(),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  recipe?: Recipe & { tags?: { name: string }[] };
  isEditing?: boolean;
}

// Define MTG themed tag suggestions by category
const tagSuggestions = {
  // White - structured, ordered, community-focused
  mechanics: ['tokens', 'counters', 'life-gain', 'damage', 'buff', 'debuff', 'copy', 'exile', 'tutor', 'draw', 'discard', 'scry', 'mill', 'dice'],
  // Blue - knowledge, planning, thinking
  timingTriggers: ['upkeep', 'draw-step', 'combat', 'end-step', 'enters-battlefield', 'dies'],
  // Green - natural order, growth
  cardTypes: ['creature', 'instant', 'sorcery', 'artifact', 'enchantment', 'land'],
  // Red - passion, freedom, impulsive
  formatPlaystyle: ['commander', 'standard', 'pauper', 'multiplayer', '1v1', 'draft', 'singleton'],
  // Black - ambition, self-interest, strategic
  strategyTheme: ['aggro', 'control', 'combo', 'political', 'group-decision', 'chaos', 'tribal', 'budget-friendly'],
  // User-created popular tags
  popular: [],
};

export default function RecipeForm({ recipe, isEditing = false }: RecipeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [allTags, setAllTags] = useState(tagSuggestions);
  
  // Fetch popular tags on component mount
  useEffect(() => {
    async function fetchPopularTags() {
      try {
        const response = await fetch('/api/tags/popular');
        if (response.ok) {
          const { tags } = await response.json();
          
          // Update tag suggestions with popular tags
          setAllTags(current => ({
            ...current,
            popular: tags
          }));
        }
      } catch (err) {
        console.error('Failed to fetch popular tags:', err);
      }
    }
    
    fetchPopularTags();
  }, []);
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Initialize form with existing recipe data if editing
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: recipe?.title || '',
      description: recipe?.description || '',
      instructions: recipe?.instructions || '',
      tags: '',
    },
  });

  // Watch the instructions field for the rich text editor
  const instructions = watch('instructions');
  const tagsValue = watch('tags');

  // Initialize selected tags from existing recipe if editing
  useEffect(() => {
    if (isEditing && recipe?.tags && Array.isArray(recipe.tags)) {
      const existingTags = recipe.tags.map(tag => tag.name);
      setSelectedTags(existingTags);
      setValue('tags', existingTags.join(', '));
    }
  }, [isEditing, recipe, setValue]);

  // Handle rich text editor change
  const handleEditorChange = (content: string) => {
    setValue('instructions', content, { shouldValidate: true });
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    // Parse current tags into array, accounting for various separators and whitespace
    const currentTags = tagsValue
      ? tagsValue.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    
    // Check if tag is already selected
    const tagIndex = currentTags.findIndex(t => t.toLowerCase() === tag.toLowerCase());
    
    let newTags: string[];
    if (tagIndex >= 0) {
      // Remove tag if already present
      newTags = [...currentTags];
      newTags.splice(tagIndex, 1);
    } else {
      // Add tag if not present
      newTags = [...currentTags, tag];
    }
    
    // Update form value and selected tags
    setValue('tags', newTags.join(', '));
    setSelectedTags(newTags);
  };

  const isTagSelected = (tag: string): boolean => {
    const currentTags = tagsValue
      ? tagsValue.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    return currentTags.some(t => t.toLowerCase() === tag.toLowerCase());
  };

  // Render tag suggestions with a See More toggle if needed
  const renderTagSection = (title: string, tags: string[], colorClass: string) => {
    const MAX_VISIBLE_TAGS = 15;
    const needsToggle = tags.length > MAX_VISIBLE_TAGS;
    const isExpanded = expandedSections[title] || false;
    const displayTags = needsToggle && !isExpanded ? tags.slice(0, MAX_VISIBLE_TAGS) : tags;
    
    return (
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {displayTags.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              onClick={() => handleTagClick(tag)}
              className={`hover:brightness-110 ${isTagSelected(tag) ? `border-2 border-${colorClass}` : ''}`}
            />
          ))}
          
          {needsToggle && (
            <button 
              type="button"
              onClick={() => toggleSection(title)}
              className="text-sm text-[#5A31F4] hover:underline ml-2"
            >
              {isExpanded ? 'See Less' : 'See More'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const onSubmit = async (data: RecipeFormValues) => {
    try {
      setIsSubmitting(true);
      setError('');

      // Split comma-separated tags
      const tagList = data.tags 
        ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];

      const endpoint = isEditing 
        ? `/api/recipes/${recipe?.id}` 
        : '/api/recipes';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          tags: tagList,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      
      // Create a URL-friendly slug from the title
      const slugifiedTitle = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
        .trim();
      
      // Redirect to the recipe page using the slug-based URL
      router.push(`/recipes/${slugifiedTitle}`);
      router.refresh(); // Refresh to update the page with new data
    } catch (err) {
      console.error('Error submitting recipe:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Recipe Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="input-field"
          placeholder="Enter a catchy title for your recipe"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="input-field resize-none"
          placeholder="Briefly describe what this recipe does and why it's interesting"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
          Instructions <span className="text-red-500">*</span>
        </label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          initialValue={recipe?.instructions || ''}
          init={{
            height: 400,
            menubar: false,
            plugins: 'lists link image code table',
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | removeformat | help',
            content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
          }}
          onEditorChange={handleEditorChange}
        />
        {errors.instructions && (
          <p className="mt-1 text-sm text-red-600">{errors.instructions.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <input
          id="tags"
          type="text"
          {...register('tags')}
          className="input-field"
          placeholder="tokens, commander, combo, budget-friendly"
        />
        <p className="mt-1 text-xs text-gray-500 mb-3">
          Separate tags with commas. Click on suggestions below or type your own.
        </p>
        
        {/* Display selected tags */}
        {tagsValue && tagsValue.split(',').filter(Boolean).length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagsValue.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, index) => (
                <TagPill 
                  key={`selected-${index}`}
                  tag={tag}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Tag Suggestions */}
        <div className="space-y-4">
          {/* Popular user-created tags */}
          {allTags.popular.length > 0 && (
            renderTagSection("Popular Tags", allTags.popular, "[#5A31F4]")
          )}
        
          {/* White - Mechanics & Effects */}
          {renderTagSection("Mechanics & Effects", allTags.mechanics, "primary")}

          {/* Blue - Timing & Triggers */}
          {renderTagSection("Timing & Triggers", allTags.timingTriggers, "[#3DA1C4]")}

          {/* Green - Card Types */}
          {renderTagSection("Card Types", allTags.cardTypes, "[#2C2E3A]")}

          {/* Red - Format & Play-style */}
          {renderTagSection("Format & Play-style", allTags.formatPlaystyle, "[#FF8661]")}

          {/* Black - Strategy & Theme */}
          {renderTagSection("Strategy & Theme", allTags.strategyTheme, "[#FFC145]")}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </div>
    </form>
  );
} 