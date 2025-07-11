import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import RecipeForm from '@/components/recipes/RecipeForm';

async function getRecipeBySlug(slug: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
      include: {
        tags: true,
      },
    });
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe for editing:', error);
    return null;
  }
}

export default async function EditRecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  
  // Redirect to sign in if not authenticated
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/recipes');
  }
  
  const recipe = await getRecipeBySlug(slug);
  
  // Recipe not found or user doesn't have permission
  if (!recipe) {
    notFound();
  }
  
  // Check if user is the author
  if (recipe.authorId !== session.user.id) {
    // Redirect users who aren't the author
    redirect('/recipes');
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-[var(--dark)]">Edit Recipe</h1>
      
      <Suspense fallback={<div>Loading form...</div>}>
        <RecipeForm recipe={recipe} isEditing={true} />
      </Suspense>
    </div>
  );
} 