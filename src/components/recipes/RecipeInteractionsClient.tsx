'use client';

import RecipeInteractions from '@/components/recipes/RecipeInteractions';

interface RecipeInteractionsClientProps {
  recipeId: string;
  voteCount: number;
  triedCount: number;
  initialVoteValue: number | null;
  initialBookmarked: boolean;
  initialTried: boolean;
}

export default function RecipeInteractionsClient({
  recipeId,
  voteCount,
  triedCount,
  initialVoteValue,
  initialBookmarked,
  initialTried,
}: RecipeInteractionsClientProps) {
  return (
    <RecipeInteractions
      recipeId={recipeId}
      voteCount={voteCount}
      triedCount={triedCount}
      initialVoteValue={initialVoteValue}
      initialBookmarked={initialBookmarked}
      initialTried={initialTried}
    />
  );
} 