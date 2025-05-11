import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import RecipeInteractionsClient from './RecipeInteractionsClient';
import DeleteRecipeButton from '@/components/recipes/DeleteRecipeButton';
import { auth } from '@/auth';

interface RecipePageProps {
  params: {
    id: string;
  };
}

async function getRecipeWithInteractions(recipeId: string, userId?: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        author: true,
        tags: true,
        _count: {
          select: {
            votes: true,
            tried: true,
          },
        },
      },
    });

    if (!recipe) {
      return null;
    }

    // Get interaction data for the current user
    let userInteractions = null;
    if (userId) {
      const [vote, bookmark, tried] = await Promise.all([
        prisma.vote.findUnique({
          where: {
            userId_recipeId: {
              userId,
              recipeId,
            },
          },
        }),
        prisma.bookmark.findUnique({
          where: {
            userId_recipeId: {
              userId,
              recipeId,
            },
          },
        }),
        prisma.tried.findUnique({
          where: {
            userId_recipeId: {
              userId,
              recipeId,
            },
          },
        }),
      ]);

      userInteractions = {
        voteValue: vote?.value || null,
        isBookmarked: Boolean(bookmark),
        hasTried: Boolean(tried),
      };
    }

    return {
      recipe,
      userInteractions,
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const session = await auth();
  const recipeData = await getRecipeWithInteractions(
    params.id,
    session?.user?.id
  );

  if (!recipeData) {
    notFound();
  }

  const { recipe, userInteractions } = recipeData;
  const isAuthor = session?.user?.id === recipe.authorId;

  // Calculate total vote value
  const totalVotes = recipe._count.votes;
  const totalTried = recipe._count.tried;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/recipes" className="text-gray-500 hover:underline mr-2">
          ← Back to Recipes
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md p-6 mb-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--dark)] mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <span className="font-medium">By</span>
              <span className="ml-1">{recipe.author.name || recipe.author.username || 'Anonymous'}</span>
            </div>
            
            <div>
              <time dateTime={recipe.createdAt.toISOString()}>
                {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>

            {/* Tags */}
            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 rounded-full bg-gray-100 text-xs"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <p className="text-gray-700 text-lg">{recipe.description}</p>
        </header>

        {/* Interactions (Voting, Bookmark, Tried) */}
        <Suspense fallback={<div>Loading interactions...</div>}>
          <RecipeInteractionsClient
            recipeId={recipe.id}
            voteCount={totalVotes}
            triedCount={totalTried}
            initialVoteValue={userInteractions?.voteValue || null}
            initialBookmarked={userInteractions?.isBookmarked || false}
            initialTried={userInteractions?.hasTried || false}
          />
        </Suspense>

        {/* Recipe instructions */}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

        {/* Author actions */}
        {isAuthor && (
          <div className="flex items-center space-x-4 mt-8 pt-4 border-t">
            <Link 
              href={`/recipes/${recipe.id}/edit`}
              className="text-[var(--primary)] hover:underline"
            >
              Edit Recipe
            </Link>
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
        )}
      </article>
    </div>
  );
} 