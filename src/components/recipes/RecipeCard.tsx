import Link from 'next/link';
import { Recipe, Vote, Tried } from '@prisma/client';
import TagPill from '@/components/ui/TagPill';

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
      <Link href={recipeUrl}>
        <div className="card hover:shadow-lg transition-shadow min-h-[200px] h-full flex flex-col">
          <h2 className="text-lg font-bold mb-2 text-[var(--dark)] line-clamp-2">{recipe.title}</h2>
          
          {/* Display tags if available */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {recipe.tags.slice(0, 2).map((tag) => (
                <TagPill 
                  key={tag.id} 
                  tag={tag.name} 
                  className="text-xs"
                />
              ))}
              {recipe.tags.length > 2 && (
                <span className="text-xs text-gray-500">+{recipe.tags.length - 2}</span>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
            <div className="flex items-center">
              <span className="font-medium mr-1">By</span>
              <span className="truncate">{recipe.author.name || recipe.author.username || 'Anonymous'}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <span className="mr-1">🔼</span>
                <span>{voteCount}</span>
              </div>
              
              <div className="flex items-center">
                <span className="mr-1">✅</span>
                <span>{triedCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Full version for regular recipes with preview
  return (
    <Link href={recipeUrl}>
      <div className="card hover:shadow-lg transition-shadow min-h-[280px] h-full flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-[var(--dark)]">{recipe.title}</h2>
        
        {/* Recipe preview */}
        {previewText && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {previewText}
            {previewText.length === 140 && '...'}
          </p>
        )}
        
        {/* Display tags if available */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
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
            <span>{recipe.author.name || recipe.author.username || 'Anonymous'}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-1">🔼</span>
              <span>{voteCount}</span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-1">✅</span>
              <span>{triedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 