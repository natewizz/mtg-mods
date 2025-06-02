import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getRecipeUrl } from '@/lib/utils';

// This legacy route handles old ID-based URLs and redirects to the new slug-based format
export default async function RecipeIdRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Get the recipe to extract its title
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    select: { title: true },
  });

  if (!recipe) {
    return redirect('/recipes');
  }

  // Redirect to the new URL format that includes only the title
  redirect(getRecipeUrl(recipe.title));
} 