import Link from 'next/link';
import { Recipe, Vote, Tried } from '@prisma/client';
import TagPill from '@/components/ui/TagPill';
import ReportContentButton from './ReportContentButton';
import RecipeCopyLinkButton from './RecipeCopyLinkButton';

type RecipeWithRelations = Recipe & {
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  tags: {
    id: string;
    name: string;
  }[];
  _count: {
    votes: number;
    tried: number;
  };
  // For compatibility with older components that might still use these
  votes?: Vote[];
  tried?: Tried[];
};

interface RecipeCardProps {
  recipe: RecipeWithRelations;
  compact?: boolean; // For trending recipes - more compact layout
}

export default function RecipeCard({ recipe, compact = false }: RecipeCardProps) {
  // Calculate vote count (use _count if available, fallback to array length)
  const voteCount = recipe._count?.votes || recipe.votes?.reduce((sum, vote) => sum + vote.value, 0) || 0;
  
  // Count of people who tried the recipe (use _count if available, fallback to array length)
  const triedCount = recipe._count?.tried || recipe.tried?.length || 0;

  // Generate the recipe URL using the slug
  const recipeUrl = `/recipes/${recipe.slug}`;

  // Generate the author profile URL
  const authorName = recipe.author.username || recipe.author.name || 'Anonymous';
  const authorUrl = recipe.author.username ? `/profile/${recipe.author.username}` : null;

  // Strip HTML tags from instructions for preview (server-side only)
  const stripHtml = (html: string): string => {
    if (!html) return '';
    
    // Server-side HTML processing - consistent between server and client
    return html
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace common entities
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/\s+/g, ' ') // Clean up whitespace
      .trim();
  };

  // Get preview text (first 140 characters)
  const previewText = recipe.instructions ? stripHtml(recipe.instructions).slice(0, 140) : '';

  if (compact) {
    // Compact version for trending recipes
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 min-h-[140px] h-full flex flex-col">
        {/* Top row with title and copy link button */}
        <div className="flex items-start justify-between mb-2">
          <Link href={recipeUrl} className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-[var(--dark)] line-clamp-2 leading-tight hover:text-[#5A31F4] pr-2">{recipe.title}</h2>
          </Link>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Copy Link Button */}
            <RecipeCopyLinkButton recipeUrl={recipeUrl} />
          </div>
        </div>
        
        {/* Display tags if available */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {recipe.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag.id} 
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag.name}
              </span>
            ))}
            {recipe.tags.length > 2 && (
              <span className="text-xs text-gray-400">+{recipe.tags.length - 2}</span>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
          {authorUrl ? (
            <Link href={authorUrl} className="truncate max-w-[60%] hover:text-[#5A31F4] hover:underline">
              {authorName}
            </Link>
          ) : (
            <span className="truncate max-w-[60%]">{authorName}</span>
          )}
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{voteCount}</span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-1">✅</span>
              <span>{triedCount}</span>
            </div>
          </div>
        </div>
        
        {/* Report Content Button */}
        <div className="mt-2 flex justify-end">
          <ReportContentButton 
            recipeId={recipe.id}
            recipeTitle={recipe.title}
            recipeSlug={recipe.slug}
          />
        </div>
      </div>
    );
  }

  // Full version for regular recipes with preview
  return (
    <div className="card hover:shadow-lg transition-shadow min-h-[240px] h-full flex flex-col">
      {/* Top row with title, copy link button, and attachment */}
      <div className="flex items-start justify-between mb-2">
        <Link href={recipeUrl} className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[var(--dark)] hover:text-[#5A31F4] pr-2">{recipe.title}</h2>
        </Link>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Attachment indicator - softened and less intrusive */}
          {recipe.attachmentName && recipe.attachmentUrl && (
            <a
              href={recipe.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title={recipe.attachmentName}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Download
            </a>
          )}
          
          {/* Copy Link Button */}
          <RecipeCopyLinkButton recipeUrl={recipeUrl} />
        </div>
      </div>
      
      {/* Recipe preview */}
      {previewText && (
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {previewText}
          {previewText.length === 140 && '...'}
        </p>
      )}
      
      {/* Display tags if available */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags.slice(0, 3).map((tag) => (
            <TagPill 
              key={tag.id} 
              tag={tag.name} 
              className="text-xs"
            />
          ))}
          {recipe.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{recipe.tags.length - 3} more</span>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
        <div className="flex items-center">
          <span className="font-medium mr-1">By</span>
          {authorUrl ? (
            <Link href={authorUrl} className="hover:text-[#5A31F4] hover:underline">
              {authorName}
            </Link>
          ) : (
            <span>{authorName}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{voteCount}</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-1">✅</span>
            <span>{triedCount}</span>
          </div>
        </div>
      </div>
      
      {/* Report Content Button */}
      <div className="mt-3 flex justify-end">
        <ReportContentButton 
          recipeId={recipe.id}
          recipeTitle={recipe.title}
          recipeSlug={recipe.slug}
        />
      </div>
    </div>
  );
} 