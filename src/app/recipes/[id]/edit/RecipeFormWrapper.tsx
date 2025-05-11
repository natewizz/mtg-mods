'use client';

import RecipeForm from '@/components/recipes/RecipeForm';
import { Recipe, RecipeTag } from '@prisma/client';

type RecipeWithTags = Recipe & {
  tags: RecipeTag[];
};

interface RecipeFormWrapperProps {
  recipe: RecipeWithTags;
}

export default function RecipeFormWrapper({ recipe }: RecipeFormWrapperProps) {
  return <RecipeForm recipe={recipe} isEditing={true} />;
} 