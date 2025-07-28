'use client';

import RecipeInteractions from '@/components/recipes/RecipeInteractions';

interface RecipeInteractionsClientProps {
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  voteCount: number;
  triedCount: number;
  initialVoteValue: number | null;
  initialBookmarked: boolean;
  initialTried: boolean;
}

export default function RecipeInteractionsClient({
  recipeId,
  recipeTitle,
  recipeSlug,
  voteCount,
  triedCount,
  initialVoteValue,
  initialBookmarked,
  initialTried,
}: RecipeInteractionsClientProps) {
  return (
    <RecipeInteractions
      recipeId={recipeId}
      recipeTitle={recipeTitle}
      recipeSlug={recipeSlug}
      voteCount={voteCount}
      triedCount={triedCount}
      initialVoteValue={initialVoteValue}
      initialBookmarked={initialBookmarked}
      initialTried={initialTried}
    />
  );
} 