import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getRecipeUrl } from '@/lib/utils';

interface RecipeIdRedirectProps {
  params: {
    id: string;
  };
}

// This legacy route handles old ID-based URLs and redirects to the new slug-based format
export default async function RecipeIdRedirect({ params }: RecipeIdRedirectProps) {
  // Get the recipe to extract its title
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    select: { title: true },
  });

  if (!recipe) {
    return redirect('/recipes');
  }

  // Redirect to the new URL format that includes only the title
  redirect(getRecipeUrl(recipe.title));
} 