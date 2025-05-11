'use client';

import RecipeInteractions from '@/components/recipes/RecipeInteractions';

interface RecipeInteractionsClientProps {
  recipeId: string;
  initialVoteValue: number | null;
  initialBookmarked: boolean;
  initialTried: boolean;
  voteCount: number;
  triedCount: number;
}

export default function RecipeInteractionsClient({
  recipeId,
  initialVoteValue,
  initialBookmarked,
  initialTried,
  voteCount,
  triedCount
}: RecipeInteractionsClientProps) {
  return (
    <RecipeInteractions
      recipeId={recipeId}
      initialVoteValue={initialVoteValue}
      initialBookmarked={initialBookmarked}
      initialTried={initialTried}
      voteCount={voteCount}
      triedCount={triedCount}
    />
  );
} 