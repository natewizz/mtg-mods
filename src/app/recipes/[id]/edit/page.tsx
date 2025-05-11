import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RecipeFormWrapper from './RecipeFormWrapper';
import { auth } from '@/auth';

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

async function getRecipe(id: string) {
  try {
    return await prisma.recipe.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const session = await auth();
  
  if (!session?.user) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=/recipes/${params.id}/edit`,
        permanent: false,
      },
    };
  }

  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  // Check if the current user is the author
  if (recipe.authorId !== session.user.id) {
    return {
      redirect: {
        destination: `/recipes/${params.id}`,
        permanent: false,
      },
    };
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--dark)] mb-6">Edit Recipe</h1>
      <RecipeFormWrapper recipe={recipe} />
    </div>
  );
} 